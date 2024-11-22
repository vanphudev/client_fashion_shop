import {apiSlice} from "@/redux/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      // get offer coupon
      getOfferCoupons: builder.query({
         query: () => `http://localhost:4040/api/v1/public/khuyen_mai/getall`,
      }),

      checkVoucher: builder.mutation({
         query: ({code, tong_tien}) => ({
            url: "http://localhost:4040/api/v1/public/khuyen_mai/checkvarKM",
            method: "POST",
            body: {code, tong_tien},
         }),
      }),
   }),
});

export const {useGetOfferCouponsQuery, useCheckVoucherMutation} = authApi;
