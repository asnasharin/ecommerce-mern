import { Router } from "express";
import { createProductController } from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/create-product",protect, isAdmin, createProductController);

export default route;