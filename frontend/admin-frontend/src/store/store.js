import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { productApi } from '../api/productsApi';
import authReducer from '../slices/authSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store;
