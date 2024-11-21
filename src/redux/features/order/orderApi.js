import { apiSlice } from "../../api/apiSlice";
import { set_client_secret } from "./orderSlice";

export const authApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      // saveOrder
      saveOrder: builder.mutation({
         query: (data) => ({
            url: "http://localhost:5555/api/v1/orders/create",
            method: "POST",
            body: data,
         }),
         async onQueryStarted(arg, { queryFulfilled, dispatch }) {
            try {
               const result = await queryFulfilled;
               if (result) {
                  localStorage.removeItem("couponInfo");
                  localStorage.removeItem("cart_products");
                  localStorage.removeItem("shipping_info");
               }
            } catch (err) {

            }
         },
      }),

      // getUserOrders
      getUserOrders: builder.query({
         query: () => `https://shofy-backend.vercel.app/api/user-order`,
         providesTags: ["UserOrders"],
         keepUnusedDataFor: 600,
      }),

      // getUserOrders
      getUserOrderById: builder.query({
         query: (id) => `http://localhost:5555/api/v1/orders/getbyid?id=${id}`,
      }),

      // Call api tỉnh thành
      getApiProvince: builder.query({
         query: () => ` https://vapi.vnappmob.com/api/province/`,
      }),

      // Call api Quận huyện
      getApiDistrict: builder.query({
         query: (id) => `https://vapi.vnappmob.com/api/province/district/${id}`,
      }),


      getApiWard: builder.query({
         query: (id) => ` https://vapi.vnappmob.com/api/province/ward/${id}`,
      }),

      checkProductBought: builder.mutation({
         query: (data) => ({
            url: "http://localhost:5555/api/v1/orders/checkproduct",
            method: "POST",
            body: data,
         }),
      }),

   }),
});

export const { useCreatePaymentIntentMutation, useSaveOrderMutation, useGetUserOrderByIdQuery, useGetUserOrdersQuery, useGetApiProvinceQuery, useGetApiDistrictQuery, useGetApiWardQuery, useCheckProductBoughtMutation } =
   authApi;
