import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { productApi } from '../api/productApi';
import authReducer from '../slices/authSlice'
import { cartApi } from '../api/cartApi';
import { checkoutApi } from '../api/checkoutApi';
const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, cartApi.middleware, checkoutApi.middleware),
});

export default store;
