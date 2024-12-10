import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice'; // Import cartReducer

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer, // Thêm reducer giỏ hàng
    },
});
