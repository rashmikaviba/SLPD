const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const notificationSchema = new Schema({

 
    //coloumn names of the notification
    notID: {
        type:String,
        required:true

    },
    title: {
        type:String, //Data type
        required:true //It is a must to have this value
    },
    description: {
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    }
    
});

const Notification = mongoose.model("Notification",notificationSchema);

module.exports=Notification;