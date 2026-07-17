import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { foodList } from "@/redux/slice/restaurantSlice";
import { AppDispatch } from "@/redux/store/store";

const useMenulist = (page: number, limit: number) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Hook", page, limit);
    dispatch(foodList({ page, limit }));
  }, [dispatch, page, limit]);
};

export default useMenulist;