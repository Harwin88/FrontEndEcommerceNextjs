import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addItemToCart,
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
} from '@/redux/slices/cartSlice';
import { useCallback } from 'react';

export interface UseCartManagerReturn {
  // Selectores
  cartItems: any[];
  totalPrice: number;
  itemCount: number;
  isCheckoutComplete: boolean;
  isEmpty: boolean;

  // Acciones básicas
  addItem: (item: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  // Acciones de checkout
  startCheckout: () => void;
  completeCheckout: () => void;
  cancelCheckout: () => void;

  // Utilidades
  validateCart: () => boolean;
  getCartSummary: () => string;
  detectStaleCart: () => boolean;
  clearStaleData: () => void;
}

/**
 * 🛒 Hook personalizado para gestión completa del carrito
 * Maneja estado, localStorage, validaciones y limpieza
 */
export const useCartManager = (): UseCartManagerReturn => {
  const dispatch = useAppDispatch();

  // Selectores
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const itemCount = useAppSelector(selectCartItemCount);
  const isCheckoutComplete = useAppSelector(selectIsCheckoutComplete);

  // Computed values
  const isEmpty = cartItems.length === 0;

  // Acciones básicas
  const addItem = useCallback((item: any) => {
    dispatch(addItemToCart(item));
  }, [dispatch]);

  const removeItem = useCallback((id: number) => {
    dispatch(removeItemFromCart(id));
  }, [dispatch]);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch(removeAllItemsFromCart());
  }, [dispatch]);

  // Acciones de checkout
  const startCheckout = useCallback(() => {
    console.log('🎯 Iniciando proceso de checkout...');
    dispatch(markCheckoutStarted());
  }, [dispatch]);

  const completeCheckout = useCallback(() => {
    console.log('🎉 Completando checkout y limpiando carrito...');
    dispatch(clearCartAfterCheckout());
  }, [dispatch]);

  const cancelCheckout = useCallback(() => {
    console.log('🚫 Checkout cancelado, restaurando estado...');
    dispatch(restoreCartFromCancellation());
  }, [dispatch]);

  // Validaciones
  const validateCart = useCallback((): boolean => {
    if (isEmpty) {
      console.warn('⚠️ El carrito está vacío');
      return false;
    }

    const invalidItems = cartItems.filter(item =>
      !item.id ||
      !item.title ||
      item.quantity <= 0 ||
      item.price < 0
    );

    if (invalidItems.length > 0) {
      console.warn('⚠️ Items inválidos encontrados en el carrito:', invalidItems);
      return false;
    }

    return true;
  }, [cartItems, isEmpty]);

  // Utilidades
  const getCartSummary = useCallback((): string => {
    return `${itemCount} items - Total: $${totalPrice.toLocaleString()}`;
  }, [itemCount, totalPrice]);

  const detectStaleCart = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;

    try {
      const cartTimestamp = localStorage.getItem('cart_timestamp');
      if (!cartTimestamp) return false;

      const timestamp = parseInt(cartTimestamp);
      const now = Date.now();
      const hourInMs = 60 * 60 * 1000;
      const staleThreshold = 24 * hourInMs; // 24 horas

      return (now - timestamp) > staleThreshold;
    } catch (error) {
      console.warn('Error al detectar carrito obsoleto:', error);
      return false;
    }
  }, []);

  const clearStaleData = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const staleKeys = [
        'checkout_cart_data',
        'checkout_customer_data',
        'checkout_shipping_data',
        'checkout_cart_backup',
        'checkout_started_at',
        'mercadopago_preference_id',
        'mercadopago_payment_id',
        'mercadopago_status'
      ];

      staleKeys.forEach(key => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      });

      console.log('🧹 Datos obsoletos del carrito eliminados');
    } catch (error) {
      console.warn('Error al limpiar datos obsoletos:', error);
    }
  }, []);

  return {
    // Selectores
    cartItems,
    totalPrice,
    itemCount,
    isCheckoutComplete,
    isEmpty,

    // Acciones básicas
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // Acciones de checkout
    startCheckout,
    completeCheckout,
    cancelCheckout,

    // Utilidades
    validateCart,
    getCartSummary,
    detectStaleCart,
    clearStaleData,
  };
};
