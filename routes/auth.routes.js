const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt')


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/confirmed", (req, res, next) => {
    const { username, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    User.create({username, password: hashedPassword , email})
    .then (user =>{
        console.log('user created' + user)
         res.render("auth/confirmation", {user});
    })
});

//router.get('/confirmation', (req,res)=>{
//    res.render('auth/confirmation')
//})
  


  module.exports = router;
