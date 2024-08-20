import { Router } from "express";
import { createProductController, createProductReview, deleteProductController, deleteReview, getAllProduct, getAllProductsAdmin, getAllReviews, getProductDetails, updateProduct } from "../controllers/productController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";


const route = Router();

route.post("/admin/create-product",protect, isAdmin, createProductController);
route.get("/get-product", getAllProduct);
route.get("/admin/products",protect, isAdmin,getAllProductsAdmin);
route.put("/update-prod/:id",protect, isAdmin, updateProduct);
route.delete("/admin/delete-prod/:id",protect, isAdmin, deleteProductController);
route.get("/product/:id", getProductDetails);
route.get("/reviews/:id", getAllReviews)
route.put("/reviews/new", protect, createProductReview);
route.delete("/product/reviews/delete", protect, isAdmin, deleteReview)

export default route;