export const handleNext = (
  page: number,
  totalPages: number,
  setPage: any
) => {
  if (page < totalPages) {
    setPage((prev: number) => prev + 1);
  }
};

export const handlePrev = (
  page: number,
  setPage: any
) => {
  if (page > 1) {
    setPage((prev: number) => prev - 1);
  }
};