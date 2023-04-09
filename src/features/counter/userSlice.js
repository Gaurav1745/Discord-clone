import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },

    logout: (state, action) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
