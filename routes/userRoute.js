import express from "express";
import { loginController, RegisterController } from "../controllers/userController.js";

const route = express.Router();

route.post("/register", RegisterController);
route.post("/login", loginController)

export default route;

