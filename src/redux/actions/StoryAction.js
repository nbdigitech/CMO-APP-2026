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

      // Handle both array response and nested response
      let stories = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];

      // ✅ 1. Reverse stories (latest first)
      const reversedStories = [...stories].reverse();

      // ✅ 2. Group by title AFTER reversing
      const newstories = reversedStories.reduce((acc, item) => {
        const existing = acc.find(el => el.title === item.title);

        const itemImages = Array.isArray(item.images)
          ? item.images
          : [item.image];

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
console.log("Grouped Stories:", newstories);
      return newstories;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch failed"
      );
    }
  }
);
