import { createSlice } from "@reduxjs/toolkit";
import { getVideo } from "../actions/VideoAction";
import { getVideoLive } from "../actions/VideoAction";

const videoSlice = createSlice({
    name:"video",
    initialState:{
        loading:false,
        error:null,
        videoList:[],
        videoLiveList:[]
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        //get videos
        builder
        .addCase(getVideo.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getVideo.fulfilled, (state, action)=> {
            state.loading = false;
            state.videoList = action.payload
            state.error = null;
        })
        .addCase(getVideo.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })



         //get live videos
         builder
         .addCase(getVideoLive.pending, (state)=> {
             state.loading = true;
             state.error = null;
         })
         .addCase(getVideoLive.fulfilled, (state, action)=> {
             state.loading = false;
             state.videoLiveList = action.payload
             state.error = null;
         })
         .addCase(getVideoLive.rejected, (state, action)=> {
             state.loading = false;
             state.error = action.payload || 'Fetched Error';
         })

    }
})

export default videoSlice.reducer
// export const {  } = videoSlice.actions