const { number } = require("joi");
var mongoose=require("mongoose")
var {Schema}=mongoose;

const restschema=new Schema({
    rname:String,
    imgdata:String,
    address:String,
    delimg:String,
    somedata:String,
    price:String,
    rating:String,
    arrimg:String,
   
})

const rest=mongoose.model("restaurants",restschema)
module.exports=rest;