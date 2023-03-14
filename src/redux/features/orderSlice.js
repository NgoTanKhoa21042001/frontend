import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ order, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post("/orders", order);
      toast.success("Payment successfully completed.");
      return data.success;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    mutationResult: { success: false },
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //create order
    [createOrder.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload;
    },
    [createOrder.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectOrderMutationResult = (state) => state.order.mutationResult;
export const { resetMutationResult } = orderSlice.actions;
export default orderSlice.reducer;

// Hàm createOrder là một action async, sử dụng createAsyncThunk để tạo ra một action creator chứa logic xử lý khi gọi API tạo đơn hàng. Tham số đầu tiên là tên của action, tham số thứ hai là một hàm async nhận vào đối tượng order và toast
