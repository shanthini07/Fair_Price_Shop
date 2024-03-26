const mongoose=require('mongoose')
var app=require('express')()
var jbp=require('body-parser').json()
var cors=require('cors')()
var urle=require('body-parser').urlencoded({ extended: false })
const RationAdminRouter = require('./routes/RationAdminRouter')
const RationShopRouter = require('./routes/RationShopRouter')
const UserRouter = require('./routes/UserRouter')

app.use(jbp)
app.use(cors)
app.use(urle)
app.use(RationAdminRouter)
app.use(RationShopRouter)
app.use(UserRouter)

mongoose.connect('mongodb://localhost:27017/rationapp').then(()=>{
    console.log("Successfully Connected")
}).catch(()=>{
    console.log("Could not connect")
})

app.listen(8090,()=>{
    console.log('Ration App is Running')
})