const RationAdminModel = require('../models/RationAdminModel');
const RationAdminService = require('../services/RationAdminService');
const RationShopService = require('../services/RationShopService');

const RationAdminRouter = require('express').Router();

RationAdminRouter.post('/adminlogin',async(req,res)=>{
    const {adminid}=req.body
    var admin = await RationAdminService.login(adminid)
    res.send(admin)
})

RationAdminRouter.get('/getadmins',async(req,res)=>{
    var admins = await RationAdminModel.find()
    res.send(admins)
})

RationAdminRouter.post('/signup',async(req,res)=>{
    const admin=req.body
    var newadmin = await RationAdminService.signup(admin)
    res.send(newadmin)
})

RationAdminRouter.post('/newuser',async(req,res)=>{
    const user=req.body
    var newuser = await RationAdminService.createNewUser(user)
    res.send(newuser)
})

RationAdminRouter.post('/newshop',async(req,res)=>{
    const shop=req.body
    var newshop = await RationAdminService.createNewShop(shop)
    res.send(newshop)
})

RationAdminRouter.put('/updatequantity',async(req,res)=>{
    const {sid,item}=req.body
    await RationAdminService.updateItems(sid,item)
    res.send('Updated')
})

RationAdminRouter.put('/updateprice',async(req,res)=>{
    const {sid,item}=req.body
    await RationAdminService.updatePrice(sid,item)
    res.send('Updated')
})

RationAdminRouter.put('/changeshopkeeper',async(req,res)=>{
    const {sid,keeper}=req.body
    await RationAdminService.updatePrice(sid,keeper)
    res.send('Keeper Changed')
})

RationAdminRouter.get('/getshops',async(req,res)=>{
    var shops=await RationAdminService.getShops()
    res.send(shops)
})

RationAdminRouter.post('/getshop',async(req,res)=>{
    const {sid}=req.body
    var shop=await RationShopService.shopInfo(sid)
    res.send(shop)
})

RationAdminRouter.post('/search',async(req,res)=>{
    var {id}=req.body
    var shops=await RationAdminService.getShops();
    shops=shops.filter((shop)=>shop.shopid.includes(id.toLowerCase()))
    res.send(shops)
})

module.exports=RationAdminRouter