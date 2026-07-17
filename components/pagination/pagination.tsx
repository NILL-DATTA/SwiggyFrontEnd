import React from 'react'

export default function Pagination({ handlePrev, pagination, setPage, handleNext }) {
    return (
        <>
            <div className="flex items-center justify-center gap-2 mt-6">
                {/* Previous */}
                <button
                    onClick={handlePrev}
                    disabled={pagination?.currentPage === 1}
                    className={`px-4 py-2 rounded-lg border transition ${pagination?.currentPage === 1
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                >
                    Previous
                </button>

                {/* Page Numbers */}
                {Array.from(
                    { length: pagination?.totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        onClick={() => setPage(page)}
                        className={`w-10 h-10 rounded-lg transition ${page === pagination?.currentPage
                            ? "bg-orange-500 text-white"
                            : "bg-white border hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next */}
                <button
                    onClick={handleNext}
                    disabled={pagination?.currentPage === pagination?.totalPages}
                    className={`px-4 py-2 rounded-lg border transition ${pagination?.currentPage === pagination?.totalPages
                        ? "cursor-not-allowed bg-gray-100 text-gray-400"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                >
                    Next
                </button>
            </div>

        </>
    )
}
