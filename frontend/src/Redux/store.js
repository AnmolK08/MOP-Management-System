import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import orderSlice from './Slices/orderSlice';
import menuSlice from './Slices/menuSlice';

const store = configureStore({
    reducer : {
        authSlice : authSlice,
        orderSlice : orderSlice,
        menu : menuSlice,
    }
})

export default store;