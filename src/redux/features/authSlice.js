import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../axiosPublic";

export const registration = createAsyncThunk(
  "auth/registration",
  // formData is an object that contains data to be sent to the server
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPublic.post(`/register`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("Successfully registered.");
      console.log(data.user);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// login

export const login = createAsyncThunk(
  "auth/login",
  // formData is an object that contains data to be sent to the server
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPublic.post(`/login`, jsonData);
      toast.success("Successfully login.");
      console.log(data.user);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// logout
export const logout = createAsyncThunk(
  "auth/logout",
  // formData is an object that contains data to be sent to the server
  async ({ toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPublic.post(`/logout`);
      toast.success("Successfully logout.");
      console.log(data.user);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { result: { success: false }, credentials: {} },
  reducers: {},
  extraReducers: {
    // register
    // sẽ trải qua 3 giai đoạn
    // lúc này đang chờ phản hồi
    [registration.pending]: (state, action) => {
      state.result.loading = true;
    },
    // phản hồi thành công
    [registration.fulfilled]: (state, action) => {
      state.result.loading = false;
      state.result.loading = action.payload.success;
    },
    // phản hồi thất bại

    [registration.rejected]: (state, action) => {
      state.result.loading = false;
    },
    // login
    [login.pending]: (state, action) => {
      state.credentials.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.accessToken = action.payload.accessToken;
      state.credentials.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.error = action.payload;
    },
    // logout
    [logout.pending]: (state, action) => {
      state.credentials.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.credentials = {};
    },
    [logout.rejected]: (state, action) => {
      state.credentials.loading = false;
      state.credentials.error = action.payload;
    },
  },
});

export const selectLoggedInUser = (state) => state.auth.credentials;

export default authSlice.reducer;
