import {apiSlice} from "../api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      addReview: builder.mutation({
         query: (data) => ({
            url: "http://localhost:4040/api/v1/private/review/addDanhGia",
            method: "POST",
            body: data,
         }),
      }),
   }),
});

export const {useAddReviewMutation} = reviewApi;
