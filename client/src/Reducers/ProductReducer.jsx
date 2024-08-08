
import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../Actions/productAction"

const initialState = {
    products: [] ,
    error: null,
    loading: false
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });
    },
});


export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;