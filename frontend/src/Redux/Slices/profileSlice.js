import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";

const initialState ={
    profileDetails : null,
    loading : false,
    error : null,
}

export const getProfileDetails = createAsyncThunk(
    "profile/getDetails",
    async(_, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.get("/fetch/fetchUser", {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch profile details")
        }
    }
)

export const updateProfile = createAsyncThunk(
    "profile/updateDetails",
    async({oldPass ,newPass , confPass}, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/profile/editPass", {oldPass , newPass , confPass }, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile details")
        }   
    }
)

const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder
        .addCase(getProfileDetails.pending, (state)=>{
            state.loading = true;   
            state.error = null;
        })
        .addCase(getProfileDetails.fulfilled, (state, action)=>{
            state.loading = false;
            state.profileDetails = action.payload;
        })
        .addCase(getProfileDetails.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateProfile.pending, (state)=>{
            state.loading = true;   
            state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state)=>{
            state.loading = false;
        })
        .addCase(updateProfile.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
}) 

export default profileSlice.reducer;