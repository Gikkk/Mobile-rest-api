const express = require('express');
const router = express.Router();
const User = require('../model/userschema');
const Contacts = require('../model/contact');
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator/check');


router.get('/register', (req, res)=>{
    res.send('Please register!!!')
})

router.get('/login',(req,res)=>{
  res.send('Please login!!!')
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
    
    
    

    const newUser = new User({
        username,
        email,
        password,
        status: status

      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log(hash);
                
            })
            .catch(err => console.log(err)
            );
        });
      })  
    res.send(newUser) 
})

// Postman check, Post request, JSON
// {
// 	"email": "giogi@",
// 	"password": "12345"
// }


router.post('/login', (req,res)=>{ 
    const email = req.body.email;
    const password = req.body.password   
    User.findOne({ email}).then (user=>{
        if(!user){
          return res.status(404).json({email: 'Email does not exist'})
        }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {              
          res.send(user)
        } else {
          res.send('Password incorrect')
          
        }
      });
    }) 
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

// Postman check, delete request, JSON
// {   
//   "id":"5ceea9da1c5b690b387d80b4"
// }
router.delete('/contacts/remove', (req, res)=>{
    let delContact = req.body.id
    Contacts.findByIdAndRemove(delContact, (err, contact) => {
   
      if (err) return res.status(500).send(err);
  
      const response = {
          message: "Contact successfully deleted",
          id: contact._id
      };
      return res.status(200).send(response);
  });  
  });

  
  

module.exports = router;