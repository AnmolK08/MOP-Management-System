import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";

export const fetchMenu = createAsyncThunk(
  "provider/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/provider/fetchMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch the menu"
      );
    }
  }
);

export const createMenu = createAsyncThunk(
  "provider/createMenu",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/provider/uploadMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create the menu"
      );
    }
  }
);

export const updateMenu = createAsyncThunk(
  "provider/updateMenu",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/provider/updateMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update the menu"
      );
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "provider/deleteMenu",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/provider/deleteMenu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete the menu"
      );
    }
  }
);

const initialState = {
  menu: null,
  loading: false,
  error: false,
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.menu = null;
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload.menu;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = action.payload.menu;
        state.loading = false;
        state.error = null;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.menu = action.payload.menu;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.menu = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
