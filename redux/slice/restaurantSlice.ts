import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import {
  MenuItemPayload,
  RestaurantApplyData,
  RestaurantDetails,
  restaurantOtp,
  RestaurantState,
  VerifyOtpResponse,
} from "@/typeScript/restaurant.type";
// APPLY RESTAURANT

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";

const phone = (getCookie("phone") as string) ?? null;

const initialState: RestaurantState = {
  loading: false,
  error: null,
  phone,
};

export const userApplyRestaurant = createAsyncThunk<
  any,
  RestaurantApplyData,
  { rejectValue: string }
>("auth/applyRestaurant", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(
      endPoints.restaurant.applyRestaurant,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Restaurant application failed",
    );
  }
});

export const verifyRestaurantOtp = createAsyncThunk<
  VerifyOtpResponse,
  restaurantOtp,
  { rejectValue: string }
>("restaurant/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post<VerifyOtpResponse>(
      endPoints.restaurant.verifyOtp,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "OTP verification failed",
    );
  }
});

export const restaurantDetails = createAsyncThunk<
  any,
  RestaurantDetails,
  { rejectValue: string }
>("restaurant/=restaurantDetails", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(
      endPoints.restaurant.restaurantDetails,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "OTP verification failed",
    );
  }
});

export const restaurantDocuments = createAsyncThunk<
  any,
  // RestaurantDetails,
  { rejectValue: string }
>("restaurant/=restaurantDoc", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(
      endPoints.restaurant.restaurantDoc,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Restaurant doc failed",
    );
  }
});

export const restaurantMenu = createAsyncThunk<
  any,
  MenuItemPayload,
  { rejectValue: string }
>("restaurant/restaurantMenu", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(
      endPoints.restaurant.restaurantMenu,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Restaurant doc failed",
    );
  }
});



export const restaurantContract = createAsyncThunk<
  any,

  { rejectValue: string }
>("restaurant/restaurantContract", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(
      endPoints.restaurant.restaurantContract,
      data,
    );

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "Restaurant contract failed",
    );
  }
});




const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //APPLY RESTAURANT

      .addCase(userApplyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userApplyRestaurant.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status === true) {
          state.phone = payload.data.phone;

          setCookie("phone", payload.data.phone, {
            path: "/",
            sameSite: "lax",
          });
        }

        toast.success(payload?.message);
      })

      .addCase(userApplyRestaurant.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "Restaurant application failed";

        state.error = message;

        toast.error(message);
      })

      .addCase(verifyRestaurantOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyRestaurantOtp.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status == true) {
          toast.success(payload?.message || "OTP verified successfully");
          //  setCookie("phone", payload.data.phone, {
          //   path: "/",
          //   sameSite: "lax",
          // });
        }
      })

      .addCase(verifyRestaurantOtp.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "OTP verification failed";

        state.error = message;

        toast.error(message);
      })

      .addCase(restaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantDetails.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status == true) {
        }
      })

      .addCase(restaurantDetails.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "Restaurant details  failed";

        state.error = message;

        toast.error(message);
      })

      .addCase(restaurantDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantDocuments.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status == true) {
        }
      })

      .addCase(restaurantDocuments.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "Restaurant details  failed";

        // state.error = message;

        // toast.error(message);
      })

      .addCase(restaurantMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantMenu.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status == true) {
          toast.success(payload.message)
        }
        state.error = null;
      })

      .addCase(restaurantMenu.rejected, (state, { payload }) => {
        state.loading = false;


        const message = payload || "Menu add failed"

        state.error = message;

        toast.error(message);
      })

      .addCase(restaurantContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restaurantContract.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status == true) {
          toast.success(payload.message)
        }
        state.error = null;
      })

      .addCase(restaurantContract.rejected, (state, { payload }) => {
        state.loading = false;


        const message = payload || "Contract add failed"

        state.error = message;

        toast.error(message);
      });
  },
});

export default restaurantSlice.reducer;
