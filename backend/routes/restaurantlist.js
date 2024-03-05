var express=require("express")
var router=express.Router();
var cont=require("../controllers/controller")


router.get("/",cont.getlist)
router.get("/items",cont.items)
router.get("/maincourse",cont.maincourse)
router.get("/desserts",cont.desserts)
router.get("/beverages",cont.beverages)
router.get("/getitems/:email",cont.getitems)

router.post("/sign",cont.postuser)
router.post("/login",cont.loginuser)
router.post("/refresh",cont.refresh)
router.post("/logout",cont.logout)
router.post("/protected",cont.protected)
router.post("/postrest",cont.postrest)
router.post("/postmenu",cont.postmenu)
router.post("/maincourse1",cont.maincourse1)
router.post("/desserts1",cont.desserts1)
router.post("/beverages1",cont.beverages1)
router.post("/cartitems",cont.additems)
router.post("/starterlikes",cont.starterlikes)
router.post("/maincourselikes",cont.maincourselikes)
router.post("/dessertlikes",cont.dessertlikes)
router.post("/beverageslikes",cont.beverageslikes)
router.patch("/likes",cont.postlikes)
router.post("/getlikes",cont.getlikes)
router.post("/removelikes",cont.removelikes)
router.post("/updateitems",cont.updateitems)
router.post("/updateitems1",cont.updateitems1)
router.post("/orders",cont.orders)
router.post("/getOrders",cont.getOrders)
module.exports=router;


