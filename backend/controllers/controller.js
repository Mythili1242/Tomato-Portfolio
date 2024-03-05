const restmodel=require("../models/model")
const usermodel=require("../models/model1")
const cartmodel=require("../models/model3")
const likesmodel=require("../models/model4")
const ordersmodel=require("../models/model5")
// const itemsmodel=require("../models/model2/menuModel")
// const maincoursemodel=require("../models/model2/menuModel1")
// const dessertsmodel=require("../models/model2/menuModel2")
// const beveragesmodel=require("../models/model2/menuModel3")

const {menuModel:itemsmodel,menuModel1:maincoursemodel,menuModel2:dessertsmodel,menuModel3:beveragesmodel}=require("../models/model2")
const {verify}=require("jsonwebtoken")
const _ = require("lodash")
const Joi = require ('joi')

const {hash,compare}=require("bcryptjs")
// require("dotenv/config")
const {createAccessToken,createRefreshToken,sendAccessToken,sendRefreshToken}=require("./tokens")
    

const getlist=async (req,res,next)=>{
try{
    return  res.json(await restmodel.find())
}
catch(err){
    console.log(err.message);
}
}

const postuser=async (req,res,next)=>{
    try{
     //   console.log(req.body)
        const hashedPassword=await hash(req.body.password,10)
        await usermodel.create({...req.body,password:hashedPassword}).then(res=>console.log(res)).catch(err=>console.log(err))
    //    return res.json(await usermodel.find())
    return res.send("user created")
    }
    catch(err){
        console.log(err)
    }
}

//cart

const updateitems1=async (req,res,next)=>{
    console.log("hi")
    
try{
    console.log(req.body)
    const email=req.body.email

    const user=await cartmodel.findOne({email:email})
    if(user){
        console.log("hello")
        const name=req.body.name
   cartmodel.findOne({email:email},{items:{$elemMatch:{name:name}}}).then(resp=>{
// const count1=resp.items[0].count;
// const count2=count1+req.body.count
// console.log(count2)
 //   resp.items[0].count+=2;
 resp.items[0]={val:req.body.val,name:name,symbol:req.body.symbol,count:req.body.count}
   // resp.items[0].name="ram"
   return resp.save();
   })
   .then(respons=>console.log(respons))
.catch(err=>console.log(err))
    res.send("updated")
    }

}
catch(err){
    console.log(err.message)
}
}




const updateitems=async (req,res,next)=>{
    console.log("hi")
    
try{
    console.log(req.body)
    const email=req.body.email

    const user=await cartmodel.findOne({email:email})
    if(user){
        console.log("hello")
        const name=req.body.name
   cartmodel.findOne({email:email},{items:{$elemMatch:{name:name}}}).then(resp=>{
const count1=resp.items[0].count;
const count2=count1+req.body.count
console.log(count2)
 //   resp.items[0].count+=2;
 resp.items[0]={val:req.body.val,name:name,symbol:req.body.symbol,count:count2}
   // resp.items[0].name="ram"
   return resp.save();
   })
  
   //cartmodel.findOneAndUpdate({email:email},{user},{...respons})
   .then(respons=>console.log(respons))
.catch(err=>console.log(err))
    // const details=await cartmodel.findOneAndUpdate({email:email},{items:{$elemMatch:{name:name}}},{ $inc: {
    //     'items.$.count': req.body.count
    //   }})
    // console.log(details)
    // res.send(details)
    res.send("updated")
    }

}
catch(err){
    console.log(err.message)
} 
}



const additems=async (req,res,next)=>{
    try{
//console.log(req.body);
const email=req.body.email
//console.log(email)
const user=await cartmodel.findOne({email:email})
    if(user){
        const items = req.body.cartitems.map(item => ({...item }));
       console.log(items)
        await cartmodel.updateMany({email:email,items:items});
     //   console.log("updated")  
        res.send("item updated")
    }
    else{
        const items = req.body.cartitems.map(item => ({...item }));
      //  console.log(items)
        await cartmodel.insertMany({email:email,items:items});
     //   console.log("item added")
        res.send("item added")
    }

   }
    catch(err){
        console.log(err)
    }
}

//getcartitems

const getitems=async (req,res,next)=>{
    const email=req.params.email;
  
    const user=await cartmodel.findOne({email:email})
   // console.log(user)
    if(user){
    //  const b=await cartmodel.findOne({user})
     console.log(user)
     res.send(user)   
    }
    else{
        res.send("no items")
       // res.send({msg:"no items"})
    }
}


