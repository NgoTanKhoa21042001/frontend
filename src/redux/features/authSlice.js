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

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`users`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete user

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  // formData is an object that contains data to be sent to the server
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.delete(`users/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// user details
export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`users/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// update role user
export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`users/${id}`, jsonData);
      toast.success("User updated.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// - Hàm createSlice được sử dụng để tạo ra một slice, với tên là "auth" và trạng thái ban đầu là một object có hai thuộc tính: mutationResult và credentials.
//- mutationResult là một object chứa thông tin về kết quả của mutation (một thao tác thay đổi trạng thái) liên quan đến xác thực, với giá trị ban đầu là success: false.
//- credentials là một object chứa thông tin về thông tin xác thực, chưa có giá trị ban đầu.
const authSlice = createSlice({
  name: "auth",
  initialState: {
    mutationResult: { success: false },
    credentials: {},
    userlist: { users: [] },
    userDetails: { user: [] },
    persist: JSON.parse(localStorage.getItem("persist")) || false,
  },
  //  reducers là một object chứa các hàm reducer để thay đổi trạng thái của slice. Trong trường hợp này, chỉ có một hàm resetMutationResult, có tác dụng đặt lại giá trị success của mutationResult về false.
  // Reducer là một hàm được sử dụng để xử lý các hành động (actions) và cập nhật state của ứng dụng
  reducers: {
    persistLogin: (state, action) => {
      state.persist = action.payload;
      localStorage.setItem("persist", action.payload);
    },
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
    refreshUserDetails: (state, action) => {
      state.credentials.accessToken = action.payload.accessToken;
      state.credentials.user = action.payload.user;
    },
  },
  extraReducers: {
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
    // user list
    [getAllUsers.pending]: (state, action) => {
      state.userlist.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userlist.loading = false;
      state.userlist.users = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.userlist.loading = false;
      state.userlist.error = action.payload;
    },
    // delete user
    [deleteUser.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteUser.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.credentials.error = action.payload;
    },

    // user details
    [getUserDetails.pending]: (state, action) => {
      state.userDetails.loading = true;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userDetails.loading = false;
      state.userDetails.user = action.payload.user;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.userDetails.loading = false;
      state.userDetails.error = action.payload;
    },
    // update role
    [updateUserRole.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateUserRole.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [updateUserRole.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.credentials.error = action.payload;
    },
  },
});
// - Dòng đầu tiên, selectMutationResult, là một selector function, nhận vào một tham số state, và trả về giá trị state.auth.mutationResult. Selector function là các hàm cho phép lấy ra những giá trị cụ thể mà bạn cần từ state trong Redux.
export const selectMutationResult = (state) => state.auth.mutationResult;
export const selectLoggedInUser = (state) => state.auth.credentials;
export const selectUserList = (state) => state.auth.userlist;
export const selectUserDetails = (state) => state.auth.userDetails;

export const selectPersist = (state) => state.auth;

export const { resetMutationResult, refreshUserDetails, persistLogin } =
  authSlice.actions;
export default authSlice.reducer;

// Selector là một hàm được sử dụng để truy xuất dữ liệu từ store của ứng dụng. Trong đoạn mã này, selector được định nghĩa là một hàm có tên là selectLoggedInUser, nhận vào một đối tượng state là tham số và trả về thuộc tính credentials của state.auth. Điều này có nghĩa là khi được gọi, selector này sẽ trả về thông tin về người dùng đã đăng nhập được lưu trữ trong thuộc tính credentials của state.auth. Selector này có thể được sử dụng trong các thành phần của ứng dụng để truy xuất thông tin người dùng đã đăng nhập một cách dễ dàng và linh hoạt.
