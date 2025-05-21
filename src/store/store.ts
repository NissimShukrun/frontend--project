import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "../slices/authSlice";
//import cartReducer from "../slices/cartSlice";
//import orderReducer from "../slices/orderSlice";
import productReducer from "../slices/productSlice";
//import userReducer from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //cart: cartReducer,
    //orders: orderReducer,
    products: productReducer,
    //users: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
