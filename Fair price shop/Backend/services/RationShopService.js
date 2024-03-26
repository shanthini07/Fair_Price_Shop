const RationAdminModel=require('../models/RationAdminModel')
const RationShopModel = require('../models/RationShopModel')
const UserModel = require('../models/UserModel')

const RationShopService={
    login:async(sid) => {
        var shop = await RationShopModel.findOne({ shopid: sid })
        return shop
    },

    findMembers:async(id)=>{
        var shopusers = await RationShopModel.findById(id)
        var members=[]
        if(shopusers.members){
            shopusers=shopusers.members
            if(shopusers.length>0){
                for(var i of shopusers){
                    members.push(await UserModel.findById(i))
                }
            }
        }
        return members
    },

    addMember:async(rid,uid)=>{
        await RationShopModel.findByIdAndUpdate(rid,{
            $push: {
                members:uid
            }
        })
        console.log(uid)
    },

    shopInfo:async(rid)=>{
        var shop=RationShopModel.findById(rid)
        return shop
    },

    shops:async()=>{
        var shops=RationShopModel.find()
        return shops
    },

    provideItems:async(id)=>{
        await UserModel.findByIdAndUpdate(id,{
            bill:[]
        })
    }
}
module.exports=RationShopService