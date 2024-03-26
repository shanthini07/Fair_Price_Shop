const UserService = require('../services/UserService');
const UserRouter= require('express').Router();
const twilio = require('twilio');

UserRouter.post('/userlogin',async(req,res)=>{
    const {cardno}=req.body
    var user=await UserService.login(cardno)
    res.send(user)
})

UserRouter.get('/getusers',async(req,res)=>{
    var users=await UserService.getUsers()
    res.send(users)
})

UserRouter.post('/addtokart',async(req,res)=>{
    const {id,kartitem}=req.body
    await UserService.addToKart(id,kartitem)
    res.send('Kart Added')
})

UserRouter.post('/placeorder',async(req,res)=>{
    const {id}=req.body
    var bill=await UserService.placeOrder(id)
    res.send(bill)
})

UserRouter.post('/sms',async(req,res)=>{
    const { to,otp } = req.body;

    const accountSid = 'your_accountSid';
    const authToken = 'your_auth_token';
    const client = twilio(accountSid, authToken);

    client.messages.create({
        body: otp,
        to: to,
        from: 'your_twilio_number'
    }).then(() => {
        res.send('SMS sent successfully!');
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error sending SMS');
    })
}) 

module.exports=UserRouter