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
  menuData: [],
  restaurantdashBoard: [],
  hasRestaurant: [],
  editingFoodItem: null,
  editSuccess: false,
  singleFood: {},
  pagination: null
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


export const addMenu = createAsyncThunk(
  "restaurant/addMenu",
  async (menuData, thunkAPI) => {
    try {
      console.log("Thunk Started");

      const response = await AxiosInstance.post(
        endPoints.restaurant.addmenu,
        menuData
      );

      console.log("Response Received");
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log("Thunk Error");
      console.log(error);

      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);
export const foodList = createAsyncThunk(
  "restaurant/foodlist",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await AxiosInstance.get(
        endPoints.restaurant.foodlist, {
        params: {
          page, limit
        }
      }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const restaurantDashboard = createAsyncThunk(
  "restaurant/restaurantList",
  async (_, thunkAPI) => {
    try {
      const response = await AxiosInstance.get(
        endPoints.restaurant.restaurantlist
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const editFoodItem = createAsyncThunk(
  "restaurant/editFoodItem",
  async (
    {
      foodId,
      formData,
    }: {
      foodId: string;
      formData: FormData;
    },
    thunkAPI
  ) => {
    try {
      const response = await AxiosInstance.post(
        `${endPoints.restaurant.restaurantedit}/${foodId}`,
        formData
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


export const foodDetails = createAsyncThunk(
  "restaurant/foodDetails",
  async (foodId: string, thunkAPI) => {
    try {
      const response = await AxiosInstance.get(
        `${endPoints.restaurant.restaurantfoodDetails}/${foodId}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

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

          setCookie("email", payload.data.email, {
            path: "/",
            sameSite: "lax",
          })

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

        if (payload.status === true) {

          toast.success(
            payload?.message || "OTP verified successfully"
          );



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
          setCookie("restaurant_id", payload.data._id, {
            path: "/",
            sameSite: "lax",
          });
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
      })

      .addCase(addMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(addMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(foodList.pending, (state) => {
        state.loading = true;
      })
      .addCase(foodList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.menuData = payload;
        state.pagination = payload.pagination;
      })
      .addCase(foodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(restaurantDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restaurantDashboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.hasRestaurant = payload.hasRestaurant;
        state.restaurantdashBoard = payload.data;
      })
      .addCase(restaurantDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.hasRestaurant = null;
        state.restaurantdashBoard = null;
      })


      .addCase(editFoodItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.editSuccess = false;
      })
      .addCase(editFoodItem.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status === true) {
          state.editingFoodItem = payload.data;
          state.editSuccess = true;
          toast.success(payload.message || "Food item updated successfully");
        }
      })
      .addCase(editFoodItem.rejected, (state, action) => {
        state.loading = false;
        const message = action.payload?.message || "Failed to update food item";
        state.error = message;
        state.editSuccess = false;
        toast.error(message);
      })

      .addCase(foodDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(foodDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.singleFood = payload.data;
      })

      .addCase(foodDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default restaurantSlice.reducer;
