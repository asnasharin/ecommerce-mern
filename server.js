const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

const app = express()
dotenv.config()

// db config
connectDB();

const PORT = process.env.PORT || 8000

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});