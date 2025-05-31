import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService.clean';
import {
  CartToOrderData,
  CheckoutFormData,
  Cliente,
  ClienteInput,
  DireccionEnvio,
  DireccionEnvioInput,
  Order,
  OrderFiltersInput,
  OrderInput,
  PaginationArg,
  PaginationMeta,
  ValidationError,
} from '../../types/orders';
import { RootState } from '../store';

// ===== ESTADO INICIAL =====
interface OrdersState {
  // Lista de órdenes
  orders: Order[];
  currentOrder: Order | null;

  // Estados de carga
  loading: boolean;
  submitting: boolean;
  deleting: boolean;

  // Errores
  error: string | null;
  validationErrors: ValidationError[];

  // Filtros y búsqueda
  filters: OrderFiltersInput;
  searchTerm: string;

  // Paginación
  pagination: PaginationMeta;

  // Checkout state
  checkoutData: CheckoutFormData | null;
  checkoutStep: 'customer' | 'shipping' | 'payment' | 'review' | 'success';

  // Clientes y direcciones
  clientes: Cliente[];
  direccionesEnvio: DireccionEnvio[];

  // Estado específico para crear órdenes
  createOrderLoading: boolean;
  createOrderError: string | null;
  createOrderSuccess: boolean;
  lastCreatedOrderId: string | null;

  // Mensajes de éxito
  success: boolean;
  successMessage: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  submitting: false,
  deleting: false,
  error: null,
  validationErrors: [],
  filters: {},
  searchTerm: '',
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  },
  checkoutData: null,
  checkoutStep: 'customer',
  clientes: [],
  direccionesEnvio: [],
  createOrderLoading: false,
  createOrderError: null,
  createOrderSuccess: false,
  lastCreatedOrderId: null,
  success: false,
  successMessage: null,
};

// ===== ASYNC THUNKS =====

// Obtener órdenes
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (params: {
    filters?: OrderFiltersInput;
    pagination?: PaginationArg;
    sort?: string[];
  }) => {
    const orders = await orderService.getOrders(params);
    return { orders };
  }
);

// ✅ Alias para useOrdersRedux
export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchOrdersThunk',
  async (
    params: {
      filters?: OrderFiltersInput;
      pagination?: PaginationArg;
      sort?: string[];
    } = {}
  ) => {
    const result = await orderService.getOrders(params);
    return result.orders;
  }
);

// Obtener orden por ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (documentId: string) => {
    const order = await orderService.getOrderById(documentId);
    return order;
  }
);

// ✅ Alias para useOrdersRedux
export const fetchOrderByIdThunk = createAsyncThunk(
  'orders/fetchOrderByIdThunk',
  async (documentId: string) => {
    const order = await orderService.getOrderById(documentId);
    return order;
  }
);

// Crear orden desde carrito
export const createOrderFromCart = createAsyncThunk(
  'orders/createOrderFromCart',
  async (cartData: CartToOrderData) => {
    const order = await orderService.createOrderFromCart(cartData);
    return order;
  }
);

// ✅ Crear orden - alias para useOrdersRedux
export const createOrderThunk = createAsyncThunk(
  'orders/createOrderThunk',
  async (cartData: CartToOrderData) => {
    const order = await orderService.createOrderFromCart(cartData);
    return order;
  }
);

// Crear orden individual
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: OrderInput) => {
    const order = await orderService.createOrder(orderData);
    return order;
  }
);

// Actualizar orden
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({
    documentId,
    data,
  }: {
    documentId: string;
    data: Partial<OrderInput>;
  }) => {
    const order = await orderService.updateOrder(documentId, data);
    return order;
  }
);

// Buscar órdenes
export const searchOrders = createAsyncThunk(
  'orders/searchOrders',
  async ({
    search,
    pagination,
  }: {
    search: string;
    pagination?: PaginationArg;
  }) => {
    const orders = await orderService.searchOrders(search, pagination);
    return { orders, search };
  }
);

// Obtener clientes
export const fetchClientes = createAsyncThunk(
  'orders/fetchClientes',
  async (params?: { filters?: any; pagination?: PaginationArg }) => {
    const clientes = await orderService.getClientes(
      params?.filters,
      params?.pagination
    );
    return clientes;
  }
);

