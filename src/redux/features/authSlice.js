import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";
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

// change password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  // formData is an object that contains data to be sent to the server
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.put(`/password/update`, jsonData);
      toast.success("Successfully changed.");
      console.log(data.user);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  // formData is an object that contains data to be sent to the server
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.put(`/me/update`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("Successfully updated.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Đây là đoạn code sử dụng thư viện Redux Toolkit để tạo một "slice" của Redux store để quản lý trạng thái liên quan đến việc xác thực (authentication).
const authSlice = createSlice({
  name: "auth",
  initialState: { mutationResult: { success: false }, credentials: {} },
  //  reducers là một object chứa các hàm reducer để thay đổi trạng thái của slice. Trong trường hợp này, chỉ có một hàm resetMutationResult, có tác dụng đặt lại giá trị success của mutationResult về false.
  reducers: {
    resetMutationResult: (state, action) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    // register
    // sẽ trải qua 3 giai đoạn
    // lúc này đang chờ phản hồi
    [registration.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [registration.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [registration.rejected]: (state, action) => {
      state.mutationResult.loading = false;
    },
    // LOGIN
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
    // LOGOUT
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
    // change password
    [changePassword.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [changePassword.rejected]: (state, action) => {
      state.mutationResult.loading = false;
    },
    //update profile
    [updateProfile.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
      state.credentials.user = action.payload.user;
    },
    [updateProfile.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.credentials.error = action.payload;
    },
  },
});
// - Dòng đầu tiên, selectMutationResult, là một selector function, nhận vào một tham số state, và trả về giá trị state.auth.mutationResult. Selector function là các hàm cho phép lấy ra những giá trị cụ thể mà bạn cần từ state trong Redux.
export const selectMutationResult = (state) => state.auth.mutationResult;
export const selectLoggedInUser = (state) => state.auth.credentials;
export const { resetMutationResult } = authSlice.actions;
export default authSlice.reducer;
