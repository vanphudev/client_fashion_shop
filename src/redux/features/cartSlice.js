import {createSlice} from "@reduxjs/toolkit";
import {notifyError} from "@/utils/toast";
import {apiSlice} from "../api/apiSlice";

const initialState = {
   cart_products: [],
   orderQuantity: 1,
   cartMiniOpen: false,
};

export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      remove_cart_products: (state) => {
         state.cart_products = [];
      },
      get_cart_products: (state, {payload}) => {
         state.cart_products = payload;
      },
      load_cart_products: (state, {payload}) => {
         state.cart_products = payload;
      },
      openCartMini: (state) => {
         state.cartMiniOpen = true;
      },
      closeCartMini: (state) => {
         state.cartMiniOpen = false;
      },
      initialOrderQuantity: (state, {payload}) => {
         state.orderQuantity = 1;
      },
   },
});

export const {
   closeCartMini,
   openCartMini,
   load_cart_products,
   get_cart_products,
   initialOrderQuantity,
   remove_cart_products,
} = cartSlice.actions;

// Exporting reducer
export default cartSlice.reducer;

export const cartApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getCartByUser: builder.query({
         query: () => ({
            url: "http://localhost:4040/api/v1/private/cart/getCartById",
            method: "GET",
         }),
      }),
      addToCart: builder.mutation({
         query: ({so_luong, ma_thuoc_tinh, is_Decrease}) => ({
            url: "http://localhost:4040/api/v1/private/cart/addProductToCart",
            method: "POST",
            body: {so_luong, ma_thuoc_tinh, is_Decrease},
         }),
      }),
      increaseProductQuantity: builder.mutation({
         query: ({productId}) => ({
            url: "http://localhost:5555/api/v1/carts/increaseQuantity",
            method: "PUT",
            body: {productId},
         }),
      }),
      decreaseProductQuantity: builder.mutation({
         query: ({productId}) => ({
            url: "http://localhost:4040/api/v1/private/cart/addProductToCart",
            method: "POST",
            body: {so_luong, ma_thuoc_tinh, is_Decrease},
         }),
      }),
      removeFromCart: builder.mutation({
         query: ({ ma_thuoc_tinh}) => ({
            url: "http://localhost:4040/api/v1/private/cart/deleteProductFromCart",
            method: "DELETE",
            body: {ma_thuoc_tinh},
         }),
      }),
      clearCart: builder.mutation({
         query: () => ({
            url: "http://localhost:4040/api/v1/private/cart/deleteCart",
            method: "DELETE",
         }),
      }),
   }),
});

export const {
   useGetCartByUserQuery,
   useAddToCartMutation,
   useIncreaseProductQuantityMutation,
   useDecreaseProductQuantityMutation,
   useRemoveFromCartMutation,
   useClearCartMutation,
} = cartApi;

export const cartReducer = cartApi.reducer;
