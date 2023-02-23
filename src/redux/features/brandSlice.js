import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";
import { axiosPublic } from "../axiosPublic";

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  // formData is an object that contains data to be sent to the server
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.post(`/brands`, jsonData);
      toast.success("Successfully add new brand.");
      console.log(data.brand);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getBrands = createAsyncThunk(
  "brand/getBrands",
  // formData is an object that contains data to be sent to the server
  async ({ toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPublic.get(`/brands`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// delete brands

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  // formData is an object that contains data to be sent to the server
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      // the axiosPublic library is used to make a POST request to a URL /register with formData as the payload
      //  If the request is successful, the data property of the response is extracted using destructuring assignment,
      const { data } = await axiosPrivate.delete(`/brands/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
// Đây là đoạn code sử dụng thư viện Redux Toolkit để tạo một "slice" của Redux store để quản lý trạng thái liên quan đến việc xác thực (authentication).
const brandSlice = createSlice({
  name: "brand",
  initialState: {
    mutationResult: { success: false },
    brandlist: {},
    brandDetails: {},
  },

  reducers: {
    resetMutationResult: (state, action) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new brand
    [addBrand.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addBrand.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all brand list
    [getBrands.pending]: (state, action) => {
      state.brandlist.loading = true;
    },
    [getBrands.fulfilled]: (state, action) => {
      state.brandlist.loading = false;
      state.brandlist.brands = action.payload.brands;
    },
    [getBrands.rejected]: (state, action) => {
      state.brandlist.loading = false;
      state.brandlist.error = action.payload;
    },
    //delete a brand
    [deleteBrand.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteBrand.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectBrandMutationResult = (state) => state.brand.mutationResult;
export const selectAllBrands = (state) => state.brand.brandlist;
export const selectBrandDetails = (state) => state.brand.brandDetails;
export const { resetMutationResult } = brandSlice.actions;
export default brandSlice.reducer;
