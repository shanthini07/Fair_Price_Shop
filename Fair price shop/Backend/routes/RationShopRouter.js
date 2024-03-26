const RationShopService = require('../services/RationShopService');

const RationShopRouter = require('express').Router();

RationShopRouter.post('/shoplogin',async(req,res)=>{
    const {shopid}=req.body
    var shop = await RationShopService.login(shopid)
    res.send(shop)
})

RationShopRouter.post('/viewmembers',async(req,res)=>{
    const {sid}=req.body
    var members = await RationShopService.findMembers(sid)
    res.send(members)
})

RationShopRouter.get('/viewshops',async(req,res)=>{
    var shops = await RationShopService.shops()
    res.send(shops)
})

RationShopRouter.post('/provideitems',async(req,res)=>{
    const {uid}=req.body
    await RationShopService.provideItems(uid)
    res.send('Items are delivered')
})

module.exports=RationShopRouter