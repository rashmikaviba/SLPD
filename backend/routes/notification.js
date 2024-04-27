const router=require("express").Router();
const {request}=require("express");
let Notification=require("../models/Notification");


//Data insertion
router.route("/add").post((req,res)=>{

const notID=req.body.notID;
const title = req.body.title;
const description= req.body.description;
const receiver = req.body.receiver;


const newNotification = new Notification({
    notID,title,description,receiver
})

newNotification.save().then(()=>{
    res.json("Request Added")
}).catch((err)=>{
    console.log(err);
    })
})

//Read all the values of Notification from the database
router.route("/").get((req,res)=>{
    Notification.find().then((notification)=>{
        res.json(notification)
    }).catch((err)=>{
        console.log(err)
    })
})

//Read values of one specific notification details
router.route("/get/:id").get(async(req,res)=>{
    let noId=req.params.id;
    // console.log("id: ", noId)
    const user=await Notification.findById(noId).then((notification)=>{
        res.status(200).send({status:"userFetch",notification})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error in getting notification request",error: err.message});
    })
})



//Getting valued of one notification by notID
router.route("/find/:notID").get(async(req,res)=>{  
    let notId=req.params.notID;
    await Notification.find({"notID":`${notId}`}).then((notification)=>{
        res.status(200).send({status:"NotificationFetch",notification})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error in getting notification request",error: err.message});
     })
})


//Update

router.route("/update/:id").put(async(req,res)=>{
    let noId=req.params.id;
    const {notID,title,description,receiver}=req.body;
    const updatenotification={
        notID,
        title,
        description,
        receiver
    }
const update=await Notification.findByIdAndUpdate(noId,updatenotification).then(()=>{
    res.status(200).send({status:"Notification details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data",error:err.message});

    })
})


//Delete
router.route("/delete/:id").delete(async(req,res)=>{
    let noId=req.params.id;

    await Notification.findByIdAndDelete (noId).then(()=>{
        res.status(200).send({status:"Notification request deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({Status:"Error with notification request delete",error:err.message});
    })
})

module.exports=router;