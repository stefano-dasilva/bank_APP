import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user_ID: "",
};

const authSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    setUserID: (state, action) => {
      state.user_ID = action.payload;
    },
    clearUserID: (state, action) => {
      state.user_ID = "";
    },
  },
});

export const { setAuthenticated,setUserID,clearUserID } = authSlice.actions;
export default authSlice.reducer;