//admin
const postrest=async(req,res,next)=>{
    try{
     //   console.log(req.body);

        const schema = Joi.object().keys({
            rname:Joi.string().required(),
            imgdata:Joi.string().required(),
            address:Joi.string().required(),
            delimg:Joi.string().required(),
            somedata:Joi.string().required(),
            price:Joi.string().required(),
            rating:Joi.string().required(),
            arrimg:Joi.string().required()
          })
          const {error}=schema.validate(req.body);
          const errorDetails=_.get(error,"details",[])
      
        if(!_.isEmpty(errorDetails)){
           return res.send(errorDetails) 
        }



        await restmodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
        return res.send("Restaurant added")
    }
    catch(err){
        console.log(err)
    }
}

//admin

//starters
const postmenu=async(req,res,next)=>{
    try{
    //    console.log(req.body);

        const schema = Joi.object().keys({

            name:Joi.string().required(),
            imgsrc:Joi.string().required(),
            rating:Joi.number().required(),
            cost:Joi.number().required(),
            symbol:Joi.string().required(),
            desc:Joi.string().required()
          })
          const {error}=schema.validate(req.body);
          const errorDetails=_.get(error,"details",[])
      
        if(!_.isEmpty(errorDetails)){
            console.log(errorDetails)
           return res.send(errorDetails) 
        }


        await itemsmodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
        return res.send("Menu added")
    }
    catch(err){
        console.log(err)
    }
}

//maincourse
const maincourse1=async(req,res,next)=>{
    try{
    //     console.log(req.body);

        const schema = Joi.object().keys({

            name:Joi.string().required(),
            imgsrc:Joi.string().required(),
            rating:Joi.string().required(),
            cost:Joi.number().required(),
            symbol:Joi.string().required(),
            desc:Joi.string().required()
          })
          const {error}=schema.validate(req.body);
          const errorDetails=_.get(error,"details",[])
      
        if(!_.isEmpty(errorDetails)){
           return res.send(errorDetails) 
        }


        await maincoursemodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
        return res.send("Menu added")
    }
    catch(err){
        console.log(err)
    }
}


//desserts
const desserts1=async(req,res,next)=>{
    try{
      //  console.log(req.body);

        const schema = Joi.object().keys({

            name:Joi.string().required(),
            imgsrc:Joi.string().required(),
            rating:Joi.string().required(),
            cost:Joi.number().required(),
            symbol:Joi.string().required(),
            desc:Joi.string().required()
          })
          const {error}=schema.validate(req.body);
          const errorDetails=_.get(error,"details",[])
      
        if(!_.isEmpty(errorDetails)){
           return res.send(errorDetails) 
        }
        await dessertsmodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
        return res.send("Menu added")
    }
    catch(err){
        console.log(err)
    }
}

//beverages
const beverages1=async(req,res,next)=>{
    try{
     //   console.log(req.body);
        const schema = Joi.object().keys({

            name:Joi.string().required(),
            imgsrc:Joi.string().required(),
            rating:Joi.string().required(),
            cost:Joi.number().required(),
            symbol:Joi.string().required(),
            desc:Joi.string().required()
          })
          const {error}=schema.validate(req.body);
          const errorDetails=_.get(error,"details",[])
      
        if(!_.isEmpty(errorDetails)){
           return res.send(errorDetails) 
        }
        await beveragesmodel.create({...req.body}).then(res=>console.log(res)).catch(err=>console.log(err));
        return res.send("Menu added")
    }
    catch(err){
        console.log(err)
    }
}


//============================
//getting menu

//starters
const items=async (req,res,next)=>{
    try{
      return res.json(await itemsmodel.find())
    }
    catch(err){
        console.log(err.message)
    }
}


//maincourse
const maincourse=async (req,res,next)=>{
    try{
      return res.json(await maincoursemodel.find())
    }
    catch(err){
        console.log(err.message)
    }
}


//desserts
const desserts=async (req,res,next)=>{
    try{
      return res.json(await dessertsmodel.find())
    }
    catch(err){
        console.log(err.message)
    }
}

//beverages
const beverages=async (req,res,next)=>{
    try{
      return res.json(await beveragesmodel.find())
    }
    catch(err){
        console.log(err.message)
    }
}


const loginuser=async (req,res,next)=>{
    const {email,password}=req.body;
    try{

        const user=await usermodel.findOne({email:email})
        
        if(!user) throw new Error("user not exists")
        const valid=await compare(password,user.password)
        //if(!valid) res.send("password not correct")
        if(!valid) res.send({msg:"password not correct"})
        if  (!valid) throw new Error("Incorrect password")
        const accessToken=createAccessToken(user.firstname)
        const refreshToken=createRefreshToken(user.firstname)
        user.refreshToken=refreshToken;
        sendRefreshToken(res,refreshToken)
        sendAccessToken(req,res,accessToken)
    }
    catch(err){
        // res.send(err.message)
        console.log(err.message);
    }
}


