import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./redux/features/authSlice";
import BrandReducer from "./redux/features/brandSlice";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    brand: BrandReducer,
  },
});
