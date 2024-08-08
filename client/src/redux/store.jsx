import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Reducers/UserReducer";
import ProductReducer from "../Reducers/ProductReducer";

const store = configureStore({
    reducer: {
        user: UserReducer,
        products: ProductReducer,
    }
})

export default store;