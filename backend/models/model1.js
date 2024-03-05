var mongoose=require("mongoose")
const {Schema}=mongoose;

const userschema=new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
})

const usermodel=mongoose.model("userlists",userschema)

module.exports=usermodel;
