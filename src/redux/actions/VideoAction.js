import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/apiConfig";
import api from "../../utils/api";
import {  channelId,  youtubeApikey } from "../../config/youtube";
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
  async ({ pageToken = null, append = false } = {}, thunkAPI) => {
    try {
      // 🔴 Live + ⏺️ Past live - PARALLEL FETCH (Faster)
      const [liveRes, pastRes] = await Promise.all([
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${youtubeApikey}`
        ),
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=completed&type=video&order=date&maxResults=10${pageToken ? `&pageToken=${pageToken}` : ''}&key=${youtubeApikey}`
        )
      ]);

      const liveJson = await liveRes.json();
      const pastJson = await pastRes.json();

      return {
        liveNow: liveJson.items || [],
        pastLives: pastJson.items || [],
        nextPageToken: pastJson.nextPageToken || null,
        append: append, // Flag to append or replace
      };
    } catch (err) {
      return thunkAPI.rejectWithValue('YouTube fetch failed');
    }
  }
);

