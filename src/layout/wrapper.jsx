import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
// internal
import BackToTopCom from "@/components/common/back-to-top";
import ProductModal from "@/components/common/product-modal";
import {
   load_cart_products,
} from "@/redux/features/cartSlice";
import useAuthCheck from "@/hooks/use-auth-check";
import Loader from "@/components/loader/loader";
import { useGetCartByUserQuery } from '@/redux/features/cartSlice';


const Wrapper = ({ children }) => {
   const { productItem } = useSelector((state) => state.productModal);
   const dispatch = useDispatch();
   const authChecked = useAuthCheck();
   const { data: cartData} = useGetCartByUserQuery();
   useEffect(() => {
      const cart_products = cartData?.data?.cart?.items || [];
      dispatch(load_cart_products(cart_products));
   }, [cartData, dispatch]);

   return !authChecked ? (
      <div
         className="d-flex align-items-center justify-content-center"
         style={{ height: "100vh" }}
      >
         <Loader spinner="fade" loading={!authChecked} />
      </div>
   ) : (
      <div id="wrapper">
         {children}
         <BackToTopCom />
         <ToastContainer />
         {/* product modal start */}
         {productItem && <ProductModal />}
         {/* product modal end */}
      </div>
   );
};

export default Wrapper;
