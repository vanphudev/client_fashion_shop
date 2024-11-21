import {apiSlice} from "../api/apiSlice";

export const brandApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getActiveBrands: builder.query({
         query: () => `http://localhost:4040/api/v1/public/thuong_hieu/getall`,
      }),
   }),
});

export const {useGetActiveBrandsQuery} = brandApi;
