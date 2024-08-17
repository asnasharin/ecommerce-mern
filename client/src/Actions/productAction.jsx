import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../Api/api"

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
      const { data } = await api.get(`/get-product${query}`);
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
      const  data  = await api.get('/admin/products');
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


// deleteproduct admin
export const DeleteProduct = createAsyncThunk(
  'product/deleteproduct',
  async(id, thunkApi) => {
    try {
      const { data } = await api.delete(`/admin/delete-prod/${id}`);
      return data;
  
    } catch (error) {
      if(error.response) {
        let payload = {
          message: error.response.data.message || "An error occured",
          status: error.response.status
        }
        return thunkApi.rejectWithValue(payload)
      } else {
        let payload = {
          message: error.message,
          status: error.status || 500
        }
        return thunkApi.rejectWithValue(payload)
      }
    }
  }
)


export const clearErrors = () => async (dispatch) => {
  dispatch();
};