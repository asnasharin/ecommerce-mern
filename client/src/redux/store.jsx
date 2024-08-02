import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Reducers/UserReducer";

const store = configureStore({
    reducer: {
        user: UserReducer,
    }
})

export default store;