import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    driverId: {
        type: Number, 
        required: true,
        unique: true,
    },    
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    paymentId: {
        type: Number,
        required: true,
        unique: true, 
    },
    amount: {
        type: Number,
        required: true,
    },
    }, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;