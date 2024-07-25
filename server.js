import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';


const app = express()
dotenv.config()

// db config
connectDB();

const PORT = process.env.PORT || 8000

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1", userRouter);

//error handler
app.use("*", notFound)
app.use(errorHandler) 


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});