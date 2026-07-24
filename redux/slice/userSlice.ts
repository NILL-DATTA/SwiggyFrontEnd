import AxiosInstance from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface UserState {
    loading: boolean;
    error: string | null;
    userlistData: any[];
}

const initialState: UserState = {
    loading: false,
    error: null,
    userlistData: [],
};

export const userRestaurantList = createAsyncThunk<
    any,
    void,
    { rejectValue: string }
>(
    "user/restaurantList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AxiosInstance.get(endPoints.user.list);

            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch restaurant list"
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(userRestaurantList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(userRestaurantList.fulfilled, (state, { payload }) => {
                state.loading = false;

                // Backend Response:
                // {
                //   success: true,
                //   data: [...]
                // }

                state.userlistData = payload.data;
            })

            .addCase(userRestaurantList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
            });
    },
});

export default userSlice.reducer;