const refresh=async (req,res,next)=>{
    const token=req.cookies.refreshtoken;
    if(!token) return res.send({accesstoken:""})
    let payload=null;
    try{
        payload=verify(token,process.env.REFRESH_TOKEN_SECRET)   //returns decoded token
    }
    catch(err){
        return res.send({accesstoken:""})
    }
    const user=usermodel.findOne({firstname:payload.firstname})
    if(!user) return res.send({accesstoken:""})

    if(user.refreshtoken!==token){
        return res.send({accesstoken:''})
    }

    const accessToken=createAccessToken(user.firstname)
    const refreshToken=createRefreshToken(user.firstname)
    user.refreshToken=refreshToken;
    sendRefreshToken(res,refreshToken)
    return res.send({accessToken})
}

const logout=async (req,res,next)=>{
    console.log("logout")
    res.clearCookie("refreshtoken",{path:"/refresh"})
    return res.json({message:"logged out"})
}



const protected=async (req,res,next)=>{
    try{
       
      const authorization=req.headers['authorization'];
    //   console.log(authorization)
     // if(!authorization) throw new Error("You need to login");
      const token=authorization.split(' ')[1];
    //   console.log(token)
      const {firstname}=verify(token,process.env.ACCESS_TOKEN_SECRET) 
//console.log(firstname);
  
  if(firstname!=null){
    if(firstname=="admin"){
       // console.log("authorized")
    res.send({
        data:"authorized"
    })
}
else{
    console.log("not authorized")
    res.send({
        data:"not authorized"
    })
}
  }
  
    }
    catch(err){
        res.send({
            error:`${err.message}`
        })
    }
}



const starterlikes=async (req,res,next)=>{
    
    try
    {
        console.log(req.body)
const id=req.body.itemid;
const isLike=req.body.isLike;
 console.log(id,isLike)
const email=req.body.email;
likesmodel.findOne({email:email})
//.then(res=>console.log(res.item[0].liked))
itemsmodel.findById(id)
.then(menuItem => {
     console.log(menuItem)
    if (!menuItem) {
      console.error('Menu item not found');
      return;
    }

    if (isLike==true) {
      menuItem.like += 1;
      console.log("inc")
    } 
    if(isLike==false) {
      menuItem.dislike += 1;

    }
if(isLike=="unlike"){
    console.log("unliked")
    console.log(menuItem.like)
    menuItem.like=menuItem.like-1;
    console.log(menuItem.like)
}

if(isLike=="undislike"){
    menuItem.dislike -= 1;  
}
    return menuItem.save();
  })
  .then(() => {
    console.log('Like/dislike count updated successfully');
res.send("updated successfully")

    })
    }
    catch(err){
        console.log(err)
    }
}


const maincourselikes=async (req,res,next)=>{
    
    try
    {
        console.log(req.body)
const id=req.body.itemid;
const isLike=req.body.isLike;
// console.log(id,isLike)
maincoursemodel.findById(id)
.then(menuItem => {
    // console.log(menuItem)
    if (!menuItem) {
      console.error('Menu item not found');
      return;
    }

    if (isLike==true) {
        menuItem.like += 1;
        console.log("inc")
      } 
      if(isLike==false) {
        menuItem.dislike += 1;
  
      }
  if(isLike=="unlike"){
      console.log("unliked")
      console.log(menuItem.like)
      menuItem.like=menuItem.like-1;
      console.log(menuItem.like)
  }
  
  if(isLike=="undislike"){
      menuItem.dislike -= 1;  
  }

    return menuItem.save();
  })
  .then(() => {
    console.log('Like/dislike count updated successfully');
res.send("updated successfully")

    })
    }
    catch(err){
        console.log(err)
    }
}


const dessertlikes=async (req,res,next)=>{
    
    try
    {
        console.log(req.body)
const id=req.body.itemid;
const isLike=req.body.isLike;
// console.log(id,isLike)
dessertsmodel.findById(id)
.then(menuItem => {
    // console.log(menuItem)
    if (!menuItem) {
      console.error('Menu item not found');
      return;
    }

    if (isLike==true) {
        menuItem.like += 1;
        console.log("inc")
      } 
      if(isLike==false) {
        menuItem.dislike += 1;
  
      }
  if(isLike=="unlike"){
      console.log("unliked")
      console.log(menuItem.like)
      menuItem.like=menuItem.like-1;
      console.log(menuItem.like)
  }
  
  if(isLike=="undislike"){
      menuItem.dislike -= 1;  
  }

    return menuItem.save();
  })
  .then(() => {
    console.log('Like/dislike count updated successfully');
res.send("updated successfully")

    })
    }
    catch(err){
        console.log(err)
    }
}


