import {apiSlice} from "../../api/apiSlice";
import {set_client_secret} from "./orderSlice";

export const authApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      saveOrder: builder.mutation({
         query: (data) => ({
            url: "http://localhost:4040/api/v1/private/order/order",
            method: "POST",
            body: data,
         }),
      }),

      // getUserOrders
      getUserOrders: builder.query({
         query: () => `https://shofy-backend.vercel.app/api/user-order`,
         providesTags: ["UserOrders"],
         keepUnusedDataFor: 600,
      }),

      // getUserOrders
      getUserOrderById: builder.query({
         query: (id) => `http://localhost:4040/api/v1/public/hoa_don/getOrders/${id}`,
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
            url: "http://localhost:4040/api/v1/private/review/checkBuyProduct",
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const {
   useCreatePaymentIntentMutation,
   useSaveOrderMutation,
   useGetUserOrderByIdQuery,
   useGetUserOrdersQuery,
   useGetApiProvinceQuery,
   useGetApiDistrictQuery,
   useGetApiWardQuery,
   useCheckProductBoughtMutation,
} = authApi;
