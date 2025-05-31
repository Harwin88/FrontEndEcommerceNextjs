'use client';

import React, { useState, useEffect } from 'react';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectTotalPrice } from '@/redux/slices/cartSlice';
import { setPaymentInfo } from '@/redux/slices/paymentSlice';
import { useOrderIntegration } from '@/hooks/useOrderIntegration';
import { PaymentResponse } from '@/types';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
  locale: 'es-CO',
});

interface PaymentMethodWithOrdersProps {
  shippingCoste: number;
  dataForm: {
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
  };
  onOrderSuccess?: (orderId: string) => void;
  onPaymentSuccess?: (paymentResult: any) => void;
}

const PaymentMethodWithOrders: React.FC<PaymentMethodWithOrdersProps> = ({
  shippingCoste,
  dataForm,
  onOrderSuccess,
  onPaymentSuccess,
}) => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  // ✅ Hook de integración de órdenes
  const {
    createOrderWithPayment,
    createOrder,
    loading: orderLoading,
    error: orderError,
    success: orderSuccess,
    orderId,
    reset: resetOrder,
  } = useOrderIntegration();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  useEffect(() => {
    const createPreference = async () => {
      try {
        setLoading(true);
        setError(null);

        const requestData = {
          dataForm,
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            price: Number(item.price) + Number(shippingCoste || 0),
            quantity: item.quantity,
          })),
          successUrl: `${window.location.origin}/order-success`,
          failureUrl: `${window.location.origin}/order-failure`,
          pendingUrl: `${window.location.origin}/order-pending`,
          notificationUrl: `${window.location.origin}/api/mercadopago/webhook`,
        };

        console.log('🔄 Creando preferencia de MercadoPago:', requestData);

        const response = await fetch('/api/create_preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${data.error || 'Error desconocido'}`
          );
        }

        if (data.preference_id) {
          console.log('✅ Preference ID obtenido:', data.preference_id);
          setPreferenceId(data.preference_id);
          setError(null);
        } else {
          throw new Error('No se pudo obtener el preference_id');
        }
      } catch (error: any) {
        console.error('❌ Error al crear preferencia:', error);
        setError(`Error al comunicarse con Mercado Pago: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0 && totalPrice > 0) {
      createPreference();
    } else {
      setLoading(false);
    }
  }, [cartItems, totalPrice, shippingCoste, dataForm]);

  const initialization = {
    amount: Number(totalPrice) > 0 ? Number(totalPrice) : 1,
    preferenceId,
  };

  const customization = {
    paymentMethods: {
      wallet_purchase: 'all',
      bankTransfer: 'all',
      creditCard: 'all',
      debitCard: 'all',
      atm: 'all',
      maxInstallments: 12,
    },
  };

  const onSubmit = async ({
    selectedPaymentMethod,
    formData,
  }: {
    selectedPaymentMethod: any;
    formData: any;
  }) => {
    return new Promise<PaymentResponse>((resolve, reject) => {
      console.log('💳 Procesando pago:', { selectedPaymentMethod, formData });

      fetch('/api/process_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(async (response: PaymentResponse) => {
          console.log('📄 Resultado del pago:', response);

          if (!response || typeof response !== 'object') {
            throw new Error('Respuesta de pago inválida');
          }

          // ✅ Guardar información de pago en Redux
          const paymentInfo = {
            id: response.id || null,
            status: response.status || null,
            status_detail: response.status_detail || null,
            payment_type_id: response.payment_type_id || null,
            payment_method_id: response.payment_method_id || null,
            transaction_amount: response.transaction_amount || null,
            external_reference: response.external_reference || null,
            callback_url: response.callback_url || null,
            payer_id: response.payer?.id || null,
            transaction_details: {
              external_resource_url:
                response.transaction_details?.external_resource_url || null,
              bank_transfer_id:
                response.transaction_details?.bank_transfer_id || null,
            },
          };

          dispatch(setPaymentInfo(paymentInfo));

          // ✅ MEJORADO: Crear orden después del pago exitoso
          try {
            if (response.status === 'approved') {
              console.log('✅ Pago aprobado, creando orden...');

              const order = await createOrderWithPayment(dataForm, response);

              console.log('✅ Orden creada exitosamente:', order);

              if (onOrderSuccess) {
                onOrderSuccess(order.id);
              }

              if (onPaymentSuccess) {
                onPaymentSuccess(response);
              }

              // Redirigir a página de éxito
              window.location.href = `/order-success?payment_id=${response.id}&order_id=${order.id}`;
            } else if (response.status === 'pending') {
              console.log('⏳ Pago pendiente, creando orden pendiente...');

              // ✅ CORREGIDO: Crear orden también para pagos pendientes
              const order = await createOrder(dataForm);

              console.log('📝 Orden pendiente creada:', order);

              if (onOrderSuccess) {
                onOrderSuccess(order.id);
              }

              alert(
                'Pago pendiente de aprobación. Te notificaremos cuando se confirme.'
              );
              window.location.href = `/order-success?payment_id=${response.id}&order_id=${order.id}&status=pending`;
            } else if (response.status === 'in_process') {
              console.log('🔄 Pago en proceso, creando orden...');

              const order = await createOrder(dataForm);

              console.log('📝 Orden en proceso creada:', order);

              if (onOrderSuccess) {
                onOrderSuccess(order.id);
              }

              alert(
                'Tu pago está siendo procesado. Te notificaremos el resultado.'
              );
              window.location.href = `/order-success?payment_id=${response.id}&order_id=${order.id}&status=processing`;
            } else {
              console.log(`❌ Pago con estado: ${response.status}`);
              alert(
                `Pago ${response.status}: ${
                  response.status_detail || 'Ver detalles'
                }`
              );
            }
          } catch (orderError: any) {
            console.error('❌ Error al crear orden:', orderError);
            alert(`Error al crear orden: ${orderError.message}`);
          }

          // Verificar redirección externa
          const externalUrl =
            response.transaction_details?.external_resource_url;
          if (externalUrl && typeof externalUrl === 'string') {
            console.log('🔗 Redirigiendo a:', externalUrl);
            window.location.href = externalUrl;
          }

          resolve(response);
        })
        .catch((error) => {
          console.error('❌ Error en el proceso de pago:', error);
          reject(error);
        });
    });
  };

  const onError = async (error: any) => {
    console.error('❌ Error en Payment Brick:', error);
    setError(
      `Error en el procesamiento del pago: ${
        error.message || 'Error desconocido'
      }`
    );
  };

  const onReady = async () => {
    console.log('✅ Payment Brick listo');
  };

  // ✅ NUEVO: Función para pago contra entrega
  const onCashOnDelivery = async () => {
    try {
      console.log('💰 Procesando pago contra entrega...');

      const order = await createOrder(dataForm);

      console.log('✅ Orden contra entrega creada:', order);

      if (onOrderSuccess) {
        onOrderSuccess(order.id);
      }

      alert('¡Orden creada exitosamente! Pagarás contra entrega.');
      window.location.href = `/order-success?order_id=${order.id}&payment_method=cash_on_delivery`;
    } catch (error: any) {
      console.error('❌ Error en pago contra entrega:', error);
      alert(`Error al crear orden: ${error.message}`);
    }
  };

  // Estados de carga y error
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando métodos de pago...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error al cargar pagos
        </h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (orderError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Error al crear orden
        </h3>
        <p className="text-red-600 mb-4">{orderError}</p>
        <button
          onClick={resetOrder}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Indicador de carga de orden */}
      {orderLoading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-blue-800">Creando orden...</span>
          </div>
        </div>
      )}

      {/* MercadoPago Payment Brick */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Pago con MercadoPago</h3>
        {preferenceId ? (
          <Payment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
          />
        ) : (
          <div className="text-center text-gray-500">
            Cargando opciones de pago...
          </div>
        )}
      </div>

      {/* Pago contra entrega */}
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Pago contra entrega</h3>
        <p className="text-gray-600 mb-4">
          Paga cuando recibas tu pedido en la puerta de tu casa.
        </p>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="cashOnDelivery"
            checked={cashOnDelivery}
            onChange={(e) => setCashOnDelivery(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="cashOnDelivery"
            className="ml-2 text-sm text-gray-700"
          >
            Acepto pagar contra entrega
          </label>
        </div>
        <button
          onClick={onCashOnDelivery}
          disabled={!cashOnDelivery || orderLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            cashOnDelivery && !orderLoading
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
        >
          {orderLoading ? 'Procesando...' : 'Confirmar Pedido'}
        </button>
      </div>

      {/* Resumen de la orden */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Resumen del Pedido</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${(totalPrice - shippingCoste).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío:</span>
            <span>${shippingCoste.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-blue-900 border-t border-blue-300 pt-1">
            <span>Total:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodWithOrders;
