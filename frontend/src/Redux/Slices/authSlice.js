import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";

export const userSignup = createAsyncThunk(
    "auth/signup",
    async({name , email , password} , { rejectWithValue})=>{
        try {
            const res = await axiosInstance.post("auth/signup" , {name , email , password});
            localStorage.setItem("token" , res.data.token);

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Signup Failed");
        }
    }
)

export const userLogin = createAsyncThunk(
    "auth/login",
    async({email , password} , { rejectWithValue }) => {
       try {
            const res = await axiosInstance.post("/auth/login" , { email , password });
            localStorage.setItem("token" , res.data.token);
            return res.data;
       } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
       }
    }
)

export const userLogout = createAsyncThunk(
    "auth/logout",
    async(_,{ rejectWithValue }) =>{
        try {
            const token = localStorage.getItem("token");
            const res = await axiosInstance.post("/auth/logout" , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        } 
    }
)

const initialState = {
    user : null,
    token : localStorage.getItem("token") || null,
    loading : false,
    error : null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        authRefresh : ()=>initialState
    },
    extraReducers : (builder) => {
        builder
            .addCase(userSignup.pending , (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userSignup.fulfilled , (state , action)=>{
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(userSignup.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userLogin.pending , (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled , (state , action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(userLogin.rejected , (state , action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userLogout.pending , (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogout.fulfilled , (state)=>{
                state.user = null;
                state.token = null;
            })
            .addCase(userLogout.pending , (state ,action)=>{
                state.error=action.payload;
                state.loading=false;
            })
    }

});

export const {authRefresh} = authSlice.actions;
export default authSlice.reducer;