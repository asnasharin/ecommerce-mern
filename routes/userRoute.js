import express from "express";
import { RegisterController } from "../controllers/userController.js";

const route = express.Router();

route.post("/register", RegisterController);

export default route;

