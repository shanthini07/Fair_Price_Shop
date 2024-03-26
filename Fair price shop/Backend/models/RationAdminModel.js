const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const RationAdminSchema = new mongoose.Schema({
    id:{type:String},
    password:{type:String},
    mobile:{type:String}
})

const RationAdminModel=mongoose.model("RationAdmin", RationAdminSchema)

module.exports=RationAdminModel