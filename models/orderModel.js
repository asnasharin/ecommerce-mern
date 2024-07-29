import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: String, 
            required: true,
        },
        phoneNo: {
            type: String, 
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },

    // order item details
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "ProductModel",
                required: true,
            },
        },
    ],

    // user who ordered
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user", 
        required: true,
    },

    // payment status of product
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },

    // payment timing
    paidAt: {
        type: Date,
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },

    // order pending or delivered or confirmed
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },

    deliveredAt: Date,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const OrderModel = mongoose.model("OrderModel", orderSchema);

export default OrderModel;
