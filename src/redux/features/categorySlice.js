import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";
import { axiosPublic } from "../axiosPublic";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  // formData is an object that contains data to be sent to the server
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.post(`/categories`, jsonData);
      toast.success("Successfully add new brand.");
      console.log(data.brand);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/categories`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete brands

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/categories/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// brand details
export const categoryDetails = createAsyncThunk(
  "category/categoryDetails",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/categories/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/categories/${id}`, jsonData);
      toast.success("Category updated.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Đây là đoạn code sử dụng thư viện Redux Toolkit để tạo một "slice" của Redux store để quản lý trạng thái liên quan đến việc xác thực (authentication).
const categorySlice = createSlice({
  name: "category",
  initialState: {
    mutationResult: { success: false },
    categorylist: {},
    categoryDetails: {},
  },

  reducers: {
    resetMutationResult: (state, action) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new brand
    [addCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all brand list
    [getCategories.pending]: (state, action) => {
      state.categorylist.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categorylist.loading = false;
      state.categorylist.categories = action.payload.categories;
    },
    [getCategories.rejected]: (state, action) => {
      state.categorylist.loading = false;
      state.categorylist.error = action.payload;
    },
    //delete a brand
    [deleteCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    //get brand details
    [categoryDetails.pending]: (state, action) => {
      state.categoryDetails.loading = true;
    },
    [categoryDetails.fulfilled]: (state, action) => {
      state.categoryDetails.loading = false;
      state.categoryDetails.category = action.payload.category;
    },
    [categoryDetails.rejected]: (state, action) => {
      state.categoryDetails.loading = false;
      state.categoryDetails.error = action.payload;
    },
    //update brand
    [updateCategory.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [updateCategory.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectCategoryMutationResult = (state) =>
  state.category.mutationResult;
export const selectAllCategories = (state) => state.category.categorylist;
export const selectCategoryDetails = (state) => state.category.categoryDetails;
export const { resetMutationResult } = categorySlice.actions;

export default categorySlice.reducer;
