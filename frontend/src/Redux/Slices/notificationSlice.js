import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../libs/axios";

const initialState = {
    notifications : [],
    loading : false,
    error : null,
}

export const getAllNotifications = createAsyncThunk(
    'notifications/getAllNotifications',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get(`/notifications/`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const deleteNotification = createAsyncThunk(
    'notifications/deleteNotification',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.delete(`/notifications/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const clearAllNotifications = createAsyncThunk(
    'notifications/clearAllNotifications',
    async (id, {rejectWithValue}) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.delete(`/notifications/clearAll`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return response.data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)




const notificationSlice = createSlice({
    name : 'notifications',
    initialState,
    reducers : {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        }
    },
    extraReducers: (builder)=>{
            builder
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data;
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = state.notifications.filter(notification => notification.id !== action.meta.arg);
                state.error = null;
            })
            .addCase(clearAllNotifications.fulfilled, (state) => {
                state.loading = false;
                state.notifications = [];
                state.error = null;
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

export default notificationSlice.reducer;
export const { addNotification } = notificationSlice.actions;