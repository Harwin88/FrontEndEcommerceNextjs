// store/paymentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  data: PaymentInfo | null;
}

const initialState: PaymentState = {
  data: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.data = action.payload;
    },
    clearPaymentInfo: (state) => {
      state.data = null;
    },
  },
});

export const { setPaymentInfo, clearPaymentInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
