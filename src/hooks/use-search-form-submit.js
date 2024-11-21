import {useRouter} from "next/router";
import {useState} from "react";

const useSearchFormSubmit = () => {
   const router = useRouter();
   const [searchText, setSearchText] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (searchText) {
         let route = `/search?search=${searchText}`;
         router.push(route, null, {scroll: false});
         setSearchText(searchText);
      } else {
         router.push(`/`, null, {scroll: false});
         setSearchText(searchText);
      }
   };

   return {
      searchText,
      setSearchText,
      handleSubmit,
   };
};

export default useSearchFormSubmit;
