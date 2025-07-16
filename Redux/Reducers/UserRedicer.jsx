import { createSlice } from "@reduxjs/toolkit";

const initialState = {}; 

const UserSlice = createSlice({
    name:"User",
    initialState,
    reducers:{
        set:(state,action)=>{
            console.log(action.payload);
            return action.payload
        }
    }
})

export const UserReducer = UserSlice.reducer;
export const UserAction = UserSlice.actions; 
export const UserSelector = (state)=>state.User;
