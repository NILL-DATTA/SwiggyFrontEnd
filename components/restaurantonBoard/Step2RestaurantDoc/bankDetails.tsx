export default function BankDetails({ register, errors }) {
  return (
    <>
      <div className="bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-black">
          Official Bank Details
        </h3>
        <p className="text-sm text-gray-500 mb-4 text-black">
          Payments will be credited here
        </p>

        <div className="space-y-4">
          <input
            {...register("ifscCode")}
            type="text"
            placeholder="Bank IFSC Code"
            className="w-full border rounded-xl p-3  text-black outline-none placeholder-black"
          />

          {errors.ifscCode && (
            <p className="text-red-500 text-sm mt-2">
              {errors.ifscCode.message}
            </p>
          )}

          <input
            {...register("bankAccountNumber")}
            type="text"
            placeholder="Bank Account Number"
            className="w-full border rounded-xl p-3 text-black outline-none placeholder-black"
          />
          {errors.bankAccountNumber && (
            <p className="text-red-500 text-sm mt-2">
              {errors.bankAccountNumber.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
