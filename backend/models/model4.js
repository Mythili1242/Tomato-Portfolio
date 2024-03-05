var mongoose=require("mongoose")
const {Schema}=mongoose;

const likesSchema=new Schema({
   
     item:Array, //itemid,liked,disliked
    
    email:String
})

const likesmodel=mongoose.model("likes",likesSchema)

module.exports=likesmodel;
