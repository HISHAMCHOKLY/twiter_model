const express=require('express')
const { login, home ,tweet, addtweet, logout, like } = require('../controllers/home')
const { ifLoggedin, isLoggedin } = require('../midleware/mid1')
const router=express.Router()


router
    .route('/')
    .get(home)

router
    .route('/login')
    .get(ifLoggedin,(req,res)=>{
        res.render('login')
    })
    .post(login)

router
    .route('/post')
    .get(isLoggedin,tweet)    
    .post(isLoggedin,addtweet)
    
router
    .route('/post/like')
    .post(like)    
router
    .route('/logout')
    .get(logout)



module.exports=router    