import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all products
export const getProducts = createAsyncThunk(
  "get/products",
  async ({ price, category, rating }, thunkApi) => {
    try {
      // Build the query string
      let query = '?';
      if (price) query += `price=${price.join(',')}&`;
      if (category) query += `category=${category}&`;
      if (rating) query += `ratings=${rating}&`;

      // Make the API call with the query string
      const { data } = await axios.get(`http://localhost:5000/api/v1/get-product${query}`);
      console.log(data);
      return data.data;
    } catch (error) {
      if (error.response) {
        const payload = {
          message: error.response.data.message || "An error occurred",
          status: error.response.status,
        };
        return thunkApi.rejectWithValue(payload);
      } else {
        const payload = {
          message: error.message,
          status: 400,
        };
        return thunkApi.rejectWithValue(payload);
      }
    }
  }
);


// getAdmin products
export const getAdminProducts = createAsyncThunk(
  "get/AdminProducts",
  async(_, thunkApi) => {
    try {
      const  data  = await axios.get('http://localhost:5000/api/v1/admin/products', { headers: { 'Cache-Control': 'no-cache' } });
      console.log("api", data)
      return data.data;
      
    } catch (error) {
      if(error.response) {
        const payload = {
          message: error.response.data.message || "an error occured",
          status: error.response.status,
        };
        return thunkApi.rejectWithValue(payload);
    } else {
      const payload = {
        message: error.message,
        status: 400,
      };
      return thunkApi.rejectWithValue(payload);
    }
  }
}
)


export const clearErrors = () => async (dispatch) => {
  dispatch();
};