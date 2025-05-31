import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  removeAllItemsFromCart,
  selectCartItems,
  selectTotalPrice,
} from '@/redux/slices/cartSlice';
import { orderService } from '@/services/orderService.simple';
import { useCallback, useState } from 'react';

interface OrderIntegrationData {
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
  payment?: {
    paymentId?: string;
    method?: string;
    status?: string;
  };
}

interface UseOrderIntegrationReturn {
  // Estados
  loading: boolean;
  error: string | null;
  success: boolean;
  orderId: string | null;

  // Funciones principales
  createOrder: (data: OrderIntegrationData) => Promise<any>;
  createOrderWithPayment: (
    data: OrderIntegrationData,
    paymentResult: any
  ) => Promise<any>;
  reset: () => void;

  // Información del carrito
  cartItems: any[];
  totalPrice: number;
  hasItems: boolean;
}

export const useOrderIntegration = (): UseOrderIntegrationReturn => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const createOrder = useCallback(
    async (data: OrderIntegrationData) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setOrderId(null);

        // Validaciones básicas
        if (!cartItems || cartItems.length === 0) {
          throw new Error('El carrito está vacío');
        }

        if (
          !data.customer.firstName ||
          !data.customer.lastName ||
          !data.customer.email
        ) {
          throw new Error('Información del cliente incompleta');
        }

        if (
          !data.shipping.addressLine1 ||
          !data.shipping.city ||
          !data.shipping.state
        ) {
          throw new Error('Información de envío incompleta');
        }

        console.log('🚀 Iniciando creación de orden:', {
          customer: data.customer,
          shipping: data.shipping,
          cartItems: cartItems.length,
          totalPrice,
        });

        // Preparar datos para el orderService
        const orderData = {
          cliente: data.customer,
          shippingAddress: data.shipping,
          items: cartItems.map((item) => ({
            productId: item.id.toString(),
            quantity: item.quantity,
            unitPrice: item.discountedPrice || item.price,
          })),
          notes: `Orden creada. Total: $${totalPrice.toLocaleString()}`,
        };

        // Crear orden
        const order = await orderService.createOrderFromCart(orderData);

        console.log('✅ Orden creada exitosamente:', order);

        // Actualizar estados
        setOrderId(order.id);
        setSuccess(true);

        // Limpiar carrito
        dispatch(removeAllItemsFromCart());

        return order;
      } catch (err: any) {
        console.error('❌ Error al crear orden:', err);
        setError(err.message || 'Error al crear la orden');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [cartItems, totalPrice, dispatch]
  );

  const createOrderWithPayment = useCallback(
    async (data: OrderIntegrationData, paymentResult: any) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setOrderId(null);

        console.log('💳 Creando orden con pago:', { data, paymentResult });

        // ✅ MEJORADO: Validar resultado del pago más flexible
        if (!paymentResult) {
          throw new Error('No se recibió información del pago');
        }

        // ✅ MEJORADO: Aceptar más estados de pago válidos
        const validPaymentStatuses = ['approved', 'pending', 'in_process'];
        if (!validPaymentStatuses.includes(paymentResult.status)) {
          throw new Error(`Estado de pago no válido: ${paymentResult.status}`);
        }

        console.log(
          `📋 Procesando orden con pago estado: ${paymentResult.status}`
        );

        // Crear orden con información de pago
        const orderDataWithPayment = {
          ...data,
          payment: {
            paymentId: paymentResult.id,
            method: paymentResult.payment_method_id || 'mercadopago',
            status: paymentResult.status,
            amount: paymentResult.transaction_amount || totalPrice,
            statusDetail: paymentResult.status_detail,
            externalReference: paymentResult.external_reference,
          },
        };

        console.log(
          '📦 Datos de orden con pago preparados:',
          orderDataWithPayment
        );

        const order = await createOrder(orderDataWithPayment);

        console.log('✅ Orden con pago creada exitosamente:', order);

        return order;
      } catch (err: any) {
        console.error('❌ Error al crear orden con pago:', err);
        setError(err.message || 'Error al procesar la orden con pago');
        throw err;
      }
    },
    [createOrder, totalPrice]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
    setOrderId(null);
  }, []);

  return {
    // Estados
    loading,
    error,
    success,
    orderId,

    // Funciones
    createOrder,
    createOrderWithPayment,
    reset,

    // Información del carrito
    cartItems,
    totalPrice,
    hasItems: cartItems.length > 0,
  };
};
