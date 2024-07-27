import { Router } from "express";
import { createProductController, getAllProduct, updateProduct } from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const route = Router();

route.post("/create-product",protect, isAdmin, createProductController);
route.get("/get-product", getAllProduct)
route.put("/update-prod/:id", updateProduct)

export default route;