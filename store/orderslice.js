import { createSlice } from '@reduxjs/toolkit';

const initialOrderSlice = {
  selectedSeats: [],
  eventId: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderSlice,
  reducers: {
    setOrder: (state, action) => {
      state.selectedSeats = action.payload.selectedSeats;
      state.eventId = action.payload.eventId;
    },
    resetOrder: (state, action) => {
      return { ...initialOrderSlice };
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
