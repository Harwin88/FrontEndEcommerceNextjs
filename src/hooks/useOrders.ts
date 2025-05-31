import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import {
  // Async thunks
  fetchOrders,
  fetchOrderById,
  createOrderFromCart,
  createOrder,
  updateOrder,
  searchOrders,
  fetchClientes,
  createCliente,
  createDireccionEnvio,
  
  // Actions
  clearError,
  clearCurrentOrder,
  updateFilters,
  clearFilters,
  updateSearchTerm,
  updatePagination,
  initializeCheckout,
  updateCheckoutData,
  setCheckoutStep,
  clearCheckout,
  completeCheckout,
  
  // Selectors
  selectOrdersState,
  selectOrders,
  selectCurrentOrder,
  selectOrdersLoading,
  selectOrdersSubmitting,
  selectOrdersError,
  selectOrdersFilters,
  selectOrdersSearchTerm,
  selectOrdersPagination,
  selectCheckoutData,
  selectCheckoutStep,
  selectClientes,
  selectDireccionesEnvio,
  selectFilteredOrders,
  selectOrderById,
  selectOrdersByCliente,
  selectIsCheckoutValid,
} from '../redux/features/ordersSlice';

import {
  Order,
  OrderInput,
  ClienteInput,
  DireccionEnvioInput,
  OrderFiltersInput,
  PaginationArg,
  CartToOrderData,
  CheckoutFormData,
  OrderStatus,
} from '../types/orders';

