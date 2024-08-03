import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register user

export const signup = createAsyncThunk(
    "auth/signup",
    async (signupData, thunkAPI) => {
        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/v1/register",
                signupData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return data; 
        } catch (error) {
            let payload;
            
            if (error.response) {

                payload = {
                    message: error.response.data.message || "An error occurred",
                    status: error.response.status,
                };
            } else if (error.request) {

                payload = {
                    message: "Network Error: No response received",
                    status: 0,
                };
            } else {

                payload = {
                    message: error.message || "An unknown error occurred",
                    status: 500,
                };
            }
            
            return thunkAPI.rejectWithValue(payload);
        }
    }
);
