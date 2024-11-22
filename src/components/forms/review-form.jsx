import React, {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import {useSelector} from "react-redux";
import {Rating} from "react-simple-star-rating";
import * as Yup from "yup";
import {useRouter} from "next/router";
import ErrorMsg02 from "../common/error-msg02";
import {useAddReviewMutation} from "@/redux/features/reviewApi";
import {notifyError, notifySuccess} from "@/utils/toast";
import {useCheckProductBoughtMutation} from "@/redux/features/order/orderApi";

// schema
const schema = Yup.object().shape({
   comment: Yup.string().required().label("Comment"),
});

const ReviewForm = ({product_id, handleRenderCompnent}) => {
   const {user} = useSelector((state) => state.auth);
   const [rating, setRating] = useState(5);
   const [checkProductBought, {}] = useCheckProductBoughtMutation();
   const [addReview, {}] = useAddReviewMutation();
   const router = useRouter();
   const handleRating = (rate) => {
      setRating(rate);
   };

   const {
      register,
      handleSubmit,
      formState: {errors},
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data) => {
      const isAuthenticate = Cookies.get("userInfo");
      if (!isAuthenticate) {
         router.push("/login");
         notifyError("Bạn chưa đăng nhập !");
         return;
      }

      try {
         const result = await checkProductBought({ma_san_pham: product_id, tai_khoan_id: user?.tai_khoan_id});
         if (result?.error && result?.error?.data?.message) {
            notifyError("Bạn không được phép đánh giá sản phẩm chưa Order ! " + result?.error?.data?.message);
            return;
         }
         const reviewResult = await addReview({
            ma_san_pham: product_id,
            so_sao: rating,
            noi_dung: data.comment,
         });
         if (reviewResult?.error) {
            notifyError(reviewResult?.error?.data?.message);
         } else if (reviewResult?.data?.metadata?.danh_gia_san_pham) {
            notifySuccess(`Đánh giá sản phẩm có ID: ${reviewResult?.data?.metadata?.danh_gia_san_pham?.ma_san_pham} thành công !`);
            handleRenderCompnent();
         }
      } catch (error) {
         console.log("Đã có lỗi khi đánh giá sản phẩm !", error);
      } finally {
         reset();
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='tp-product-details-review-form-rating d-flex align-items-center gap-2 '>
            <h5 className='m-0'>Số sao: </h5>
            <div className='tp-product-details-review-form-rating-icon d-flex align-items-center'>
               <Rating onClick={handleRating} allowFraction size={25} initialValue={rating} fractions={2} />
            </div>
            <ErrorMsg02 msg={rating <= 0 ? "Rating is a required field" : ""} />
         </div>
         <div className='tp-product-details-review-input-wrapper'>
            <div className='tp-product-details-review-input-box'>
               <div className='tp-product-details-review-input'>
                  <textarea
                     {...register("comment", {required: `Nội dung đánh giá bắt buộc !`})}
                     id='comment'
                     name='comment'
                     placeholder='Ghi nội dung tại đây ....'
                  />
               </div>
               <div className='tp-product-details-review-input-title'>
                  <label htmlFor='msg'>Đánh gía của bạn</label>
               </div>
               <ErrorMsg02 msg={errors.comment?.message} />
            </div>
         </div>
         <div className='tp-product-details-review-btn-wrapper'>
            <button type='submit' id='submit_addReview' className='tp-product-details-review-btn'>
               Gửi đánh giá sản phẩm
            </button>
         </div>
      </form>
   );
};

export default ReviewForm;
