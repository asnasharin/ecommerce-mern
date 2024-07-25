import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js'


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

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});