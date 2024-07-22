const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;