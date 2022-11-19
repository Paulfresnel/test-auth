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
    const { title, description, author } = req.body
    let id =req.params.id
    Post.create({title, description, author})
    .then (post =>{
        User.findOne({username: author})
        .then (user =>{
            user.posts.push(post)
            console.log(user)
            user.save()
            User.findOne({username: user.username}).populate("posts")
            .then ((populatedData)=>{
                console.log("podata" + populatedData)
                res.render(`profile/posts/list`, {populatedData})
            })
            //return user[0].posts.push(post._id)
        })
        //User.find({username: author})
        //.populate('posts')
        
    })
})


router.get('/profile/posts', (req, res)=>{
    res.render('profile/posts/list')
})

module.exports = router