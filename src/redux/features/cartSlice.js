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
         query: ({productId, quantity}) => ({
            url: "http://localhost:5555/api/v1/carts/additem",
            method: "POST",
            body: {productId, quantity},
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
            url: "http://localhost:5555/api/v1/carts/decreasequantity",
            method: "PUT",
            body: {productId},
         }),
      }),
      removeFromCart: builder.mutation({
         query: ({clientId, productId}) => ({
            url: "http://localhost:5555/api/v1/carts/removeitem",
            method: "DELETE",
            body: {productId},
         }),
      }),
      clearCart: builder.mutation({
         query: () => ({
            url: "http://localhost:5555/api/v1/carts/clear",
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
