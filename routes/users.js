const express = require('express');
const router = express.Router();
const User = require('../model/userschema');
const Contacts = require('../model/contact');


router.get('/register', (req, res)=>{
    res.send('Please register!!!')
})

// Postman check, Post request, JSON
// {
//  "username": "gio",
// 	"email": "giogi@gmail.com",
// 	"password": "12345"
// }
router.post('/register', (req, res)=>{
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

// Postman check, Post request, JSON
// {
// 	"email": "giogi@",
// 	"password": "12345"
// }
router.get('/login',(req,res)=>{
res.send('Please login!!!')
})

router.post('/login', (req,res)=>{       
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

// Postman check, Post request, JSON
// {
// 	"name": "gio",
// 	"surname": "zhon",
// 	"phoneNumber": "597347979"
// }
router.post('/contacts/add', (req,res)=>{
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

// Postman check, Put request, JSON
// {   
// 	"id": "5ceea9da1c5b690b387d80b4",
// 	"newname": "shaqr",
// 	"newsurname": "dev",
// 	"newphoneNumber": "5979754649"
// } 
router.put('/contacts/edit', (req,res)=>{
    
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


router.delete('/contacts/remove', (req, res)=>{
    let delContact = req.body.id
    Contacts.deleteOne({ _id: delContact }, function(err) { 
          if (err)  throw err;
          res.send('Deleted')
      });
  });
  

module.exports = router;