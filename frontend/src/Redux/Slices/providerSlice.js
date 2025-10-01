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

const providerSlice = createSlice({
    name : "provider/users",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.
        addCase(getAllUsers.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).
        addCase(getAllUsers.fulfilled, (state, action)=>{
            state.loading = false;
            state.users = action.payload;
        }).
        addCase(getAllUsers.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default providerSlice.reducer;