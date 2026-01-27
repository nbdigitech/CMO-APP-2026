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

        // 🔴 Current Live
        state.liveNow = action.payload.liveNow || [];

        // ⏺️ Past Live
        state.pastLives = action.payload.pastLives || [];

        state.error = null;
      })
      .addCase(getVideoLive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch Error";
      });
  },
});

export default videoSlice.reducer;
