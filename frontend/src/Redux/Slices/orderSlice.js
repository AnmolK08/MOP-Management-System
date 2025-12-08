import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../libs/axios";
import { userLogout } from "./authSlice";

// --- State Structure ---
const initialState = {
  userOrders: [],
  providerOrders: [],
  billingUserOrders: [],
  allOrders : [],
  loading: false,
  error: null,
};

// --- Async Thunks (Simplified) ---

// 1. USER: Place order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post("/order/placeOrder", {
        items:orderData.items, 
        type:orderData.type
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);

// 2. USER: Fetch own orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/order/myOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user orders"
      );
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `/order/cancelOrder/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  }
);

// 4. PROVIDER: Fetch all orders
export const fetchProviderOrders = createAsyncThunk(
  "orders/fetchProviderOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const today = new Date().toISOString(); 
      const res = await axiosInstance.get("/order/ordersForToday", {
        params: { date: today },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch provider orders"
      );
    }
  }
);

export const fetchProviderAllOrders = createAsyncThunk(
  "orders/fetchProviderAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/order/getAllOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all provider orders"
      );
    }
  }
);

// 5. PROVIDER: Mark as Seen
export const markOrderAsSeen = createAsyncThunk(
  "orders/markAsSeen",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `/order/seenOrder/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order as seen"
      );
    }
  }
);

// 6. PROVIDER: Mark as Delivered
export const markOrderAsDelivered = createAsyncThunk(
  "orders/markAsDelivered",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
        `/order/orderDelivered/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order as delivered"
      );
    }
  }
);

// 7. PROVIDER: Delete order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/order/deleteOrder/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { orderId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({orderData, orderId}, {rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(`/order/updateOrder/${orderId}`, {
        items:orderData.items
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
)

export const markOrdersSeen = createAsyncThunk(
  "orders/ordersSeen",
  async ({orderIds},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const orders = await axiosInstance.put("/order/markOrdersSeen", {
        orderIds
      },{ headers: { Authorization: `Bearer ${token}` } }
    )
      return orders.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark orders as seen"
      );
    }
  }
)

export const markOrdersDelivered = createAsyncThunk(
  "orders/ordersDelivered",
  async ({orderIds},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const orders = await axiosInstance.put("/order/markOrdersDelivered", {
        orderIds
      },{ headers: { Authorization: `Bearer ${token}` } }
    )
      return orders.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark orders as delivered"
      );
    }
  }
)

export const fetchOrdersByUserId = createAsyncThunk(
  "orders/ordersByUserId",
  async ({userId},{rejectWithValue})=>{
    try {
      const token = localStorage.getItem("token")
      const orders = await axiosInstance.get(`/order/getOrderByUser/${userId}`,{ headers: { Authorization: `Bearer ${token}` } }
    )
      return orders.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders by user id"
      );
    }
  }
)

// --- The Slice Definition ---
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateProviderOrders : (state, action) => {
      const {Id} = action.payload;
      if(!Id) return;
      const providerIndex = state.providerOrders.findIndex(
        (o) => o.customerId === Id
      );
      if (providerIndex !== -1)
        state.providerOrders[providerIndex].customer.premium = !state.providerOrders[providerIndex].customer.premium;
    },
    deleteUserFromOrders : (state, action) => {
      const {Id} = action.payload;
      if(!Id) return;
      state.providerOrders = state.providerOrders.filter(
        (o) => o.id !== Id
      );
      state.userOrders = state.userOrders.filter(
        (o) => o.id !== Id
      );
    },
    addOrdersInProvider : (state, action) => {
      state.providerOrders.push(action.payload);
    },
    updateCancelStatus : (state, action) => {
      const {Id} = action.payload;
      if(!Id) return;
      const providerIndex = state.providerOrders.findIndex(
        (o) => o.id === Id
      );
      if (providerIndex !== -1)
        state.providerOrders[providerIndex].status = "CANCELLED";
    },
    updateOrdersInProvider : (state, action) => {
      const Id = action.payload.id;
      if(!Id) return;
      const providerIndex = state.providerOrders.findIndex(
        (o) => o.id === Id
      );
      if (providerIndex !== -1)
        state.providerOrders[providerIndex] = action.payload;
    },
    seenUserLatestOrder : (state)=>{
      if (state.userOrders.length > 0) {
        state.userOrders[state.userOrders.length - 1].status = "SEEN";
      }
    },
    deliveredUserLatestOrder : (state)=>{
      if (state.userOrders.length > 0) {
        state.userOrders[state.userOrders.length - 1].status = "DELIVERED";
      }
    }
  },
  extraReducers: (builder) => {
    const updateOrderInState = (state, updatedOrder) => {
      const userIndex = state.userOrders.findIndex(
        (o) => o.id === updatedOrder.id
      );
      if (userIndex !== -1) state.userOrders[userIndex] = updatedOrder;

      const providerIndex = state.providerOrders.findIndex(
        (o) => o.id === updatedOrder.id
      );
      if (providerIndex !== -1)
        state.providerOrders[providerIndex] = updatedOrder;
    };

    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User Orders
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })

      // Fetch Provider Orders
      .addCase(fetchProviderOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.providerOrders = action.payload;
      })

      // Fetch Billing/Selected User Orders
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.billingUserOrders = action.payload;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload);
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload);
      })

      // Mark Seen
      .addCase(markOrderAsSeen.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload);
      })

      // Mark Delivered
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        updateOrderInState(state, action.payload);
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = state.userOrders.filter(
          (o) => o.id !== action.payload.orderId
        );
        state.providerOrders = state.providerOrders.filter(
          (o) => o.id !== action.payload.orderId
        );
      })

      .addCase(markOrdersSeen.fulfilled, (state, action)=>{
        state.loading = false;
        
        state.providerOrders = state.providerOrders.map((order)=>{
          if(action.payload.orderIds.includes(order.id)){
            return {...order, status: "SEEN"}
          }
          return order
        }
        )
      })

      .addCase(markOrdersDelivered.fulfilled, (state, action)=>{
        state.loading = false;
        state.providerOrders = state.providerOrders.map((order)=>{
          if(action.payload.orderIds.includes(order.id)){
            return {...order, status: "DELIVERED"}
          }
          return order
        } 
      )
    })

      .addCase(fetchProviderAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })

      // Reset state on logout
      .addCase(userLogout.fulfilled, () => initialState)

      // Common Pending/Rejected
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
  },
});

export default ordersSlice.reducer;
export const { updateProviderOrders, deleteUserFromOrders, updateOrdersInProvider , addOrdersInProvider , updateCancelStatus , seenUserLatestOrder , deliveredUserLatestOrder} = ordersSlice.actions;
