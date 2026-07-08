

import { userApplyRestaurant } from "@/redux/slice/restaurantSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { applyRestaurantScehma } from "@/validators/restaurantValidator";

import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Restaurant_form() {
  const dispatch = useDispatch<AppDispatch>();
  const applyId = getCookie("user_id");

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(applyRestaurantScehma),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const res = await dispatch(userApplyRestaurant(data)).unwrap();
      router.push('/restaurant/otp')
      console.log(res, "res");
    } catch (err: any) {
      console.log("Login Error:", err);

      // axios error
    }
  };



  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-md rounded-[32px] bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
      >
        <h2 className="text-3xl font-bold text-gray-900">Get Started</h2>

        <p className="mt-2 text-sm text-gray-500">
          Fill in your restaurant details to continue.
        </p>

        <div className="mt-7 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mobile Number / Restaurant ID
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-orange-500 focus:bg-white"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.email?.message}
            </p>
            <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
          </div>

          <button className="mt-2 h-13 w-full rounded-2xl bg-orange-500 text-base font-semibold text-white transition hover:bg-orange-600">
            {isSubmitting ? "Continue......" : "Continue"}
          </button>
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-gray-500">
          By continuing, you agree to Swiggy’s{" "}
          <span className="cursor-pointer font-semibold text-gray-900 underline">
            Terms & Conditions
          </span>
        </p>
      </form>
    </>
  );
}
