// Redux/Reducers/PostsReducer.js
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../src/Services/firebase.config";

// Listen to posts collection
export const listenToPosts = createAsyncThunk(
  "posts/listen",
  async (_, { dispatch }) => {
    onSnapshot(collection(db, "posts"), snap => {
      const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      // Sort by date (newest first)
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      dispatch(postsSlice.actions.set(posts));
    });
  }
);

// Add new post to Firestore
export const addPost = createAsyncThunk(
  "posts/add",
  async (postData) => {
    await addDoc(collection(db, "posts"), postData);
  }
);

// Delete post from Firestore
export const deletePost = createAsyncThunk(
  "posts/delete",
  async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  }
);

const postsSlice = createSlice({
  name: "Posts",
  initialState: [],
  reducers: {
    set: (state, action) => {
      // Sort posts by date (newest first) when setting state
      return action.payload.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    add: (state, action) => {
      // Add new post to the beginning of the array
      return [action.payload, ...state];
    },
    delete: (state, action) => {
      return state.filter(post => post.id !== action.payload);
    }
  }
});

export const PostsReducer = postsSlice.reducer;
export const PostsActions = postsSlice.actions;
export const PostsSelector = (state) => state.Posts;
