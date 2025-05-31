import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  clearOrdersError,
  createOrderThunk,
  fetchOrderByIdThunk,
  fetchOrdersThunk,
  resetCreateOrderState,
  selectCreateOrderError,
  selectCreateOrderLoading,
  selectCreateOrderSuccess,
  selectCurrentOrder,
  selectLastCreatedOrderId,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
} from '@/redux/features/ordersSlice';
import { selectCartItems, selectTotalPrice } from '@/redux/slices/cartSlice';
import { CartToOrderData } from '@/types/orders';
import { useCallback } from 'react';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface ShippingData {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
}

interface UseOrdersReduxReturn {
  // Estados
  orders: any[];
  currentOrder: any;
  loading: boolean;
  error: string | null;
  createOrderLoading: boolean;
  createOrderError: string | null;
  createOrderSuccess: boolean;
  lastCreatedOrderId: string | null;

  // Funciones principales
  createOrder: (
    customerData: CustomerData,
    shippingData: ShippingData,
    alternativeCartItems?: any[]
  ) => Promise<void>;
  fetchOrders: (params?: any) => Promise<void>;
  fetchOrderById: (orderId: string) => Promise<void>;

  // Funciones de control
  reset: () => void;
  clearError: () => void;

  // Información del carrito
  cartItems: any[];
  totalPrice: number;
  hasItems: boolean;
}

export const useOrdersRedux = (): UseOrdersReduxReturn => {
  const dispatch = useAppDispatch();

  // ✅ Selectores del carrito
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  // ✅ Selectores de órdenes
  const orders = useAppSelector(selectOrders);
  const currentOrder = useAppSelector(selectCurrentOrder);
  const loading = useAppSelector(selectOrdersLoading);
  const error = useAppSelector(selectOrdersError);

  // ✅ Selectores específicos para crear órdenes
  const createOrderLoading = useAppSelector(selectCreateOrderLoading);
  const createOrderError = useAppSelector(selectCreateOrderError);
  const createOrderSuccess = useAppSelector(selectCreateOrderSuccess);
  const lastCreatedOrderId = useAppSelector(selectLastCreatedOrderId);

  const createOrder = useCallback(
    async (
      customerData: CustomerData,
      shippingData: ShippingData,
      alternativeCartItems?: any[] // Parámetro opcional para items del carrito
    ) => {
      try {
        console.log(
          '🚀 useOrdersRedux: Iniciando creación de orden con GraphQL...'
        );

        // Usar items alternativos si se proporcionan, sino usar los del Redux store
        const itemsToUse =
          alternativeCartItems && alternativeCartItems.length > 0
            ? alternativeCartItems
            : cartItems;

        // Validaciones básicas
        if (!itemsToUse || itemsToUse.length === 0) {
          throw new Error('El carrito está vacío');
        }

        if (
          !customerData.firstName ||
          !customerData.lastName ||
          !customerData.email
        ) {
          throw new Error('Información del cliente incompleta');
        }

        if (
          !shippingData.addressLine1 ||
          !shippingData.city ||
          !shippingData.state
        ) {
          throw new Error('Información de envío incompleta');
        }

        // Preparar datos para la orden usando los items correctos
        const orderData: CartToOrderData = {
          cliente: {
            firstName: customerData.firstName,
            lastName: customerData.lastName,
            email: customerData.email,
            phone: customerData.phone || '',
          },
          shippingAddress: {
            firstName: shippingData.firstName || customerData.firstName,
            lastName: shippingData.lastName || customerData.lastName,
            addressLine1: shippingData.addressLine1,
            addressLine2: shippingData.addressLine2 || '',
            city: shippingData.city,
            state: shippingData.state,
            postalCode: shippingData.postalCode || '',
            country: shippingData.country || 'CO',
            phone: shippingData.phone || customerData.phone || '',
            email: shippingData.email || customerData.email,
          },
          items: itemsToUse.map((item: any) => ({
            productId: item.id?.toString() || Date.now().toString(),
            quantity: item.quantity || 1,
            unitPrice: item.price || 0,
            title: item.title || item.name || 'Producto',
          })),
          notes: 'Orden creada desde checkout',
        };

        console.log('📦 Datos de orden preparados:', orderData);
        console.log('🛍️ Items a procesar:', orderData.items);

        // Despachar la acción para crear la orden
        const result = await dispatch(createOrderThunk(orderData));

        if (createOrderThunk.fulfilled.match(result)) {
          console.log('✅ useOrdersRedux: Orden creada exitosamente');
          return result.payload;
        } else {
          throw new Error(result.payload as string);
        }
      } catch (error: any) {
        console.error('❌ useOrdersRedux: Error al crear orden:', error);
        throw error;
      }
    },
    [cartItems, dispatch]
  );

  const fetchOrders = useCallback(
    async (params: any = {}) => {
      try {
        console.log('📋 useOrdersRedux: Obteniendo órdenes...');
        await dispatch(fetchOrdersThunk(params)).unwrap();
        console.log('✅ useOrdersRedux: Órdenes obtenidas exitosamente');
      } catch (error: any) {
        console.error('❌ useOrdersRedux: Error al obtener órdenes:', error);
        throw error;
      }
    },
    [dispatch]
  );

  const fetchOrderById = useCallback(
    async (orderId: string) => {
      try {
        console.log('🔍 useOrdersRedux: Obteniendo orden por ID:', orderId);
        await dispatch(fetchOrderByIdThunk(orderId)).unwrap();
        console.log('✅ useOrdersRedux: Orden obtenida exitosamente');
      } catch (error: any) {
        console.error('❌ useOrdersRedux: Error al obtener orden:', error);
        throw error;
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    console.log('🔄 useOrdersRedux: Reseteando estado de órdenes');
    dispatch(resetCreateOrderState());
  }, [dispatch]);

  const clearError = useCallback(() => {
    console.log('🧹 useOrdersRedux: Limpiando errores');
    dispatch(clearOrdersError());
  }, [dispatch]);

  return {
    // Estados
    orders,
    currentOrder,
    loading,
    error,
    createOrderLoading,
    createOrderError,
    createOrderSuccess,
    lastCreatedOrderId,

    // Funciones
    createOrder,
    fetchOrders,
    fetchOrderById,
    reset,
    clearError,

    // Información del carrito
    cartItems,
    totalPrice,
    hasItems: cartItems.length > 0,
  };
};
