let {users,post1}=require('../users')
const cookieToken = require('../utils/cookieToken')

exports.home=(req,res)=>{
    res.render('login')
    
}
exports.tweet=(req,res)=>{
    console.log(req.cookies);
    res.render('post',{post1})
}
exports.addtweet=(req,res)=>{
    let token=req.cookies.token
    console.log(post1);
    post1.push({message:req.body.tweet,like:[],tuser:token.user })
    res.render('post',{post1})

}
exports.login = async (req,res,next)=>{
    const {username,password} = req.body

    let user=users.find((x)=>x.username==username)
    if(!user){
        return res.redirect('/login')
    }
    if(!user.password==password){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}
exports.like=(req,res)=>{
    let token=req.cookies.token
    console.log(req.cookies.token);
    let foraddlike=post1.find((x)=>req.body.tuser==x.tuser).like
    let liked=foraddlike.find((x)=>token.user==x) 
    if(!liked){
        let cuser=req.cookies.token
        foraddlike.push(cuser.user)
        console.log(foraddlike);
        res.render('post',{post1})
    }else{
        let remlike=foraddlike.indexOf(token.user)
        foraddlike.splice(remlike,1)
        res.render('post',{post1})

    }
    // }
    // else{
    //     num=1
    //     let cuser=req.cookies.token
    //     foraddlike.pop(cuser.user)
    //     res.render('post',{post1})
    // }
    
}
exports.logout = async (req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/login')
}


