import express from "express"
import { isAdmin, protect } from "../middlewares/authMiddleware.js"
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrder } from "../controllers/orderController.js"

const route = express.Router()

route.post("/order/create", protect, createOrder);
route.get("/order/:id", protect, getSingleOrder);
route.get("/orders/myorder", protect, myOrders);
route.get("/admin/orders", protect, isAdmin, getAllOrders);
route.put("/admin/order/:id", protect, isAdmin, updateOrder);
route.delete("/admin/order/delete/:id", protect, isAdmin, deleteOrder);


export default route;