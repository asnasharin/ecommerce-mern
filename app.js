import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import productRoute from './routes/productRoute.js';
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js"

const app = express()

// middlewares

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://ecommerce-mern-1-gihk.onrender.com', 'https://frontendd-4r2c.onrender.com'] 
    : 'http://localhost:5000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());


// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute)
app.use('/api/v1', paymentRoute)

//error handler
app.use("*", notFound);
app.use(errorHandler);


export default app;
