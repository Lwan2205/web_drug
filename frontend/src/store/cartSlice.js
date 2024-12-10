import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], // Lưu trữ các sản phẩm trong giỏ hàng
    totalQuantity: 0, // Tổng số lượng sản phẩm trong giỏ hàng
    totalPrice: 0, // Tổng giá trị sản phẩm trong giỏ hàng
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.productId === action.payload.productId);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push(action.payload);
            }
            state.totalQuantity += action.payload.quantity;
            state.totalPrice += action.payload.price * action.payload.quantity;
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload);
            if (itemIndex !== -1) {
                const item = state.cartItems[itemIndex];
                state.totalQuantity -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.cartItems.splice(itemIndex, 1);
            }
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cartItems.find(item => item.productId === productId);
            if (item) {
                state.totalQuantity += quantity - item.quantity;
                state.totalPrice += (quantity - item.quantity) * item.price;
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