const beverageslikes=async (req,res,next)=>{
    
    try
    {
        console.log(req.body)
const id=req.body.itemid;
const isLike=req.body.isLike;
// console.log(id,isLike)
beveragesmodel.findById(id)
.then(menuItem => {
    // console.log(menuItem)
    if (!menuItem) {
      console.error('Menu item not found');
      return;
    }

    if (isLike==true) {
        menuItem.like += 1;
        console.log("inc")
      } 
      if(isLike==false) {
        menuItem.dislike += 1;
  
      }
  if(isLike=="unlike"){
      console.log("unliked")
      console.log(menuItem.like)
      menuItem.like=menuItem.like-1;
      console.log(menuItem.like)
  }
  
  if(isLike=="undislike"){
      menuItem.dislike -= 1;  
  }

    return menuItem.save();
  })
  .then(() => {
    console.log('Like/dislike count updated successfully');
res.send("updated successfully")

    })
    }
    catch(err){
        console.log(err)
    }
}

const removelikes=async (req,res,next)=>{
    try{
        // const user=await likesmodel.findOne({email:req.body.email})
        // console.log(user)
        if(Object.keys(req.body.item[0])[1]=="liked")
        {
           
            const user=await likesmodel.findOneAndUpdate({email:req.body.email},{ $pull:{item:{ itemid:req.body.item[0].itemid,liked:req.body.item[0].liked}}})
            res.send("deleted")
        }
        if(Object.keys(req.body.item[0])[1]=="disliked")
        {
            const user=await likesmodel.findOneAndUpdate({email:req.body.email},{ $pull:{item:{ itemid:req.body.item[0].itemid,disliked:req.body.item[0].disliked}}})
            res.send("deleted")
        }
         
         // if(user){
       
        // for(i=0;i<user.item.length;i++){
           
        //     if(user.item[i].itemid==req.body.item[0].itemid){
        //         console.log("success")
        //         const user=await likesmodel.findOneAndUpdate({email:req.body.email},{ $pull:{item:{ itemid:req.body.item[0].itemid,liked:true}}})
        //      use elemMatch to identify
        //   console.log(user)
        //     }

//{},
// { $pull: { items: { $elemMatch: { name: "Item 2" } } } },
// { multi: true }

        // }
        // console.log("hi")
        // }
    }
    catch(err){
        console.log(err)
    }
}


const postlikes=async(req,res,next)=>{
    try{
console.log(req.body)
const user=await likesmodel.findOne({email:req.body.email})
console.log("post likes")
    if(user){
    //    console.log(user) 
        const items =req.body.item&&req.body.item.map(item => ({...item }));
    //   console.log(items[0])
     //   console.log(req.body.item)
       const items1=user.item.map(item=>({...item}))
    //   console.log(items1)
    // const filtered=  items1.filter(item=>{
    //     return item.itemid===items[0].itemid
    // })
    // console.log(filtered)



      await (await likesmodel.updateMany({email:req.body.email},{item:[items[0],...items1]}).then(res=>console.log(res)))
        console.log("updated")
        res.send("updated")
    }
    else{
       
        await likesmodel.insertMany(req.body);
        console.log("likes added")
        res.send("likes added")
    }

    }
    catch(err){
console.log(err.message)
    }
}

const getlikes=async (req,res,next)=>{
    console.log("first")
    try{
        const user=await likesmodel.findOne({email:req.body.email})
        if(user){
            const items1=user.item.map(item=>({...item}))
            res.send(items1)
        }
    }
    catch(err){
        console.log(err)
    }
}

const orders=async(req,res,next)=>{
    try{
        console.log(req.body);
        await ordersmodel.create({...req.body}).then(res=>{console.log(res)})
        res.json({msg:"order added"})
    }
    catch(err){
        console.log(err);
    }
}

const getOrders=async (req,res,next)=>{
    try{
const orderdetails=await ordersmodel.find({email:req.body.email}).sort({timestamp:'asc'}).exec()
res.send(orderdetails)
    }
    catch(err){
        console.log(err);
    }
}

module.exports={getlist,postuser,loginuser,refresh,logout,items,protected,postrest,postmenu,maincourse,desserts,beverages,maincourse1,desserts1,beverages1,additems,getitems,starterlikes,maincourselikes,dessertlikes,beverageslikes,postlikes,getlikes,removelikes,updateitems
    ,updateitems1,orders,getOrders}