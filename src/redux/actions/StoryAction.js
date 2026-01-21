import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../services/apiConfig";
import api from "../../utils/api";

export const getStories = createAsyncThunk(
  "story/get",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`${baseUrl}status`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Story Response Raw:", response.data);

      // Handle both array response and nested response
      let stories = Array.isArray(response.data) ? response.data : response.data?.data || [];
      
      const newstories = stories.reduce((acc, item) => {
        const existing = acc.find(el => el.title === item.title);
        
        // Handle both single image and array of images
        const itemImages = Array.isArray(item.images) ? item.images : [item.image];

        if (existing) {
          existing.images.push(...itemImages);
        } else {
          acc.push({
            title: item.title,
            images: itemImages,
          });
        }

        return acc;
      }, []);

      
      return newstories;
    } catch (error) {
      console.log("Error fetching stories:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch failed"
      );
    }
  }
);
