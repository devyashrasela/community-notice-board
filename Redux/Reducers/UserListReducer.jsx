// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     role: "User",
//     email: "alex.johnson@community.com",
//     totalPosts: 12,
//     totalParticipations: 8
//   },
//   {
//     id: 2,
//     name: "Sarah Chen",
//     role: "User",
//     email: "sarah.chen@community.com",
//     totalPosts: 7,
//     totalParticipations: 15
//   },
//   {
//     id: 3,
//     name: "Mike Rodriguez",
//     role: "User",
//     email: "mike.rodriguez@community.com",
//     totalPosts: 23,
//     totalParticipations: 6
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     role: "User",
//     email: "emily.davis@community.com",
//     totalPosts: 5,
//     totalParticipations: 12
//   },
//   {
//     id: 5,
//     name: "Admin Manager",
//     role: "Admin",
//     email: "admin@community.com",
//     totalPosts: 45,
//     totalParticipations: 3
//   }
// ];

// const UserListSlice = createSlice({
//     name:"UserList",
//     initialState,
//     reducers:{
//         set:(state,action)=>{
//             console.log(action.payload);
//             return action.payload
//         }
//     }
// })

// export const UserListReducer = UserListSlice.reducer;
// export const UserListAction = UserListSlice.actions; 
// export const UserListSelector = (state)=>state.UserList;
import { collection, onSnapshot } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../src/Services/firebase.config";

export const listenToUsers = createAsyncThunk(
  "userList/listen",
  async (_, { dispatch }) => {
    onSnapshot(collection(db, "users"), snap => {
      dispatch(userListSlice.actions.set(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
      ));
    });
  }
);

const userListSlice = createSlice({
  name: "UserList",
  initialState: [],
  reducers: { set: (_s, a) => a.payload }
});

export const UserListReducer  = userListSlice.reducer;
export const UserListSelector = (s) => s.UserList;
