'use client';

import { getTunnelConfig } from '@/config/tunnel';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useOrdersRedux } from '@/hooks/useOrdersRedux';
import { selectTotalPrice } from '@/redux/slices/cartSlice';
import { setPaymentInfo } from '@/redux/slices/paymentSlice';
import { PaymentResponse } from '@/types';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, {
  locale: 'es-CO',
});

interface PaymentBrickProps {
  shippingCoste?: number;
  dataForm: any;
}

const PaymentBrick = ({ shippingCoste, dataForm }: PaymentBrickProps) => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  // ✅ NUEVO: Hook para crear órdenes básicas
  const {
    createOrder,
    createOrderLoading,
    createOrderError,
    createOrderSuccess,
  } = useOrdersRedux();

  useEffect(() => {
    const createPreference = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ MEJORADO: Mejor logging de datos enviados
        const tunnelConfig = getTunnelConfig();
        console.log('🌐 Usando configuración de tunnel:', tunnelConfig);

        const requestData = {
          dataForm,
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.title,
            price: Number(item.price) + Number(shippingCoste || 0),
            quantity: item.quantity,
          })),
          successUrl: tunnelConfig.successUrl,
          failureUrl: tunnelConfig.failureUrl,
          pendingUrl: tunnelConfig.pendingUrl,
          notificationUrl: tunnelConfig.webhookUrl,
        };

        console.log('Enviando datos para crear preferencia:', requestData);

        const response = await fetch('/api/create_preference', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        });

        console.log('Response status:', response.status);

        const data = await response.json();
        console.log('Response data:', data);

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${data.error || 'Error desconocido'}`
          );
        }

        if (data.preference_id) {
          console.log('✅ Preference ID obtenido:', data.preference_id);
          setPreferenceId(data.preference_id);
          setError(null);

          // ✅ NUEVO: Verificar si está en modo de desarrollo
          if (data.mode === 'development') {
            console.log(
              '🔧 Modo de desarrollo detectado - MercadoPago no configurado'
            );
            setError(
              'MercadoPago no configurado. Usa "Pago contra entrega" para crear órdenes básicas.'
            );
          }
        } else {
          console.error(
            '❌ No se recibió preference_id en la respuesta:',
            data
          );
          setError(
            `No se pudo obtener el preference_id. Respuesta: ${JSON.stringify(
              data
            )}`
          );
        }
      } catch (error: any) {
        console.error('❌ Error completo al obtener el preference_id:', error);
        setError(`Error al comunicarse con Mercado Pago: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0 && totalPrice > 0) {
      createPreference();
    } else {
      console.log(
        '⚠️ No se puede crear preferencia - Items del carrito:',
        cartItems.length,
        'Total:',
        totalPrice
      );
      setLoading(false);
    }
  }, [cartItems, totalPrice, shippingCoste, dataForm]);

  const initialization = {
    amount: Number(totalPrice) > 0 ? Number(totalPrice) : 1,
    preferenceId: preferenceId || undefined,
  };

  const customization = {
    paymentMethods: {
      wallet_purchase: 'all' as const,
      bankTransfer: 'all' as const,
      creditCard: 'all' as const,
      debitCard: 'all' as const,
      atm: 'all' as const,
      maxInstallments: 12,
    },
  };
  const dispatch = useAppDispatch();

  // ✅ NUEVO: Función para almacenar datos del checkout antes del pago
  const storeCheckoutData = () => {
    try {
      // Datos del cliente
      const customerData = {
        firstName: dataForm.firstName,
        lastName: dataForm.lastName,
        email: dataForm.email,
        phone: dataForm.phone,
      };

      // Datos de envío
      const shippingData = {
        firstName: dataForm.firstName,
        lastName: dataForm.lastName,
        addressLine1: dataForm.address,
        addressLine2: dataForm.addressTwo || '',
        city: dataForm.town,
        state: dataForm.countryRegion || 'Cundinamarca',
        postalCode: dataForm.documentNumber || '',
        country: dataForm.country || 'CO',
        phone: dataForm.phone,
        email: dataForm.email,
      };

      // Datos del carrito
      const cartData = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.discountedPrice || item.price,
        quantity: item.quantity,
      }));

      // Almacenar en localStorage
      localStorage.setItem(
        'checkout_customer_data',
        JSON.stringify(customerData)
      );
      localStorage.setItem(
        'checkout_shipping_data',
        JSON.stringify(shippingData)
      );
      localStorage.setItem('checkout_cart_data', JSON.stringify(cartData));

      console.log(
        '💾 Datos del checkout almacenados para crear orden después del pago'
      );
    } catch (error) {
      console.error('Error al almacenar datos del checkout:', error);
    }
  };

  const onSubmit = async ({
    selectedPaymentMethod,
    formData,
  }: {
    selectedPaymentMethod: any;
    formData: any;
  }) => {
    return new Promise<PaymentResponse>((resolve, reject) => {
      // ✅ NUEVO: Almacenar datos antes de procesar el pago
      storeCheckoutData();

      fetch('/api/process_payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response: PaymentResponse) => {
          console.log('Resultado del pago:', response);

          // ✅ MEJORADO: Verificar que la respuesta tenga la estructura esperada
          if (!response || typeof response !== 'object') {
            throw new Error('Respuesta de pago inválida');
          }

          // ✅ MEJORADO: Guardar en Redux con validaciones de seguridad
          const tunnelConfig = getTunnelConfig();
          const paymentInfo = {
            id: response.id || null,
            status: response.status || null,
            status_detail: response.status_detail || null,
            payment_type_id: response.payment_type_id || null,
            payment_method_id: response.payment_method_id || null,
            transaction_amount: response.transaction_amount || null,
            external_reference: `REF-${Date.now()}`,
            callback_url: tunnelConfig.successUrl,
            payer_id: response.payer?.id || null,
            transaction_details: {
              external_resource_url:
                response.transaction_details?.external_resource_url || null,
              bank_transfer_id:
                response.transaction_details?.bank_transfer_id || null,
            },
          };

          dispatch(setPaymentInfo(paymentInfo));

          // ✅ CORREGIDO: Para PSE, usar la URL externa de MercadoPago, NO redirigir a order-success
          const externalUrl =
            response.transaction_details?.external_resource_url;

          if (externalUrl && typeof externalUrl === 'string') {
            console.log(
              '🔗 Redirigiendo a MercadoPago PSE para completar el pago:',
              externalUrl
            );
            // Para PSE, abrir en la misma ventana para completar el pago
            window.location.href = externalUrl;
          } else if (response.status === 'approved') {
            // Solo para pagos aprobados inmediatamente (no PSE)
            console.log(
              '✅ Pago aprobado inmediatamente, redirigiendo a order-success'
            );
            const paymentId = response.id;
            const paymentMethod = response.payment_method_id;
            window.location.href = `/order-success?payment_id=${paymentId}&payment_method=${paymentMethod}&status=${response.status}`;
          } else {
            // Para otros estados, mostrar el estado sin redirección automática
            console.log(`ℹ️ Pago en estado: ${response.status}`);
            alert(
              `Pago ${response.status}: ${
                response.status_detail || 'Procesando'
              }`
            );
          }

          resolve(response);
        })
        .catch((error) => {
          console.error('Error al procesar el pago:', error);
          reject(error);
        });
    });
  };

  // ✅ MEJORADO: Función para crear orden básica con pago contra entrega
  const onCashOnDelivery = async () => {
    try {
      setCashOnDelivery(true);
      console.log('🚀 Creando orden básica con pago contra entrega...');

      // Preparar datos del cliente
      const customerData = {
        firstName: dataForm.firstName || 'Cliente',
        lastName: dataForm.lastName || 'Anónimo',
        email: dataForm.email || 'cliente@example.com',
        phone: dataForm.phone || '',
      };

      // Preparar datos de envío
      const shippingData = {
        firstName: dataForm.firstName || 'Cliente',
        lastName: dataForm.lastName || 'Anónimo',
        addressLine1: dataForm.address || 'Dirección no especificada',
        addressLine2: dataForm.addressTwo || '',
        city: dataForm.town || 'Ciudad',
        state: dataForm.countryRegion || 'Estado',
        postalCode: dataForm.documentNumber || '',
        country: dataForm.country || 'CO',
        phone: dataForm.phone || '',
        email: dataForm.email || 'cliente@example.com',
      };

      console.log('📋 Datos del cliente:', customerData);
      console.log('📦 Datos de envío:', shippingData);
      console.log('🛍️ Items del carrito:', cartItems.length);

      // ✅ Crear orden básica usando el hook que funcionaba antes
      await createOrder(customerData, shippingData);

      console.log('✅ Orden básica creada exitosamente');

      // Redirigir a página de éxito
      setTimeout(() => {
        const cashOrderId = `CASH-${Date.now()}`;
        window.location.href = `/order-success?payment_id=${cashOrderId}&payment_method=cash_on_delivery&status=pending`;
      }, 1000);
    } catch (error: any) {
      console.error('❌ Error al crear orden básica:', error);
      alert(`Error al crear orden: ${error.message}`);
      setCashOnDelivery(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bloque de pago</h2>

      {/* ✅ NUEVO: Mostrar estado de orden básica */}
      {createOrderLoading && (
        <div className="bg-blue-100 p-4 rounded mb-4">
          <p className="text-blue-700">🚀 Creando orden básica...</p>
        </div>
      )}

      {createOrderError && (
        <div className="bg-red-100 p-4 rounded mb-4">
          <p className="text-red-700">❌ Error: {createOrderError}</p>
        </div>
      )}

      {createOrderSuccess && (
        <div className="bg-green-100 p-4 rounded mb-4">
          <p className="text-green-700">
            ✅ ¡Orden básica creada exitosamente!
          </p>
        </div>
      )}

      {loading ? (
        <p>Cargando opciones de pago...</p>
      ) : error ? (
        <div className="space-y-4">
          <p className="text-orange-500 bg-orange-50 p-3 rounded">{error}</p>

          {/* ✅ Mostrar botón de orden básica cuando MercadoPago no esté configurado */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-3">
              💡 Puedes crear una orden básica sin procesar el pago:
            </p>
            <button
              onClick={onCashOnDelivery}
              disabled={createOrderLoading || cashOnDelivery}
              className={`px-6 py-3 rounded w-full border-2 transition duration-300 ease-in-out ${
                createOrderLoading || cashOnDelivery
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white border-green-500 hover:bg-green-600'
              }`}
            >
              {createOrderLoading
                ? 'Creando orden...'
                : 'Crear Orden Básica (Pago contra entrega)'}
            </button>
            {cashOnDelivery && !createOrderLoading && (
              <p className="text-green-500 mt-2 text-center">
                ✅ Orden básica en proceso
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          {preferenceId && (
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
            />
          )}
          <div className="mt-4">
            <button
              onClick={onCashOnDelivery}
              disabled={createOrderLoading || cashOnDelivery}
              className={`px-4 py-2 rounded w-full border-2 transition duration-300 ease-in-out ${
                createOrderLoading || cashOnDelivery
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-700'
              }`}
            >
              {createOrderLoading ? 'Creando orden...' : 'Pago contra entrega'}
            </button>
            {cashOnDelivery && !createOrderLoading && (
              <p className="text-green-500 mt-2">
                ✅ Orden básica seleccionada
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentBrick;
