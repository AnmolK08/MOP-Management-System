import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";
import { userLogout } from "./authSlice";

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const addAmtInWallet = createAsyncThunk(
    "provider/addAmtInWallet",
    async({customerId, amount}, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post(`/payment/addAmount/${customerId}`, {amount}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add amount in wallet")
        }
    }
)

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

export const deleteUser = createAsyncThunk(
    "provider/deleteUser",
    async(userId, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.delete(`/provider/deleteUser/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete user")
        }
    }
)

export const announcementMsg = createAsyncThunk(
    "provider/announcementMsg",
    async(message, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post(`/provider/announceMsg`, {message}, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to send announcement")
        }
    }
)

const providerSlice = createSlice({
    name : "provider/users",
    initialState,
    reducers:{
        updateWallet : (state, action) =>{
            const {customerIds} = action.payload;
            for(let user of state.users){
                if(customerIds.includes(user.customer.id)){
                    if(user.customer.premium)
                    user.customer.wallet -= 54;
                    else user.customer.wallet -= 60;
                }
            }
        }
    },
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
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.loading = false;
            const deletedUser = action.payload;
            state.users = state.users.filter(user => user.id !== deletedUser.id);
        })

        // Reset state on logout
        .addCase(userLogout.fulfilled, () => initialState)

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
export const {updateWallet} = providerSlice.actions;