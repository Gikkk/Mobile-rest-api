const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const config = require('./config/datebase')
const User = require('./model/userschema');
const Contacts = require('./model/contact');





app.use(express.static('public'))
app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

// connection
mongoose.connect(config.datebase, {useNewUrlParser: true});
let db = mongoose.connection;
db.once("open", (err) => { console.log("connected") });
db.on("error", (err)=> {console.log(err)});
mongoose.set('useFindAndModify', false);

app.get("/", (req, res) => {
    res.send("Hello")
});

app.get('/register', (req, res)=>{
    res.send('Please register!!!')
})

app.post('/register', (req, res)=>{
    const { email, username, password } = req.body;
    const status = "user"
    
    res.send(req.body)
    

    const newUser = new User({
        username,
        email,
        password,
        status: status

      });
      newUser
      .save()
      .then(user => {
        console.log(user);
        
      })
      .catch(err => console.log(err));
 
})

app.get('/login',(req,res)=>{
res.send('Please login!!!')
})

app.post('/login', (req,res)=>{       
    User.findOne({ email: req.body.email}, function (err, docs) {                
        if(docs === null){ 
            res.send('email does not exists')
        } else {
        if(docs.password === req.body.password){
            res.send(docs)            
        } else{
            res.status(404).send('Wrong password')
        }       
      }

        
    });
  
})

app.post('/contacts/add', (req,res)=>{
    const { name, surname, phoneNumber } = req.body;

    let newContacts = new Contacts({
        name,
        surname,
        phoneNumber
      });
    newContacts.save((err)=>{
        if(err) throw err;
        res.send(newContacts)
    })  

})

 
app.put('/contacts/edit', (req,res)=>{
    
    let id = req.body.id;
    let newname = req.body.newname
    let newsurname = req.body.newsurname;
    let newphoneNumber = req.body.newphoneNumber;
    

    Contacts.findOneAndUpdate(
        { _id: id},
        { name: newname,  surname: newsurname, phoneNumber: newphoneNumber },
        (err, task) => {
            
          if (err) {
            res.status(500).send(err);

          }
          res.status(200).json('Changed');
        }
      );
})


app.delete('/contacts/remove', (req, res)=>{
    let delContact = req.body.id
    Contacts.deleteOne({ _id: delContact }, function(err) { 
          if (err)  throw err;
          res.send('Deleted')
      });
  });
  

app.listen(port, () => console.log(`listening on port ${port}!`));