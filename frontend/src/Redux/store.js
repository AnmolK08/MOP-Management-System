import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice'

const store = configureStore({
    reducer : {
        authSlice : authSlice,
    }
})

export default store;