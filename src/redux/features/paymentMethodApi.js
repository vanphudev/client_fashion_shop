import {apiSlice} from "../api/apiSlice";

export const paymentMethodApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      paymentmethodGetactive: builder.query({
         query: () => `http://localhost:4040/api/v1/public/phuong_thuc_thanh_toan/getall`,
      }),
   }),
});

export const {usePaymentmethodGetactiveQuery} = paymentMethodApi;
