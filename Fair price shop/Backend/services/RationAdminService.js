const RationAdminModel=require('../models/RationAdminModel')
const RationShopModel = require('../models/RationShopModel')
const RationShopService = require('./RationShopService')
const UserService = require('./UserService')

const RationAdminService={
    login:async(adminid) => {
        var admin = await RationAdminModel.findOne({ id: adminid })
        return admin
    },

    signup:async(admin)=>{
        var admin=await RationAdminModel.create(admin)
        return admin
    },

    createNewShop:async(shopinfo)=>{
        shopinfo.items=[{
            item:"Rice (Pacha Arisi)",
            quantity:0,
            price:0
        },
        {
            item:"Rice (Pulungal Arisi)",
            quantity:0,
            price:0
        },
        {
            item:"Sugar (Sarkarai)",
            quantity:0,
            price:25
        },
        {
            item:"Wheat (Godhumai)",
            quantity:0,
            price:0
        },
        {
            item:"Palm Oil",
            quantity:0,
            price:25
        },
        {
            item:"Kerosene (Mannennai)",
            quantity:0,
            price:15.30
        },
        {
            item:"Lentil (Thuvaram Paruppu)",
            quantity:0,
            price:30
        }]
        var shop = await RationShopModel.create(shopinfo)
        return shop
    },

    createNewUser:async(user)=>{
        var rationshop=await RationShopModel.find()
        if(rationshop.length>0){
            for(var shop of rationshop){
                if(shop.address.district===user.address.district){
                    user.rationShopId=shop._id
                    const uid=await UserService.signup(user)
                    await RationShopService.addMember(shop._id,uid._id)
                    return 1
                }
            }
        }
        else{
            return 0
        }
    },

    updateItems:async(rid,itemname)=>{
        var shop = await RationShopModel.findById(rid)
        if(shop.items.length>0){
            for(var i of shop.items){
                if(i.item===itemname && i.quantity<50){
                    var quan=i.quantity
                    var index=shop.items.indexOf(i)
                    var ex=await RationShopModel.findByIdAndUpdate(rid,{
                        $set: {
                            [`items.${index}`]:{
                                item:itemname,
                                price:i.price,
                                quantity:quan+100
                            }
                          }
                    })
                }
            }
        }
    },

    updatePrice:async(rid,item)=>{
        var shop=await RationShopModel.findById(rid)
        if(shop.items.length>0){
            for(var i of shop.items){
                if(i.item===item.item){
                    await RationShopModel.findByIdAndUpdate(rid,{
                        $set: {
                            [`items.${shop.items.indexOf(i)}`]:{
                                item:i.item,
                                price:item.price,
                                quantity:i.quantity
                            }
                          }
                    })
                }
            }
        }
    },

    getShops:async()=>{
        var shops=RationShopModel.find()
        return shops
    },

    changeShopKeeper:async(rid,keeperinfo)=>{
        await RationShopModel.findByIdAndUpdate(rid,{
            $set:{
                keeper:keeperinfo
            }
        })
    }
}
module.exports=RationAdminService