// Crear cliente
export const createCliente = createAsyncThunk(
  'orders/createCliente',
  async (clienteData: ClienteInput) => {
    const cliente = await orderService.createCliente(clienteData);
    return cliente;
  }
);

// Crear dirección de envío
export const createDireccionEnvio = createAsyncThunk(
  'orders/createDireccionEnvio',
  async (direccionData: DireccionEnvioInput) => {
    const direccion = await orderService.createDireccionEnvio(direccionData);
    return direccion;
  }
);

// ===== SLICE =====
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Limpiar errores
    clearError: (state) => {
      state.error = null;
      state.validationErrors = [];
    },

    // Limpiar orden actual
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    // Actualizar filtros
    updateFilters: (
      state,
      action: PayloadAction<Partial<OrderFiltersInput>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Limpiar filtros
    clearFilters: (state) => {
      state.filters = {};
      state.searchTerm = '';
    },

    // Actualizar término de búsqueda
    updateSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    // Actualizar paginación
    updatePagination: (
      state,
      action: PayloadAction<Partial<PaginationMeta>>
    ) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // === CHECKOUT FLOW ===

    // Inicializar checkout
    initializeCheckout: (state, action: PayloadAction<CheckoutFormData>) => {
      state.checkoutData = action.payload;
      state.checkoutStep = 'customer';
    },

    // Actualizar datos de checkout
    updateCheckoutData: (
      state,
      action: PayloadAction<Partial<CheckoutFormData>>
    ) => {
      if (state.checkoutData) {
        state.checkoutData = { ...state.checkoutData, ...action.payload };
      }
    },

    // Cambiar paso del checkout
    setCheckoutStep: (
      state,
      action: PayloadAction<OrdersState['checkoutStep']>
    ) => {
      state.checkoutStep = action.payload;
    },

    // Limpiar checkout
    clearCheckout: (state) => {
      state.checkoutData = null;
      state.checkoutStep = 'customer';
    },

    // Completar checkout
    completeCheckout: (state) => {
      state.checkoutStep = 'success';
      // Limpiar datos después del éxito
      setTimeout(() => {
        state.checkoutData = null;
        state.checkoutStep = 'customer';
      }, 3000);
    },

    // ✅ Limpiar errores y estados
    clearOrdersError: (state) => {
      state.error = null;
      state.createOrderError = null;
    },
    clearOrdersSuccess: (state) => {
      state.success = false;
      state.createOrderSuccess = false;
      state.successMessage = null;
    },
    resetOrdersState: (state) => {
      return { ...initialState };
    },
    // ✅ Reset específico para crear orden
    resetCreateOrderState: (state) => {
      state.createOrderLoading = false;
      state.createOrderError = null;
      state.createOrderSuccess = false;
      state.lastCreatedOrderId = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // === FETCH ORDERS ===
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar órdenes';
      })

      // === FETCH ORDERS THUNK ===
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar órdenes';
      })

      // === FETCH ORDER BY ID ===
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar orden';
      })

      // === FETCH ORDER BY ID THUNK ===
      .addCase(fetchOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al cargar orden';
      })

      // === CREATE ORDER FROM CART ===
      .addCase(createOrderFromCart.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.validationErrors = [];
      })
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.submitting = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
        state.checkoutStep = 'success';
      })
      .addCase(createOrderFromCart.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || 'Error al crear orden';
      })

      // === UPDATE ORDER ===
      .addCase(updateOrder.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.submitting = false;
        const index = state.orders.findIndex(
          (order) => order.documentId === action.payload.documentId
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.documentId === action.payload.documentId) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || 'Error al actualizar orden';
      })

      // === SEARCH ORDERS ===
      .addCase(searchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.searchTerm = action.payload.search;
      })
      .addCase(searchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error en búsqueda';
      })

      // === FETCH CLIENTES ===
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.clientes = action.payload;
      })

      // === CREATE CLIENTE ===
      .addCase(createCliente.fulfilled, (state, action) => {
        state.clientes.unshift(action.payload);
      })

      // === CREATE DIRECCION ENVIO ===
      .addCase(createDireccionEnvio.fulfilled, (state, action) => {
        state.direccionesEnvio.unshift(action.payload);
      })

      // ✅ Crear orden desde carrito (createOrderThunk)
      .addCase(createOrderThunk.pending, (state) => {
        state.createOrderLoading = true;
        state.createOrderError = null;
        state.createOrderSuccess = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.createOrderLoading = false;
        state.createOrderSuccess = true;
        state.currentOrder = action.payload;
        state.lastCreatedOrderId =
          action.payload.documentId || action.payload.id;
        state.successMessage = 'Orden creada exitosamente';

        // Agregar la nueva orden a la lista
        state.orders.unshift(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.createOrderLoading = false;
        state.createOrderError =
          action.error.message || 'Error al crear la orden';
        state.createOrderSuccess = false;
      })

      // ✅ Crear orden individual
      .addCase(createOrder.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.submitting = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || 'Error al crear la orden';
      });
  },
});

