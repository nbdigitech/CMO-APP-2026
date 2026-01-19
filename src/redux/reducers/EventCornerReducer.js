import { createSlice } from "@reduxjs/toolkit";
import { getEventCorner } from "../actions/EventCornerAction";

const eventCornerSlice = createSlice({
    name:"event_corner",
    initialState:{
        loading:false,
        error:null,
        eventCornerList:[],
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        //get event corner
        builder
        .addCase(getEventCorner.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEventCorner.fulfilled, (state, action)=> {
            state.loading = false;
            state.eventCornerList = action.payload
            state.error = null;
        })
        .addCase(getEventCorner.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })

    }
})

export default eventCornerSlice.reducer
// export const {  } = eventCornerSlice.actions