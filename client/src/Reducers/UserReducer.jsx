import { createSlice } from "@reduxjs/toolkit";
import { signup } from "../Actions/userActions";

//  initail state
const user = localStorage.getItem("user")
 const initialState = {
    loading: false,
    isAuthenticted: false,
    user: user ? JSON.parse(user) : null,
    errorMessge: {
        message: "",
        status: null,
    },
 };

 const userReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
        },
        clearErrors: (state) => {
            state.errorMessge = {
                message: "",
                status: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(signup.pending, (state) => {
            state.loading = true;
            state.errorMessge = {
                message: null,
                status: null,
            };
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
        })
        .addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.isAuthenticted = false;
            state.errorMessge = action.payload;
        });
    },
 });

 export const { logout, reset } = userReducer.actions;

 export default userReducer.reducer;

