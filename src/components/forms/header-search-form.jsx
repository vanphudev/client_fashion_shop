import { useState } from "react";
// internal
import { Search } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";

const HeaderSearchForm = () => {
   const { setSearchText, handleSubmit, searchText } = useSearchFormSubmit();

   return (
      <form onSubmit={handleSubmit}>
         <div className="tp-header-search-wrapper d-flex align-items-center">
            <div className="tp-header-search-box">
               <input
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  type="text"
                  id="search_box"
                  placeholder="Tìm kiếm sản phẩm ..."
               />
            </div>
            <div className="tp-header-search-btn">
               <button type="submit" id="search_button">
                  <Search />
               </button>
            </div>
         </div>
      </form>
   );
};

export default HeaderSearchForm;
