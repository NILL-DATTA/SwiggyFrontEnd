import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Outlet from "../outlet";
import Pan from "../pan";
import BankDetails from "../bankDetails";
import Fssai from "../fssai";

import { restaurantDoc } from "@/validators/restaurantValidator";
import { useDispatch } from "react-redux";
import { restaurantDocuments } from "@/redux/slice/restaurantSlice";

export default function Step2RestaurantDocuments({ nextStep }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(restaurantDoc),
    defaultValues: {
      outletType: "",
      pan: "",
      gstin: "",
      ifscCode: "",
      bankAccountNumber: "",
      fssaiNumber: "",
    },
  });

  const handleChange = async (data) => {
    const payload = {
      outletType: data.outletType,
      pan: data.pan,
      gstin: data.gstin,
      ifscCode: data.ifscCode,
      bankAccountNumber: data.bankAccountNumber,
      fssaiNumber: data.fssaiNumber,
    };

    try {
      const res = await dispatch(restaurantDocuments(payload));

      if (res?.meta?.requestStatus === "fulfilled") {
        nextStep();
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleChange)}
      className="max-w-3xl mx-auto p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-black">Restaurant Documents</h2>

      <Outlet register={register} errors={errors} />

      <Pan register={register} errors={errors} />

      <BankDetails register={register} errors={errors} />

      <Fssai register={register} errors={errors} />

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
      >
        Proceed
      </button>
    </form>
  );
}
