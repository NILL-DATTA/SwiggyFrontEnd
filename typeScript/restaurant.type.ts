import { restaurantSchema } from "@/validators/restaurantValidator";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import * as yup from "yup";

export interface RestaurantApplyData {
  restaurantName: string;
  address: string;
  phone: string;
  description?: string;
}

export type RestaurantDetails = yup.InferType<typeof restaurantSchema>;

export interface restaurantOtp {
  phone: string;
  otp: string;
}
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
  status: boolean;
}

export interface basicDeatilsFormValues {
  ownerName: string;
  restaurantName: string;
  location: string;
}

export interface basicDeatilsProps {
  register: UseFormRegister<basicDeatilsFormValues>;
  errors: FieldErrors<basicDeatilsFormValues>;
}

export interface contactDetailsProp {
  register: UseFormRegister<RestaurantDetails>;
  errors: FieldErrors<RestaurantDetails>;
  watch: UseFormWatch<RestaurantDetails>;
  setValue: UseFormSetValue<RestaurantDetails>;
}
export interface workingDaysProp {
  control: Control<RestaurantDetails>;
  errors: FieldErrors<RestaurantDetails>;
  setValue: UseFormSetValue<RestaurantDetails>;
  workingDays: string[];
  days: string[];
}

export interface RestaurantState {
  loading: boolean;
  error: string | null;
  phone:string
}
