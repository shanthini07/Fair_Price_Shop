const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const RationShopSchema = new mongoose.Schema({
    shopid:{type:String, unique:true},
    password:{type:String},
    members:[{type: ObjectId, ref: "Users"}],
    address:{
        place:{type:String},
        district:{type:String},
        pincode:{type:Number}
    },
    keeper:{
        name:{type:String},
        mobile:{type:String}
    },
    items:[{
        item:{type:String},
        quantity:{type:Number},
        price:{type:Number}
    }]
})

const RationShopModel=mongoose.model("RationShops", RationShopSchema)

module.exports=RationShopModel