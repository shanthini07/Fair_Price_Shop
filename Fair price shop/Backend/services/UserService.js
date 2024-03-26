const RationShopModel = require('../models/RationShopModel')
const UserModel=require('../models/UserModel')

const UserService={
    login:async(cardno) => {
        var user = await UserModel.findOne({ cardNo: cardno })
        return user
    },

    signup:async(user)=>{
        var user=await UserModel.create(user)
        return user
    },

    addToKart:async(id,kartitem)=>{
        var user=await UserModel.findById(id)
        var f=1
        if(user.kart.length>0){
            for(var i of user.kart){
                if(i.item===kartitem.item){
                    f=0
                }
            }
        }
        if(f){
            await UserModel.findByIdAndUpdate(id,{
                $push:{
                    kart:kartitem
                }
            })
            var rid=await UserModel.findById(id)
            rid=rid.rationShopId
            if(kartitem){
                var shop=await RationShopModel.findById(rid)
                console.log(shop.items)
                var kart=shop.items
                for(var i of kart){
                    if(i.item===kartitem.item){
                        i.quantity-=kartitem.quantity
                    }
                }
                console.log(kart)
                await RationShopModel.findByIdAndUpdate(rid,{
                    $set: {
                        items:kart
                    }
                })
            }
        }
    },

    placeOrder:async(id)=>{
        var user = await UserModel.findById(id)
        var kart = user.kart
        await UserModel.findByIdAndUpdate(id,{
            bill:kart,
            kart:[]
        })
        return user.bill
    },

    getUsers:async()=>{
        var users=await UserModel.find()
        return users
    }

}
module.exports=UserService