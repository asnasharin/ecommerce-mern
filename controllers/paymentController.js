import asyncHandler from "express-async-handler";
import Stripe from "stripe";

// Create a Stripe instance once (not inside the function)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller to create a payment intent
export const paymentController = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        res.status(400).json({ success: false, message: "Amount is required." });
        return;
    }

    try {
        const myPayment = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            metadata: {
                company: "Ecommerce", // Optional metadata
            },
        });

        res.status(200).json({ success: true, clientSecret: myPayment.client_secret });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Controller to send the Stripe publishable API key
export const sendStripeApiKey = asyncHandler(async (req, res) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
