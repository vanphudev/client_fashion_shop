import {apiSlice} from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: () => `http://localhost:4040/api/v1/public/san_pham/getall`,
      }),
      getProductType: builder.query({
         query: ({query}) => `http://localhost:4040/api/v1/public/san_pham/tab?valueTab=${query}`,
         providesTags: ["ProductType"],
      }),
      getProduct: builder.query({
         query: (id) => `http://localhost:4040/api/v1/public/san_pham/getbyid/${id}`,
         providesTags: (result, error, arg) => [{type: "Product", id: arg}],
         invalidatesTags: (result, error, arg) => [{type: "RelatedProducts", id: arg}],
      }),
      getProductLQ: builder.query({
         query: (id) => `http://localhost:4040/api/v1/public/san_pham/lienquan?idLoai=${id}`,
      }),
      getSearchAll: builder.query({
         query: (search) => `http://localhost:4040/api/v1/public/san_pham/search?search=${search}`,
         providesTags: ["Products"],
      }),
   }),
});

export const {
   useGetAllProductsQuery,
   useGetProductTypeQuery,
   useGetOfferProductsQuery,
   useGetPopularProductByTypeQuery,
   useGetTopRatedProductsQuery,
   useGetProductQuery,
   useGetProductLQQuery,
   useGetRelatedProductsQuery,
   useGetSearchAllQuery,
} = productApi;
