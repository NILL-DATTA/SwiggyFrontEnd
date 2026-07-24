import { foodDeletebyRestaurant } from "@/redux/slice/restaurantSlice";
import Swal from "sweetalert2";

export const handleDelete = async ({
  id,
  dispatch,
  fetchMenu,
  page,
  limit,
}: any) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this item!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    await dispatch(foodDeletebyRestaurant(id)).unwrap();
    await fetchMenu(page, limit);

    Swal.fire({
      title: "Deleted!",
      text: "Food deleted successfully.",
      icon: "success",
    });
  }
};