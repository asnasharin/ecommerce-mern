import express from "express"
import { paymentController, sendStripeApiKey } from "../controllers/paymentController";

const route = express.Router()

route.post("/payment/process", protect, paymentController);
route.get("/stripeapiKey", sendStripeApiKey)


export default route;