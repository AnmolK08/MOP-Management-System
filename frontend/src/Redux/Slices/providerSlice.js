import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const getAllUsers = createAsyncThunk(
    "provider/users",
    async(_, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get("/provider/getAllUsers", {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users")
        }
    }
)

export const togglePremiumStatus = createAsyncThunk(
    "provider/togglePremium",
    async(customerId, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.patch(`/provider/togglePremium/${customerId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to toggle premium status")
        }
    }
)

const providerSlice = createSlice({
    name : "provider/users",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(togglePremiumStatus.fulfilled, (state, action)=>{
            state.loading = false;
            const updatedUser = action.payload;
            state.users = state.users.map(user => user.customer.id === updatedUser.id ? {...user, customer: updatedUser} : user);
        })
        .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    }
})

export default providerSlice.reducer;