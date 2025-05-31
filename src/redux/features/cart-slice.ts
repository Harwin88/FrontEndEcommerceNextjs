import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type InitialState = {
  items: CartItem[];
  isCheckoutComplete: boolean;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

// 🔹 Cargar datos desde localStorage al iniciar la app
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.warn('Error al cargar carrito desde localStorage:', error);
      return [];
    }
  }
  return [];
};

// ✅ Función para limpiar TODOS los datos del carrito
const clearAllCartData = () => {
  if (typeof window !== 'undefined') {
    try {
      // Limpiar localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('checkout_cart_data');
      localStorage.removeItem('checkout_customer_data');
      localStorage.removeItem('checkout_shipping_data');
      localStorage.removeItem('cart_total');
      localStorage.removeItem('cart_timestamp');

      // Limpiar sessionStorage
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('checkout_data');

      console.log('🧹 Todos los datos del carrito han sido limpiados');
    } catch (error) {
      console.warn('Error al limpiar datos del carrito:', error);
    }
  }
};

const initialState: InitialState = {
  items: loadCartFromLocalStorage(),
  isCheckoutComplete: false,
};

export const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, title, price, quantity, discountedPrice, imgs } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, price, quantity, discountedPrice, imgs });
      }

      // 🔹 Guardar en localStorage después de cada cambio
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        localStorage.setItem('cart_timestamp', Date.now().toString());
      }

      // Reset checkout completion flag
      state.isCheckoutComplete = false;
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
      clearAllCartData();
      state.isCheckoutComplete = false;
    },

    // ✅ NUEVA ACCIÓN: Limpiar carrito después de orden exitosa
    clearCartAfterCheckout: (state) => {
      console.log('🎯 Limpiando carrito después de checkout exitoso...');
      state.items = [];
      state.isCheckoutComplete = true;
      clearAllCartData();

      // También limpiar datos específicos de MercadoPago si existen
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('mercadopago_preference_id');
          localStorage.removeItem('mercadopago_payment_id');
          localStorage.removeItem('mercadopago_status');
        } catch (error) {
          console.warn('Error al limpiar datos de MercadoPago:', error);
        }
      }
    },

    // ✅ NUEVA ACCIÓN: Restaurar estado si checkout fue cancelado
    restoreCartFromCancellation: (state) => {
      state.isCheckoutComplete = false;
      // Recargar items desde localStorage si existen
      state.items = loadCartFromLocalStorage();
    },

    // ✅ NUEVA ACCIÓN: Marcar inicio de checkout
    markCheckoutStarted: (state) => {
      // Guardar snapshot del carrito actual antes del checkout
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'checkout_cart_backup',
          JSON.stringify(state.items)
        );
        localStorage.setItem('checkout_started_at', Date.now().toString());
      }
    },
  },
});

export const selectCartItems = (state: RootState) => state.cartReducer.items;
export const selectIsCheckoutComplete = (state: RootState) =>
  state.cartReducer.isCheckoutComplete;

export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  return items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );
});

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }
);

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
  clearCartAfterCheckout,
  restoreCartFromCancellation,
  markCheckoutStarted,
} = cart.actions;

export default cart.reducer;
