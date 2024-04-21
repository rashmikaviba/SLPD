import express  from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'
import expensesRoutes from './routes/expenses.route.js';
import expenseModel from './models/expenses.js';

dotenv.config();

const app= express();


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
// Middleware
app.use(express.json());
app.use(cors()); //Allow all origins for now, you can configure it more restrictively
app.use(bodyParser.json());
app.use('/images', express.static('images'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://Danisha:DanishaRodrigo@tw.w6rsuw2.mongodb.net/tw?retryWrites=true&w=majority&appName=tw', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/expenses",expensesRoutes);



