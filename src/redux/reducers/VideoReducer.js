import { createSlice } from "@reduxjs/toolkit";
import { getVideo, getVideoLive } from "../actions/VideoAction";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    loading: false,
    error: null,

    // Existing
    videoList: [],
    videoLiveList: [],

    // 🔹 NEW (YouTube)
    liveNow: [],
    pastLives: [],
    nextPageToken: null, // For pagination
  },
  reducers: {},
  extraReducers: (builder) => {

    // -----------------------------
    // NORMAL VIDEOS
    // -----------------------------
    builder
      .addCase(getVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videoList = action.payload;
        state.error = null;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch Error";
      });

    // -----------------------------
    // YOUTUBE LIVE + PAST LIVE
    // -----------------------------
    builder
      .addCase(getVideoLive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVideoLive.fulfilled, (state, action) => {
        state.loading = false;

        // 🔴 Current Live (always replace)
        state.liveNow = action.payload.liveNow || [];

        // ⏺️ Past Live (append or replace)
        if (action.payload.append) {
          state.pastLives = [...state.pastLives, ...action.payload.pastLives];
        } else {
          state.pastLives = action.payload.pastLives || [];
        }

        // Save pagination token
        state.nextPageToken = action.payload.nextPageToken || null;

        state.error = null;
      })
      .addCase(getVideoLive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch Error";
      });
  },
});

export default videoSlice.reducer;
