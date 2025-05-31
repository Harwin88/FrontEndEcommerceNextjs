// ✅ Re-export payment functionality from the features directory for consistency
export { setPaymentInfo, clearPaymentInfo } from '../features/paymentSlice';

// Default export
import paymentReducer from '../features/paymentSlice';
export default paymentReducer;
