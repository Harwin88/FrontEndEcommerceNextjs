// ===== IMPORTACIONES DE TIPOS GENERADOS =====
// NOTA: Comentamos estas importaciones de GraphQL hasta que estén disponibles
/*
import {
  Order,
  Cliente,
  DireccionEnvio,
  OrderItem,
  OrderInput,
  ClienteInput,
  DireccionEnvioInput,
  OrderItemInput,
  Enum_Order_Status,
  Enum_Cliente_Customertype,
  Enum_Direccionenvio_Addresstype,
} from '@/graphql/generated/graphql';
*/

// ===== TIPOS BÁSICOS TEMPORALES =====
// TODO: Reemplazar con tipos GraphQL cuando estén disponibles
export interface Order {
  id: string;
  documentId: string;
  orderNumber: string;
  status: string;
  customer?: any;
  items?: any[];
  total?: number;
  createdAt?: string;
}

export interface Cliente {
  id: string;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface DireccionEnvio {
  id: string;
  documentId: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
}

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderInput {
  orderNumber?: string;
  status?: string;
  cliente?: string;
  items?: any[];
  total?: number;
}

export interface ClienteInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface DireccionEnvioInput {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  cliente?: string;
}

export interface OrderItemInput {
  quantity: number;
  unitPrice: number;
  subtotal?: number;
  product?: string;
  order?: string;
}

// ===== TIPOS ESPECÍFICOS DE LA APLICACIÓN =====
export interface CartToOrderData {
  cliente: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
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
  };
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
}

// ===== TIPO COMPLETO PARA ÓRDENES CON TODA LA INFORMACIÓN =====
export interface CompleteOrderData {
  cliente: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
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
    addressType?: string;
  };
  billingAddress?: {
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
    addressType?: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    title: string;
    productImage?: string;
    sku?: string;
  }>;
  payment: {
    methodId: string;
    processingFee?: number;
  };
  shipping: {
    methodId: string;
    estimatedDays?: number;
    cost?: number;
    trackingNumber?: string;
  };
  taxes: {
    taxAmount: number;
    taxRate: number;
    taxType: string;
  };
  coupons: {
    couponCodes: string[];
    discountAmount: number;
  };
  delivery: {
    estimatedDeliveryDate?: Date;
    deliveryInstructions?: string;
  };
  notes?: string;
}

export interface CheckoutFormData {
  step: 'customer' | 'shipping' | 'payment' | 'review' | 'success';
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  shipping: {
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
  };
  payment: {
    method?: string;
    // Otros campos de pago según necesidades
  };
}

export interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;

  // Checkout
  checkoutData: CheckoutFormData;
  checkoutLoading: boolean;
  checkoutError: string | null;

  // Filtros y búsqueda
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    clienteId?: string;
  };
  searchTerm: string;

  // Paginación
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };

  // Clientes y direcciones
  clientes: Cliente[];
  direcciones: DireccionEnvio[];
}

// ===== FUNCIONES DE VALIDACIÓN =====
export const validateCustomerData = (
  data: CheckoutFormData['customer']
): string[] => {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  return errors;
};

export const validateShippingData = (
  data: CheckoutFormData['shipping']
): string[] => {
  const errors: string[] = [];

  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.addressLine1?.trim()) errors.push('Address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.state?.trim()) errors.push('State is required');

  return errors;
};

// ===== FUNCIONES DE TRANSFORMACIÓN =====
export const transformCartToOrderData = (
  cartItems: any[],
  customerData: CheckoutFormData['customer'],
  shippingData: CheckoutFormData['shipping']
): CartToOrderData => {
  return {
    cliente: customerData,
    shippingAddress: shippingData,
    items: cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.price,
    })),
  };
};

// ===== HELPERS =====
export const generateOrderNumber = (): string => {
  const now = new Date();
  const timestamp = now.getTime().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `ORD-${timestamp.slice(-8)}-${random}`;
};

export const calculateOrderSubtotal = (
  items: Array<{ quantity: number; unitPrice: number }>
): number => {
  return items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );
};

// ✅ AGREGADO: Función que faltaba
export const calculateOrderItemSubtotal = (
  quantity: number,
  unitPrice: number
): number => {
  return quantity * unitPrice;
};

export const calculateOrderTotal = (
  subtotal: number,
  taxAmount = 0,
  shippingCost = 0,
  discountAmount = 0
): number => {
  return subtotal + taxAmount + shippingCost - discountAmount;
};

export const formatOrderStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// ===== CONSTANTES =====
export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const CHECKOUT_STEPS = {
  CUSTOMER: 'customer',
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  REVIEW: 'review',
  SUCCESS: 'success',
} as const;
