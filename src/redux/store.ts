import { configureStore } from "@reduxjs/toolkit";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import categoriesReducer from "./features/categoriesSlice"; // <-- Agregar importación
import productsReducer from "@/redux/features/productsSlice";
import authReducer from "@/redux/features/authSlice";
import billingFormReducer from "@/redux/features/billingFormSlice"; // <-- Agregar importación

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    products: productsReducer,
    categories: categoriesReducer, // <-- Agregar propiedad
    auth: authReducer,
    billingForm: billingFormReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
