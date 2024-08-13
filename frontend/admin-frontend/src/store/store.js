import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { productApi } from '../api/productsApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store;
