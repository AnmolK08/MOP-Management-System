import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";
import { userLogout } from "./authSlice";

export const fetchMenu = createAsyncThunk(
  "provider/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/fetch/fetchMenu", {
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
  async (menuData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/provider/menuUpload",{ type: menuData.type , options: menuData.options , special: menuData.special }
        ,{
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
  async ({ menuId, ...updateData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(`/provider/updateMenu/${menuId}`,
        { 
          type: updateData.type,
          options: updateData.options,
          special: updateData.special,
        },
        {
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
  async (menuId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.delete(`/provider/deleteMenu/${menuId}`, {
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
  reducers: {
    updateMenuState: (state, action) => {
      state.menu = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.menu = null;
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload.data?.[0] || null;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === "No Menu Uploaded yet.") {
          state.menu = null;
          state.error = null;
        } else {
          state.error = action.payload;
        }
      })
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.menu = action.payload.data;
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
        state.menu = action.payload.data;
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
      })

      // Reset state on logout
      .addCase(userLogout.fulfilled, () => initialState);
  },
});

export default menuSlice.reducer;
export const { updateMenuState } = menuSlice.actions;
