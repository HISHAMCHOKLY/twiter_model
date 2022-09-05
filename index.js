const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')

app.set('view engine','ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())
let home=require('./route/homeroute')



app.use('/',home)



app.listen(2000)