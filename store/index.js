import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userslice';
import orderSlice from './orderslice';

const store = configureStore({
  reducer: { user: userSlice.reducer, order: orderSlice.reducer },
});

export default store;
