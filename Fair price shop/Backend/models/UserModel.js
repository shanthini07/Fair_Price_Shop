const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    cardNo:{ type:String , unique:true},
    FamilyHead: {
        name:{  type: String },
        dob:{ type:String },
        identityMember:{
            role:{type:String},
            name:{type:String}
        }
    },
    address:{
        place:{type:String},
        district:{type:String},
        pincode:{type:Number}
    },
    mobile: { type: String, unique:true },
    familyMembers: [{  type: String }],
    kart:[{
        item:{type:String},
        quantity:{type:Number},
    }],
    bill:[{
        item:{type:String},
        quantity:{type:Number},
    }],
    cardType:{type:String},
    rationShopId:{
        type: ObjectId, ref: "RationShop"
    }
})

const UserModel=mongoose.model("Users", UserSchema)

module.exports=UserModel