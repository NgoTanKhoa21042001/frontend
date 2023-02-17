import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./redux/features/authSlice";
export default configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
