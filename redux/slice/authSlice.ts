import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import {
  AuthState,
  LoginFormData,
  OtpFormData,
  RegisterFormData,
} from "@/typeScript/auth.type";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosError } from "axios";

import { getCookie, setCookie } from "cookies-next";

import { toast } from "sonner";

// COOKIES

const token = (getCookie("token") as string) ?? null;

const role = (getCookie("role") as string) ?? null;

const user = getCookie("user") ? JSON.parse(getCookie("user") as string) : null;

//  INITIAL STATE

const initialState: AuthState = {
  loading: false,
  user,
  error: null,
  token,
  role,
};

//  SIGNUP

export const userSignup = createAsyncThunk<
  any,
  RegisterFormData,
  { rejectValue: string }
>("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(endPoints.auth.signUp, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(err.response?.data?.message || "Signup failed");
  }
});

//  VERIFY OTP

export const verifyOtp = createAsyncThunk<
  any,
  OtpFormData,
  { rejectValue: string }
>("auth/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(endPoints.auth.otp, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data?.message || "OTP verification failed",
    );
  }
});

// LOGIN

export const userSignin = createAsyncThunk<
  any,
  LoginFormData,
  { rejectValue: string }
>("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosInstance.post(endPoints.auth.signIn, data);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// SLICE

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      //  SIGNUP

      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userSignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status == true) {
          state.user = payload.data;

          setCookie("id", payload.data.id, {
            path: "/",
            sameSite: "lax",
          });
          toast.success(payload?.message || "Signup successful");
        }
      })

      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "Signup failed";

        state.error = message;

        toast.error(message);
      })

      // VERIFY OTP

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.loading = false;

        if (payload.status == true) {
          toast.success(payload?.message || "OTP verified successfully");
        }
      })

      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;

        const message = action.payload || "OTP verification failed";

        state.error = message;

        toast.error(message);
      })

      //  LOGIN

      .addCase(userSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userSignin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.accessToken;
        state.user = payload.data;
        state.role = payload.data.role;

        // save cookies

        if (payload.status == true) {
          setCookie("token", payload.accessToken, {
            path: "/",
            sameSite: "lax",
          });

          setCookie("refresh-token", payload.refreshToken, {
            path: "/",
            sameSite: "lax",
          });

          setCookie("role", payload.data.role, {
            path: "/",
            sameSite: "lax",
          });

          setCookie("user", JSON.stringify(payload.data), {
            path: "/",
            sameSite: "lax",
          });

          toast.success(payload?.message || "Login successful");
        }
      })

      .addCase(userSignin.rejected, (state, action) => {
        state.loading = false;

        const message =
          action.payload || action.error.message || "Login failed";

        state.error = message;

        toast.error(message);
      });
  },
});

export default authSlice.reducer;
