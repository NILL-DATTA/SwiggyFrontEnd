import { foodList } from "@/redux/slice/restaurantSlice";
import { AppDispatch } from "@/redux/store/store";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useMenulist = (page: number, limit: number) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchMenu = useCallback(() => {
    dispatch(foodList({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return { fetchMenu };
};