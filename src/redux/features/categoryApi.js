import {apiSlice} from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getShowCategory: builder.query({
         query: () => `http://localhost:4040/api/v1/public/nhom_loai/getall`,
      }),
      getProductTypeCategory: builder.query({
         query: () => `http://localhost:4040/api/v1/public/nhom_loai/getall`,
      }),
   }),
});

export const {useAddCategoryMutation, useGetProductTypeCategoryQuery, useGetShowCategoryQuery} = categoryApi;