import { useCartActions } from './useCart';
import { useToast } from './useToast';

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clearCart } = useCartActions();
  const { showToast } = useToast();

  // ===== SELECTORS =====
  const ordersState = useSelector(selectOrdersState);
  const orders = useSelector(selectOrders);
  const currentOrder = useSelector(selectCurrentOrder);
  const loading = useSelector(selectOrdersLoading);
  const submitting = useSelector(selectOrdersSubmitting);
  const error = useSelector(selectOrdersError);
  const filters = useSelector(selectOrdersFilters);
  const searchTerm = useSelector(selectOrdersSearchTerm);
  const pagination = useSelector(selectOrdersPagination);
  const checkoutData = useSelector(selectCheckoutData);
  const checkoutStep = useSelector(selectCheckoutStep);
  const clientes = useSelector(selectClientes);
  const direccionesEnvio = useSelector(selectDireccionesEnvio);
  const filteredOrders = useSelector(selectFilteredOrders);
  const isCheckoutValid = useSelector(selectIsCheckoutValid);

  // ===== CRUD OPERATIONS =====
  
  const getOrders = useCallback(
    async (params?: {
      filters?: OrderFiltersInput;
      pagination?: PaginationArg;
      sort?: string[];
    }) => {
      try {
        await dispatch(fetchOrders(params || {})).unwrap();
      } catch (error) {
        showToast.error('Error al cargar órdenes');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const getOrderById = useCallback(
    async (documentId: string) => {
      try {
        const order = await dispatch(fetchOrderById(documentId)).unwrap();
        return order;
      } catch (error) {
        showToast.error('Error al cargar orden');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const createNewOrder = useCallback(
    async (orderData: OrderInput) => {
      try {
        const order = await dispatch(createOrder(orderData)).unwrap();
        showToast.success('Orden creada exitosamente');
        return order;
      } catch (error) {
        showToast.error('Error al crear orden');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const updateExistingOrder = useCallback(
    async (documentId: string, data: Partial<OrderInput>) => {
      try {
        const order = await dispatch(updateOrder({ documentId, data })).unwrap();
        showToast.success('Orden actualizada exitosamente');
        return order;
      } catch (error) {
        showToast.error('Error al actualizar orden');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const searchOrdersData = useCallback(
    async (search: string, pagination?: PaginationArg) => {
      try {
        await dispatch(searchOrders({ search, pagination })).unwrap();
      } catch (error) {
        showToast.error('Error en la búsqueda');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  // ===== CHECKOUT FLOW =====

  const initCheckout = useCallback(
    (data: CheckoutFormData) => {
      dispatch(initializeCheckout(data));
    },
    [dispatch]
  );

  const updateCheckout = useCallback(
    (data: Partial<CheckoutFormData>) => {
      dispatch(updateCheckoutData(data));
    },
    [dispatch]
  );

  const goToCheckoutStep = useCallback(
    (step: 'customer' | 'shipping' | 'payment' | 'review' | 'success') => {
      dispatch(setCheckoutStep(step));
    },
    [dispatch]
  );

  const nextCheckoutStep = useCallback(() => {
    const stepOrder: Array<'customer' | 'shipping' | 'payment' | 'review' | 'success'> = [
      'customer',
      'shipping', 
      'payment',
      'review',
      'success'
    ];
    const currentIndex = stepOrder.indexOf(checkoutStep);
    if (currentIndex < stepOrder.length - 1) {
      dispatch(setCheckoutStep(stepOrder[currentIndex + 1]));
    }
  }, [dispatch, checkoutStep]);

  const previousCheckoutStep = useCallback(() => {
    const stepOrder: Array<'customer' | 'shipping' | 'payment' | 'review' | 'success'> = [
      'customer',
      'shipping',
      'payment', 
      'review',
      'success'
    ];
    const currentIndex = stepOrder.indexOf(checkoutStep);
    if (currentIndex > 0) {
      dispatch(setCheckoutStep(stepOrder[currentIndex - 1]));
    }
  }, [dispatch, checkoutStep]);

  const resetCheckout = useCallback(() => {
    dispatch(clearCheckout());
  }, [dispatch]);

  // ===== PROCESS CHECKOUT FROM CART =====

  const processCheckoutFromCart = useCallback(
    async (cartData: CartToOrderData) => {
      try {
        const order = await dispatch(createOrderFromCart(cartData)).unwrap();
        
        // Limpiar carrito tras éxito
        clearCart();
        
        // Completar checkout
        dispatch(completeCheckout());
        
        showToast.success('¡Orden creada exitosamente!');
        return order;
      } catch (error) {
        showToast.error('Error al procesar orden');
        throw error;
      }
    },
    [dispatch, clearCart, showToast]
  );

  // ===== CLIENTES =====

  const getClientes = useCallback(
    async (params?: { filters?: any; pagination?: PaginationArg }) => {
      try {
        await dispatch(fetchClientes(params)).unwrap();
      } catch (error) {
        showToast.error('Error al cargar clientes');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const createNewCliente = useCallback(
    async (clienteData: ClienteInput) => {
      try {
        const cliente = await dispatch(createCliente(clienteData)).unwrap();
        showToast.success('Cliente creado exitosamente');
        return cliente;
      } catch (error) {
        showToast.error('Error al crear cliente');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  const createNewDireccionEnvio = useCallback(
    async (direccionData: DireccionEnvioInput) => {
      try {
        const direccion = await dispatch(createDireccionEnvio(direccionData)).unwrap();
        showToast.success('Dirección creada exitosamente');
        return direccion;
      } catch (error) {
        showToast.error('Error al crear dirección');
        throw error;
      }
    },
    [dispatch, showToast]
  );

  // ===== FILTERS & SEARCH =====

  const setFilters = useCallback(
    (newFilters: Partial<OrderFiltersInput>) => {
      dispatch(updateFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const setSearchTerm = useCallback(
    (term: string) => {
      dispatch(updateSearchTerm(term));
    },
    [dispatch]
  );

  const setPagination = useCallback(
    (paginationData: Partial<{ page: number; pageSize: number; pageCount: number; total: number }>) => {
      dispatch(updatePagination(paginationData));
    },
    [dispatch]
  );

  // ===== UTILITIES =====

  const clearErrors = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearCurrentOrderData = useCallback(() => {
    dispatch(clearCurrentOrder());
  }, [dispatch]);

  const getOrderByIdSelector = useCallback(
    (orderId: string) => {
      return (state: any) => selectOrderById(state, orderId);
    },
    []
  );

  const getOrdersByClienteSelector = useCallback(
    (clienteId: string) => {
      return (state: any) => selectOrdersByCliente(state, clienteId);
    },
    []
  );

  // ===== CALCULATED VALUES =====

  const totalOrders = orders.length;
  const hasOrders = totalOrders > 0;
  const hasError = !!error;
  const isLoading = loading;
  const isSubmitting = submitting;

  // ===== CHECKOUT VALIDATION =====

  const canProceedToNextStep = useCallback(() => {
    if (!checkoutData) return false;

    switch (checkoutStep) {
      case 'customer':
        return !!(checkoutData.cliente?.Nombre && checkoutData.cliente?.Apellido);
      case 'shipping':
        return !!(checkoutData.direccionEnvio?.Direccion && checkoutData.direccionEnvio?.Departamento);
      case 'payment':
        return true; // No payment validation for now
      case 'review':
        return isCheckoutValid;
      default:
        return false;
    }
  }, [checkoutData, checkoutStep, isCheckoutValid]);

  return {
    // State
    orders,
    filteredOrders,
    currentOrder,
    loading,
    submitting,
    error,
    filters,
    searchTerm,
    pagination,
    clientes,
    direccionesEnvio,
    
    // Checkout
    checkoutData,
    checkoutStep,
    isCheckoutValid,
    canProceedToNextStep: canProceedToNextStep(),
    
    // Actions
    getOrders,
    getOrderById,
    createNewOrder,
    updateExistingOrder,
    searchOrdersData,
    processCheckoutFromCart,
    
    // Clientes
    getClientes,
    createNewCliente,
    createNewDireccionEnvio,
    
    // Checkout flow
    initCheckout,
    updateCheckout,
    goToCheckoutStep,
    nextCheckoutStep,
    previousCheckoutStep,
    resetCheckout,
    
    // Filters & Search
    setFilters,
    resetFilters,
    setSearchTerm,
    setPagination,
    
    // Utilities
    clearErrors,
    clearCurrentOrderData,
    getOrderByIdSelector,
    getOrdersByClienteSelector,
    
    // Calculated
    totalOrders,
    hasOrders,
    hasError,
    isLoading,
    isSubmitting,
  };
};

export default useOrders;
