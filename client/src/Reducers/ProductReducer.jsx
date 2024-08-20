import { createSlice } from "@reduxjs/toolkit";
import { createProduct, DeleteProduct, getAdminProducts, getProducts } from "../Actions/productAction";

const initialUserState = {
    products: [],
    error: null,
    loading: false,
};

const initialAdminState = {
    products: [],
    error: null,
    loading: false,
    success: false,
};

const productSlice = createSlice({
    name: "products",
    initialState: { user: initialUserState, admin: initialAdminState },
    reducers: {
        clearErrors: (state) => {
            state.user.error = null;
            state.admin.error = null;
        },
        clearSuccess: (state) => {
            state.admin.success = false;
        }
    },
    extraReducers: (builder) => {
        // User Products
        builder
            .addCase(getProducts.pending, (state) => {
                state.user.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.user.loading = false;
                state.user.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.user.loading = false;
                state.user.error = action.payload;
            });

        // Admin Products
        builder
            .addCase(getAdminProducts.pending, (state) => {
                state.admin.loading = true;
            })
            .addCase(getAdminProducts.fulfilled, (state, action) => {
                state.admin.loading = false;
                state.admin.products = action.payload;
            })
            .addCase(getAdminProducts.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
            });

        // Admin Delete Product
        builder
            .addCase(DeleteProduct.pending, (state) => {
                state.admin.loading = true;
            })
            // .addCase(DeleteProduct.fulfilled, (state, action) => {
            //     state.admin.loading = false;
            //     state.admin.products = state.admin.products.filter(
            //         (product) => product._id !== action.meta.arg
            //     );
            // })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.admin.loading = false;
                if (Array.isArray(state.admin.products)) {
                    state.admin.products = state.admin.products.filter(
                        (product) => product._id !== action.meta.arg
                    );
                } 
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
            });

        // Admin Create Product
        builder
            .addCase(createProduct.pending, (state) => {
                state.admin.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.admin.loading = false;
                state.admin.products.push(action.payload);
                state.admin.error = null;  
                state.admin.success = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.admin.loading = false;
                state.admin.error = action.payload;
                state.admin.success = false;
            });
    },
});

export const { clearErrors } = productSlice.actions;
export default productSlice.reducer;
