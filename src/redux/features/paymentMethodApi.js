import { apiSlice } from "../api/apiSlice";

export const paymentMethodApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      paymentmethodGetactive: builder.query({
         query: () => `http://localhost:5555/api/v1/paymentmethod/getactive`
      }),
   }),
});

export const {
   usePaymentmethodGetactiveQuery
} = paymentMethodApi;
