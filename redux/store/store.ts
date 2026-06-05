import { configureStore } from "@reduxjs/toolkit";
import {} from "process";
import authSlice from "../slice/authSlice";
import restaurantSlice from "../slice/restaurantSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
const persistedRestaurantReducer = persistReducer(
  persistConfig,
  restaurantSlice,
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    restaurant: persistedRestaurantReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// REHYDRATE

// restore data from localStorage to redux store

// PURGE

// delete all persist data

// its useFull for logout

// FLUSH
// save data pending persisted data forcefully

// PAUSE

// shut down the persist Temporal

// REGISTER
// register persisted reducer
