import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart } from "../Actions/CartActions";

// Initialize cartItems from localStorage if available
const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const initialState = {
    cartItems: storedCartItems,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = {
                message: "",
                status: null,
            };
        },
    },  
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            const item = action.payload;
            const existItem = state.cartItems.find((i) => i.productId === item.productId);

            if (existItem) {
                state.cartItems = state.cartItems.map((i) => 
                    i.productId === existItem.productId ? item : i 
                );
            } else {
                state.cartItems.push(item);
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            console.error("Add to Cart Error:", action.payload); // Debugging log
            state.error = action.payload;
        })
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Remove from Cart Payload:", action.payload); // Debugging log
            state.cartItems = state.cartItems.filter((i) => i.productId !== action.payload);

            console.log("Updated Cart Items after Remove:", state.cartItems); // Debugging log
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            console.error("Remove from Cart Error:", action.payload); // Debugging log
            state.error = action.payload;
        });
    }
});

export default cartSlice.reducer;
