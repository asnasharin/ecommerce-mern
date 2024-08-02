import axios from "axios";
 import { createAsyncThunk } from "@reduxjs/toolkit"

//  register user

export const signup = createAsyncThunk(
    "auth/signup",
    async (signupData, thunkAPI) => {
        try {
            const { data } = await axios.post("http://localhost:5000/api/v1/register", signupData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return data;
        } catch (error) {
            const axiosError = error;
            let payload;
            if (axiosError.message === "Network Error") {
                payload = {
                    message: axiosError.message,
                    status: 404,
                };
            } else {
                const Error = axiosError?.response?.data?.message || "An errro occurred";
                payload = {
                    message: Error,
                    status: axiosError.response?.status || 500,
                };
            }
            return thunkAPI.rejectWithValue(payload);
        }
    }
);