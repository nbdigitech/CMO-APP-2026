import { createSlice } from "@reduxjs/toolkit";
import { getNotice } from "../actions/NoticeAction";

const noticeSlice = createSlice({
    name:"notice",
    initialState:{
        loading:false,
        error:null,
        noticeList:[],
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        //get notices
        builder
        .addCase(getNotice.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getNotice.fulfilled, (state, action)=> {
            state.loading = false;
            state.noticeList = action.payload
            state.error = null;
        })
        .addCase(getNotice.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })

    }
})

export default noticeSlice.reducer
// export const {  } = noticeSlice.actions