import { apiSlice } from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      // get offer coupon
      getOfferCoupons: builder.query({
         query: () => `http://localhost:5555/api/v1/vouchers/active/getall`,
         providesTags: ['Coupon'],
         keepUnusedDataFor: 600,
      }),

      checkVoucher: builder.mutation({
         query: ({ voucherCode, totalPrice }) => ({
            url: "http://localhost:5555/api/v1/vouchers/check",
            method: "POST",
            body: { voucherCode, totalPrice },
         }),
      }),
   }),
});

export const { useGetOfferCouponsQuery, useCheckVoucherMutation } = authApi;
