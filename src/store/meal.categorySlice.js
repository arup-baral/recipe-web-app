import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  category: "",
  mealId: 0,
};

const categorySlice = createSlice({
  name: "mealCategory",
  initialState: initialState,
  reducers: {
    setQueryMeal: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMealId: (state, action) => {
      state.mealId = action.payload;
    },
  },
});

export default categorySlice.reducer;

export const { setQueryMeal, setCategory, setMealId } = categorySlice.actions;
