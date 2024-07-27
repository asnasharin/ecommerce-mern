import express from 'express';
import app from "./app.js"
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cloudinary from "cloudinary";

dotenv.config();

// db config
connectDB();

// cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
