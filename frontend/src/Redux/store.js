import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import orderSlice from './Slices/orderSlice';
import menuSlice from './Slices/menuSlice';
import providerSlice from './Slices/providerSlice';

const store = configureStore({
    reducer : {
        authSlice : authSlice,
        orderSlice : orderSlice,
        menuSlice : menuSlice,
        providerSlice : providerSlice,
    }
})

export default store;