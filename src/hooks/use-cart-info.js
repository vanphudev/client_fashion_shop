import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCartInfo = () => {
   const [quantity, setQuantity] = useState(0);
   const [total, setTotal] = useState(0);
   const { cart_products } = useSelector((state) => state.cart);

   useEffect(() => {
      const cart = cart_products.reduce((cartTotal, cartItem) => {
         const { so_luong, thuoc_tinh_san_pham } = cartItem;
         const itemTotal = thuoc_tinh_san_pham?.gia_ban * so_luong;
         cartTotal.total += itemTotal
         cartTotal.quantity += quantity
         return cartTotal;
      }, {
         total: 0,
         quantity: 0,
      })
      setQuantity(cart.quantity);
      setTotal(cart.total);
   }, [cart_products])
   return {
      quantity,
      total,
      setTotal,
   }
}

export default useCartInfo;