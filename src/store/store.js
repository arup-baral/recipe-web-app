import categoryReducer from "./meal.categorySlice";
import authReducer from "./authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['auth'],
};

const baseReducer = combineReducers({
  mealCategory: categoryReducer,
  auth: authReducer,
  //TODO: more reducers would be added in future
});

const persistedReducer = persistReducer(persistConfig, baseReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistedStore = persistStore(store);

export { store, persistedStore };
