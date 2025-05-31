import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  clearCartAfterCheckout,
  selectCartItems,
  selectTotalPrice,
} from '@/redux/slices/cartSlice';
import { orderService } from '@/services/orderService.simple';
import { CompleteOrderData } from '@/types/orders';
import { useState } from 'react';

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

interface UseCreateOrderReturn {
  createOrder: (
    customerData: CustomerData,
    shippingData: ShippingData
  ) => Promise<any>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useCreateOrder = (): UseCreateOrderReturn => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createOrder = async (
    customerData: CustomerData,
    shippingData: ShippingData
  ) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      console.log('🛒 Creando orden completa desde carrito:', {
        customerData,
        shippingData,
        cartItems,
      });

      // Validar que hay items en el carrito
      if (!cartItems || cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      // ✅ Convertir datos del carrito al formato completo esperado por orderService
      const completeOrderData: CompleteOrderData = {
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
          addressType: 'home', // Tipo de dirección por defecto
        },
        // Usar la misma dirección para facturación por defecto
        billingAddress: {
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
          addressType: 'home',
        },
        items: cartItems.map((cartItem) => ({
          productId: cartItem.id.toString(),
          quantity: cartItem.quantity,
          unitPrice: cartItem.discountedPrice || cartItem.price,
          title: cartItem.title,
          productImage: cartItem.image || '',
          sku: `PROD-${cartItem.id}`,
        })),
        payment: {
          methodId: 'pending', // Se actualizará cuando se procese el pago
          processingFee: 0,
        },
        shipping: {
          methodId: 'standard',
          estimatedDays: 3,
          cost: 15000, // Costo de envío estándar
        },
        taxes: {
          taxAmount: totalPrice * 0.19, // IVA 19%
          taxRate: 0.19,
          taxType: 'IVA',
        },
        coupons: {
          couponCodes: [],
          discountAmount: 0,
        },
        delivery: {
          estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días
          deliveryInstructions: 'Entrega estándar',
        },
        notes: `Orden creada desde el carrito web. Total original: $${totalPrice.toLocaleString()}`,
      };

      console.log(
        '📦 Datos completos preparados para crear orden:',
        completeOrderData
      );

      // ✅ Crear la orden usando el nuevo método completo
      const order = await orderService.createCompleteOrderFromCart(
        completeOrderData
      );

      console.log('✅ Orden completa creada exitosamente:', order);

      // ✅ Limpiar carrito usando la nueva acción especializada
      console.log('🧹 Iniciando limpieza completa del carrito...');
      dispatch(clearCartAfterCheckout());

      setSuccess(true);
      return order;
    } catch (err: any) {
      console.error('❌ Error al crear orden completa:', err);
      setError(err.message || 'Error al crear la orden');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    createOrder,
    loading,
    error,
    success,
    reset,
  };
};
