import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import useRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => {
  console.log( 'MongoDB is connected ');
})
.catch ((err) => {
  console.log(err);
})

const app = express ();

app.use(express.json());

app.listen(3000, () => {

  console.log('Server is running port 3000');
});

app.use('/api/user', useRoutes);
app.use('/api/auth', authRoutes);