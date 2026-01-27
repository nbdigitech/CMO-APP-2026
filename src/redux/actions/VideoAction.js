import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/apiConfig";
import api from "../../utils/api";
import { CHANNEL_ID, YOUTUBE_API_KEY } from "../../config/youtube";
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
  'youtube/livePast',
  async (_, thunkAPI) => {
    try {
      // 🔴 Live
      const liveRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
      );
      const liveJson = await liveRes.json();

      // ⏺️ Past live
      const pastRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=completed&type=video&order=date&maxResults=20&key=${YOUTUBE_API_KEY}`
      );
      const pastJson = await pastRes.json();

      return {
        liveNow: liveJson.items || [],
        pastLives: pastJson.items || [],
      };
    } catch (err) {
      return thunkAPI.rejectWithValue('YouTube fetch failed');
    }
  }
);

