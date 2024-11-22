import Cookies from "js-cookie";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const NEXT_PUBLIC_API_BASE_URL = "http://localhost:4040/api/v1";

const refreshAccessToken = async () => {
   const userInfo = Cookies.get("userInfo");
   if (userInfo) {
      const user = JSON.parse(userInfo);
      const refreshToken = user?.refreshToken;
      const tai_khoan_id = user?.khach_hang?.tai_khoan_id;
      if (!refreshToken || !tai_khoan_id) {
         return null;
      }
   }
   try {
      const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/private/auth/refresh`, {
         method: "POST",
         body: JSON.stringify({refreshToken: refreshToken, tai_khoan_id}),
      });
      try {
         const result = await response.json();
         Cookies.set(
            "userInfo",
            JSON.stringify({
               refreshToken: result.data?.metadata?.tokens?.refreshToken,
               accessToken: result.data?.metadata?.tokens?.accessToken,
               user: result.data?.metadata?.khach_hang,
            }),
            {expires: 0.5}
         );
         dispatch(
            userLoggedIn({
               accessToken: result.data?.metadata?.tokens?.accessToken,
               user: result.data?.metadata?.khach_hang,
            })
         );
         return result.data?.metadata;
      } catch (err) {
         // do nothing
      }
   } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
   }
};

const customBaseQuery = fetchBaseQuery({
   baseUrl: NEXT_PUBLIC_API_BASE_URL,
   prepareHeaders: async (headers) => {
      try {
         const userInfo = Cookies.get("userInfo");
         if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user?.accessToken) {
               headers.set("authorization", `${user.accessToken}`);
               headers.set("client_id", `${user.user?.tai_khoan_id}`);
            }
         }
      } catch (error) {
         console.error("Error parsing user info:", error);
      }
      return headers;
   },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await customBaseQuery(args, api, extraOptions);
   if (result.error && result.error.status === 419) {
      console.log("Token expired, attempting to refresh...");
      const newTokens = await refreshAccessToken();
      if (newTokens) {
         const userInfo = Cookies.get("userInfo");
         if (userInfo) {
            const user = JSON.parse(userInfo);
            const updatedHeaders = {
               ...args.headers,
               authorization: `${newTokens.accessToken}`,
               client_id: `${user?.khach_hang?.tai_khoan_id}`,
            };
            result = await customBaseQuery({...args, headers: updatedHeaders}, api, extraOptions);
         }
      } else {
         // Nếu refresh token thất bại
         console.error("Refresh token failed. Redirecting to login...");
         Cookies.remove("userInfo"); // Xóa thông tin người dùng
         api.dispatch(logoutUser()); // Dispatch hành động logout (nếu dùng Redux)
         // Redirect đến trang login (nếu dùng React Router)
         window.location.href = "/login"; // Hoặc navigate("/login") nếu dùng hook
      }
   }
   return result;
};

export const apiSlice = createApi({
   reducerPath: "api",
   baseQuery: baseQueryWithReauth,
   tagTypes: [
      "Products",
      "Coupon",
      "Product",
      "RelatedProducts",
      "UserOrder",
      "UserOrders",
      "ProductType",
      "OfferProducts",
      "PopularProducts",
      "TopRatedProducts",
   ],
   endpoints: (builder) => ({}),
});
