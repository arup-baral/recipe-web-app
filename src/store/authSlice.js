import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setLogIn: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    setLogOut: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export default authSlice.reducer;

export const { setLogIn, setLogOut } = authSlice.actions;
