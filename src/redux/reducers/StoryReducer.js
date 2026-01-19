import { createSlice } from "@reduxjs/toolkit";
import { getStories } from "../actions/StoryAction";

const storySlice = createSlice({
    name:"story",
    initialState:{
        loading:false,
        error:null,
        storyList:[],
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        //get stories
        builder
        .addCase(getStories.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getStories.fulfilled, (state, action)=> {
            state.loading = false;
            state.storyList = action.payload
            state.error = null;
        })
        .addCase(getStories.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })

    }
})

export default storySlice.reducer
// export const {  } = storySlice.actions