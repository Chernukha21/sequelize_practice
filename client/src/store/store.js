import { configureStore } from "@reduxjs/toolkit";
import {phonesApi} from './phonesApi.js';

export const store = configureStore({
  reducer: {
    [phonesApi.reducerPath]: phonesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(phonesApi.middleware),
});

export default store;
