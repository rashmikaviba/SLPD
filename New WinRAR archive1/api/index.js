import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/database.config.js";
import cookieParser from "cookie-parser";
import expensesRoutes from "./routes/expenses.route.js";
dotenv.config();

// Import userRoutes
import UserRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import constants from "./constants.js";

import userRoutes from './routes/user1Routes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import payslipRoutes from './routes/payslipRoute.js';

import ratingRoutes from './routes/ratingRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount userRoutes under the /api/user path
// Mount userRoutes under the /api/user path

app.use(constants.API.PREFIX.concat("/user"), UserRouter);
app.use(constants.API.PREFIX.concat("/auth"), authRoutes);
app.use("/api/expenses",expensesRoutes);

app.use('/users1', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/payslips', payslipRoutes);

app.use('/api/ratings', ratingRoutes);

// Error handling middleware - should be placed after all routes
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Listen for incoming connections
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}..!!`);
  connectDB();
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("SIGINT received. Closing server gracefully.");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
