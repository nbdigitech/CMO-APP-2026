import { createSlice } from "@reduxjs/toolkit";
import { getPatrika } from "../actions/PatrikaAction";

const patrikaSlice = createSlice({
    name:"patrika",
    initialState:{
        loading:false,
        error:null,
        patrikaList:[],
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        //get patrika
        builder
        .addCase(getPatrika.pending, (state)=> {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPatrika.fulfilled, (state, action)=> {
            state.loading = false;
            state.patrikaList = action.payload
            state.error = null;
        })
        .addCase(getPatrika.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload || 'Fetched Error';
        })

    }
})

export default patrikaSlice.reducer
// export const {  } = patrikaSlice.actions