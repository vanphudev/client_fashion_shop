import {apiSlice} from "@/redux/api/apiSlice";
import {userLoggedIn} from "./authSlice";
import Cookies from "js-cookie";

export const authApi = apiSlice.injectEndpoints({
   overrideExisting: true,
   endpoints: (builder) => ({
      registerUser: builder.mutation({
         query: (data) => ({
            url: "http://localhost:4040/api/v1/public/auth/createAccount",
            method: "POST",
            body: data,
         }),
      }),      

      signUpProvider: builder.mutation({
         query: (token) => ({
            url: `https://shofy-backend.vercel.app/api/user/register/${token}`,
            method: "POST",
         }),
         async onQueryStarted(arg, {queryFulfilled, dispatch}) {
            try {
               const result = await queryFulfilled;
               // console.log("userInfo", result);
               Cookies.set(
                  "userInfo",
                  JSON.stringify({
                     refreshToken: result.data.data.token,
                     accessToken: result.data.data.token,
                     user: result.data.data.user,
                  }),
                  {expires: 0.5}
               );
               dispatch(
                  userLoggedIn({
                     accessToken: result.data.data.token,
                     user: result.data.data.user,
                  })
               );
            } catch (err) {
               // do nothing
            }
         },
      }),

      logoutUser: builder.mutation({
         query: () => ({
            url: "http://localhost:4040/api/v1/private/auth/logout",
            method: "POST",
         }),
      }),

      loginUser: builder.mutation({
         query: (data) => ({
            url: "http://localhost:4040/api/v1/public/auth/signin",
            method: "POST",
            body: data,
         }),
         async onQueryStarted(arg, {queryFulfilled, dispatch}) {
            try {
               const result = await queryFulfilled;
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
            } catch (err) {
               console.log("Đã có lỗi khi lưu token !" + result);
            }
         },
      }),

      getUser: builder.query({
         query: () => "http://localhost:4040/api/v1/private/auth/getAccId",
         async onQueryStarted(arg, {queryFulfilled, dispatch}) {
            try {
               const result = await queryFulfilled;
               dispatch(
                  userLoggedIn({
                     user: result.data?.metadata?.tokens?.khach_hang,
                  })
               );
            } catch (err) {
               console.log("Đã có lỗi khi lấy thông tin Users " + result);
            }
         },
      }),

      // confirmEmail
      confirmEmail: builder.query({
         query: (token) => `https://shofy-backend.vercel.app/api/user/confirmEmail/${token}`,
         async onQueryStarted(arg, {queryFulfilled, dispatch}) {
            try {
               const result = await queryFulfilled;
               Cookies.set(
                  "userInfo",
                  JSON.stringify({
                     accessToken: result.data.data.token,
                     user: result.data.data.user,
                  }),
                  {expires: 0.5}
               );
               dispatch(
                  userLoggedIn({
                     accessToken: result.data.data.token,
                     user: result.data.data.user,
                  })
               );
            } catch (err) {
               // do nothing
            }
         },
      }),

      // reset password
      resetPassword: builder.mutation({
         query: (data) => ({
            url: "https://shofy-backend.vercel.app/api/user/forget-password",
            method: "PATCH",
            body: data,
         }),
      }),

      // confirmForgotPassword
      confirmForgotPassword: builder.mutation({
         query: (data) => ({
            url: "https://shofy-backend.vercel.app/api/user/confirm-forget-password",
            method: "PATCH",
            body: data,
         }),
      }),

      // change password
      changePassword: builder.mutation({
         query: (data) => ({
            url: "http://localhost:5555/api/v1/user/change-password",
            method: "PATCH",
            body: data,
         }),
      }),

      // updateProfile password
      updateProfile: builder.mutation({
         query: ({id, ...data}) => ({
            url: `http://localhost:5555/api/v1/user/update`,
            method: "PUT",
            body: {id, ...data},
         }),

         async onQueryStarted(arg, {queryFulfilled, dispatch}) {
            try {
               const result = await queryFulfilled;
               Cookies.set(
                  "userInfo",
                  JSON.stringify({
                     refreshToken: result.data.data.data.tokens.refreshToken,
                     accessToken: result.data.data.data.tokens.accessToken,
                     user: result.data.data.data.user,
                  }),
                  {expires: 0.5}
               );
               dispatch(
                  userLoggedIn({
                     accessToken: result.data.data.data.tokens.accessToken,
                     user: result.data.data.data.user,
                  })
               );
            } catch (err) {
               // do nothing
            }
         },
      }),
   }),
});

export const {
   useLoginUserMutation,
   useLogoutUserMutation,
   useRegisterUserMutation,
   useConfirmEmailQuery,
   useResetPasswordMutation,
   useConfirmForgotPasswordMutation,
   useChangePasswordMutation,
   useUpdateProfileMutation,
   useSignUpProviderMutation,
} = authApi;
