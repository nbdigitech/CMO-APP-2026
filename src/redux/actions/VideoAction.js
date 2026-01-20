import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/apiConfig";
import api from "../../utils/api";
export const getVideo = createAsyncThunk(
    "videos/get",
    async ({}, thunkAPI) => {
        try{
            const response = await api.get(`${baseUrl}videos`,{
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

export const getVideoLive = createAsyncThunk(
    "videos_live/get",
    async ({}, thunkAPI) => {
        try{
            const response = await api.get(`${baseUrl}ytlive`,{
                headers: {
                    Accept: 'application/json',
                  }
            })
            console.log("response live video",response.data)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Fetched failed');
        }
    }
)
