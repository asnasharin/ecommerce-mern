import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import productRoute from './routes/productRoute.js';

const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(fileUpload());


// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", productRoute);

//error handler
app.use("*", notFound);
app.use(errorHandler);


export default app;