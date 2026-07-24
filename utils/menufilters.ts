    // const categories = useMemo(() => {
    //     const unique = new Set<string>();
    //     items.forEach((item: any) => {
    //         if (item?.category) unique.add(item.category.trim());
    //     });
    //     return ["All", ...Array.from(unique)];
    // }, [items]);





    // const filtered = useMemo(() => {
    //     let list = [...items];

    //     if (query.trim()) {
    //         list = list.filter((food: any) =>
    //             food.itemName?.toLowerCase().includes(query.toLowerCase())
    //         );
    //     }

    //     if (activeCategory !== "All") {
    //         list = list.filter(
    //             (food: any) =>
    //                 food.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
    //         );
    //     }

    //     if (pureVegOnly) {
    //         list = list.filter((food: any) => food.isVeg);
    //     }

    //     if (minRating) {
    //         list = list.filter((food: any) => (food.rating ?? 0) >= 4.3);
    //     }

    //     switch (sortKey) {
    //         case "rating":
    //             list.sort((a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0));
    //             break;
    //         case "cost":
    //             list.sort((a: any, b: any) => (a.basePrice ?? 0) - (b.basePrice ?? 0));
    //             break;
    //     }

    //     return list;
    // }, [items, query, activeCategory, pureVegOnly, minRating, sortKey]);





    // const clearAllFilters = () => {
    //     setQuery("");
    //     setActiveCategory("All");
    //     setPureVegOnly(false);
    //     setMinRating(false);
    //     setSortKey("relevance");
    // };


    // const handleNext = () => {
    //     if (page < pagination.totalPages) {
    //         setPage((prev) => prev + 1);
    //     }
    // }

    // const handlePrev = () => {
    //     if (page > 1) {
    //         setPage((prev) => prev - 1);
    //     }
    // };

    // const handleDelete = async (id: string) => {
    //     const result = await Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to recover this item!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonText: "Yes, Delete",
    //         cancelButtonText: "Cancel",
    //         reverseButtons: true,
    //     });

    //     if (result.isConfirmed) {
    //         await dispatch(foodDeletebyRestaurant(id)).unwrap();
    //         await fetchMenu(page, limit);

    //         Swal.fire({
    //             title: "Deleted!",
    //             text: "Food deleted successfully.",
    //             icon: "success",
    //         });
    //     }
    // };

    // utils/menuFilters.ts

export const getCategories = (items: any[]) => {
  const unique = new Set<string>();

  items.forEach((item) => {
    if (item?.category) {
      unique.add(item.category.trim());
    }
  });

  return ["All", ...Array.from(unique)];
};

export const filterMenu = ({
  items,
  query,
  activeCategory,
  pureVegOnly,
  minRating,
  sortKey,
}: {
  items: any[];
  query: string;
  activeCategory: string;
  pureVegOnly: boolean;
  minRating: boolean;
  sortKey: string;
}) => {
  let list = [...items];

  // Search
  if (query.trim()) {
    list = list.filter((food) =>
      food.itemName?.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Category
  if (activeCategory !== "All") {
    list = list.filter(
      (food) =>
        food.category?.trim().toLowerCase() ===
        activeCategory.trim().toLowerCase()
    );
  }

  // Veg
  if (pureVegOnly) {
    list = list.filter((food) => food.isVeg);
  }

  // Rating
  if (minRating) {
    list = list.filter((food) => (food.rating ?? 0) >= 4.3);
  }

  // Sort
  switch (sortKey) {
    case "rating":
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;

    case "cost":
      list.sort((a, b) => (a.basePrice ?? 0) - (b.basePrice ?? 0));
      break;

    default:
      break;
  }

  return list;
};