var mongoose=require("mongoose")
const {Schema}=mongoose;

const orderschema=new Schema({
  
     items:Array,
    // items:{
	// 		'type': {type: String},
	// 		'value': [String]
	// 	},
    email:String,
    timestamp: { type: Date, default: Date.now }
})

const ordersmodel=mongoose.model("orders",orderschema)

module.exports=ordersmodel;
