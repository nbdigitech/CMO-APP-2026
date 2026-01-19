import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/apiConfig";
import api from "../../utils/api";
export const getEventCorner = createAsyncThunk(
    "eventCorner/get",
    async ({}, thunkAPI) => {
        try{
            const response = await api.get(`${baseUrl}event-updates`,{
                headers: {
                    Accept: 'application/json',
                  }
            })
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetched failed');
        }
    }
)
