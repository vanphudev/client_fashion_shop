import { apiSlice } from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      addReview: builder.mutation({
         query: (data) => ({
            url: "http://localhost:5555/api/v1/orders/rateproduct",
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const { useAddReviewMutation } = reviewApi;
