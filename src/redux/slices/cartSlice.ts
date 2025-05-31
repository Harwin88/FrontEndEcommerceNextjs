// ✅ Re-export cart functionality from the features directory for consistency
export {
  addItemToCart,
  cart,
  clearCartAfterCheckout,
  markCheckoutStarted,
  removeAllItemsFromCart,
  removeItemFromCart,
  restoreCartFromCancellation,
  selectCartItemCount,
  selectCartItems,
  selectIsCheckoutComplete,
  selectTotalPrice,
  updateCartItemQuantity,
} from '../features/cart-slice';

// Default export
import cartReducer from '../features/cart-slice';
export default cartReducer;
