
var mongoose=require("mongoose");
var {Schema}=mongoose;

var menuSchema=new Schema({
    name:String,
    imgsrc:String,
    rating:Number,
    cost:Number,
    symbol:String,
    desc:String,
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0   
    }
})

var menuModel=mongoose.model("menus",menuSchema) //starters
var menuModel1=mongoose.model("maincourses",menuSchema)
var menuModel2=mongoose.model("desserts",menuSchema)
var menuModel3=mongoose.model("beverages",menuSchema)
module.exports={menuModel,menuModel1,menuModel2,menuModel3};


