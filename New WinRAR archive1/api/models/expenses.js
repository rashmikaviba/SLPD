import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    driver_ID:{
        type: String,
        required: true,
        unique: true,
    },
    Driver_Name:{
        type: String,
        required: true,
    },
    Amount:{
        type: String ,
        required: true,
    },
    Reason:{
        type: String,
        required : true,
    },
    status: {
        type: String,
        enum: ["approve", "pending"],
        default: "pending"
    }
}, {timestamps: true}
);



const expenseModel = mongoose.model('expenses',expenseSchema);

export default expenseModel ;
