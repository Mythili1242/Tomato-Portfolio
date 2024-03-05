var mongoose=require("mongoose")
const {Schema}=mongoose;

const cartchema=new Schema({
    // val:Number,
    // name:String,
    // symbol:String,
    // count:Number,
     items:Array,
    // items:{
	// 		'type': {type: String},
	// 		'value': [String]
	// 	},
    email:String
})

const cartmodel=mongoose.model("cartitems",cartchema)

module.exports=cartmodel;
