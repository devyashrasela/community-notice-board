import { configureStore } from "@reduxjs/toolkit";
import { PostsReducer } from "./Reducers/PostsReducer";
import { UserReducer } from "./Reducers/UserRedicer";
import { UserListReducer } from "./Reducers/UserListReducer";

const store = configureStore({
    reducer:{
        Posts:PostsReducer,
        User:UserReducer,
        UserList:UserListReducer
    }
});

export default store;