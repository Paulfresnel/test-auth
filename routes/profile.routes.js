const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Post = require('../models/Post.model')

router.get('/:id/profile', (req, res)=>{
    console.log(req.params.id)
    User.findById(req.params.id)
    .then(user =>{
        console.log(user)
        res.render('profile/profile-page', {user})
    })
})

router.get('/:id/profile/create-post', (req,res)=>{
    console.log(req.params.id)
    User.findById(req.params.id)
    .then(user=>{
        res.render("profile/posts/create-post", {user})
    })
    
})


router.post('/profile/posts', (req, res)=>{
    const { title, description } = req.body
    Post.create({title, description})
    .then (post =>{
        Post.find(post)
        .populate('author')
        console.log(post)
        res.render('profile/profile-page')
    })
    
})

router.get('/:id/profile/posts', (req, res)=>{
    res.render('profile/posts/posts')
})

module.exports = router