// ===== ACTIONS ===
export const {
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
  clearOrdersError,
  clearOrdersSuccess,
  resetOrdersState,
  resetCreateOrderState,
} = ordersSlice.actions;

// ===== SELECTORS =====
export const selectOrdersState = (state: RootState) => state.ordersReducer;

export const selectOrders = (state: RootState) => state.ordersReducer.orders;

export const selectCurrentOrder = (state: RootState) =>
  state.ordersReducer.currentOrder;

export const selectOrdersLoading = (state: RootState) =>
  state.ordersReducer.loading;

export const selectOrdersSubmitting = (state: RootState) =>
  state.ordersReducer.submitting;

export const selectOrdersError = (state: RootState) =>
  state.ordersReducer.error;

export const selectOrdersFilters = (state: RootState) =>
  state.ordersReducer.filters;

export const selectOrdersSearchTerm = (state: RootState) =>
  state.ordersReducer.searchTerm;

export const selectOrdersPagination = (state: RootState) =>
  state.ordersReducer.pagination;

// Checkout selectors
export const selectCheckoutData = (state: RootState) =>
  state.ordersReducer.checkoutData;

export const selectCheckoutStep = (state: RootState) =>
  state.ordersReducer.checkoutStep;

export const selectClientes = (state: RootState) =>
  state.ordersReducer.clientes;

export const selectDireccionesEnvio = (state: RootState) =>
  state.ordersReducer.direccionesEnvio;

// ===== SELECTORES COMPUTADOS =====
export const selectFilteredOrders = (state: RootState) => {
  const orders = selectOrders(state);
  const filters = selectOrdersFilters(state);
  const searchTerm = selectOrdersSearchTerm(state);

  return orders.filter((order) => {
    // Filtrar por estado
    if (filters.status && order.status !== filters.status) return false;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.numeroOrden?.toLowerCase().includes(searchLower) ||
        order.cliente?.Nombre?.toLowerCase().includes(searchLower) ||
        order.cliente?.Apellido?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });
};

export const selectOrderById = (state: RootState, orderId: string) => {
  return selectOrders(state).find((order) => order.documentId === orderId);
};

export const selectOrdersByCliente = (state: RootState, clienteId: string) => {
  return selectOrders(state).filter(
    (order) => order.cliente?.documentId === clienteId
  );
};

export const selectIsCheckoutValid = (state: RootState) => {
  const checkoutData = selectCheckoutData(state);
  return (
    checkoutData?.customer?.firstName &&
    checkoutData?.customer?.lastName &&
    checkoutData?.customer?.email &&
    checkoutData?.shipping?.addressLine1 &&
    checkoutData?.shipping?.city &&
    checkoutData?.shipping?.state
  );
};

export const selectOrdersSuccess = (state: RootState) =>
  state.ordersReducer.success;

export const selectCreateOrderLoading = (state: RootState) =>
  state.ordersReducer.createOrderLoading;

export const selectCreateOrderError = (state: RootState) =>
  state.ordersReducer.createOrderError;

export const selectCreateOrderSuccess = (state: RootState) =>
  state.ordersReducer.createOrderSuccess;

export const selectLastCreatedOrderId = (state: RootState) =>
  state.ordersReducer.lastCreatedOrderId;

export default ordersSlice.reducer;
