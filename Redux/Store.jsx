import { configureStore } from "@reduxjs/toolkit";
import { PostsReducer } from "./Reducers/PostsReducer";

const store = configureStore({
    reducer:{
        Posts:PostsReducer,
    }
});

export default store;