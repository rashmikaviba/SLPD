import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import expenseModel from './models/expenses.model.js';
import cors from 'cors';


dotenv.config();

mongoose
.connect(
    process.env.MONGO
)
.then( () => 
{ console.log('MongoDb is connected');
})
.catch((err) => {
    console.log(err);
});


const app=express();

app.use(express.json());

app.use(cors());

app.use(cors({
    origin:'http://localhost:3000'
}));

app.get('/expenses',(req, res)=>{
    expenseModel.find({})
    .then(expenses => res.json(expenses))
    .catch(err => res.json(err))
})

app.get('/getExpense/:id',(req,res) =>{
    const id = req.params.id;
    expenseModel.findById({_id:id})
    .then(expenses => res.json(expenses))
    .catch(err => res.json(err))
}) 

app.put('/updateExpense/:id',(req, res) =>{
    const id = req.params.id;
    expenseModel.findByIdAndUpdate({_id: id},{
        driver_id : req.body.driver_id , driver_name : req.body.driver_name , amount : req.body.amount , reason : req.body.reason} )
    .then(expenses => res.json(expenses))
    .catch(err => res.json(err))
})

app.delete('/deleteExpense/:id',(req,res) =>{
    const id = req.params.id;
    expenseModel.findByIdAndDelete({_id : id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})


app.post('/createExpense',(req, res) =>{
    expenseModel.create(req.body)
    .then(expenses => res.json(expenses))
    .catch(err => res.json(err))
})



app.listen(3000, () =>{
    console.log('Server is running on port 3000');
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

