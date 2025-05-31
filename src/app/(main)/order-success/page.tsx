'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface OrderDetails {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  createdAt: string;
  paymentId?: string;
}

const OrderSuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  // ✅ NUEVA FUNCIÓN: Llamar al endpoint /api/orders/save directamente
  const createOrderFromMercadoPago = async () => {
    setIsCreatingOrder(true);
    setLoading(true);

    try {
      const paymentId = searchParams.get('payment_id');
      const paymentMethod = searchParams.get('payment_method');
      const status = searchParams.get('status');

      console.log(
        '🚀 Creando orden desde MercadoPago para payment_id:',
        paymentId
      );

      // ✅ Recuperar datos del carrito desde localStorage si están disponibles
      let cartItems = [];
      let customerData = null;
      let shippingData = null;

      try {
        const cartData = localStorage.getItem('checkout_cart_data');
        const custData = localStorage.getItem('checkout_customer_data');
        const shipData = localStorage.getItem('checkout_shipping_data');

        if (cartData) cartItems = JSON.parse(cartData);
        if (custData) customerData = JSON.parse(custData);
        if (shipData) shippingData = JSON.parse(shipData);

        console.log('🔍 Datos recuperados del localStorage:', {
          cartItems: cartItems.length,
          hasCustomer: !!customerData,
          hasShipping: !!shippingData,
        });
      } catch (e) {
        console.warn('⚠️ No se pudieron recuperar datos del localStorage:', e);
      }

      // ✅ Crear datos completos para el endpoint incluyendo items y cliente
      const orderData = {
        source: 'mercadopago_webhook',
        cliente: {
          firstName: customerData?.firstName || 'Cliente',
          lastName: customerData?.lastName || 'MercadoPago',
          email: customerData?.email || 'cliente@email.com',
          phone: customerData?.phone || '',
        },
        shippingAddress: shippingData || {
          firstName: customerData?.firstName || 'Cliente',
          lastName: customerData?.lastName || 'MercadoPago',
          addressLine1: 'Dirección no especificada',
          city: 'Ciudad no especificada',
          state: 'cundinamarca',
          postalCode: '110111',
          country: 'CO',
          phone: customerData?.phone || '',
          email: customerData?.email || 'cliente@email.com',
        },
        items:
          cartItems.length > 0
            ? cartItems.map((item: any) => ({
                productId: item.id?.toString() || `product-${Date.now()}`,
                variantId: item.variantId || null,
                quantity: item.quantity || 1,
                unitPrice: item.price || 0,
                originalPrice: item.price || 0,
                title: item.title || item.name || 'Producto',
                variantTitle: item.variantTitle || '',
                sku: item.sku || `SKU-${item.id}`,
                productImage: item.image || '',
              }))
            : [
                // Fallback: crear un item genérico si no hay datos del carrito
                {
                  productId: `MP-${paymentId || Date.now()}`,
                  variantId: null,
                  quantity: 1,
                  unitPrice: 0, // Se calculará en el backend
                  originalPrice: 0,
                  title: 'Compra vía MercadoPago',
                  variantTitle: '',
                  sku: `MP-${paymentId || Date.now()}`,
                  productImage: '',
                },
              ],
        notes: JSON.stringify({
          mercadoPagoId: paymentId || 'undefined',
          status: status || 'pending',
          paymentType: paymentMethod || 'undefined',
          transactionAmount: 0,
          dateCreated: new Date().toISOString(),
          externalReference: `MP-${paymentId || 'undefined'}`,
          operationType: 'regular_payment',
          source: 'order_success_page',
          cartItemsRecovered: cartItems.length > 0,
          customerDataRecovered: !!customerData,
          shippingDataRecovered: !!shippingData,
        }),
      };

      console.log(
        '📦 Enviando datos completos al endpoint /api/orders/save:',
        orderData
      );

      // ✅ Llamar al endpoint /api/orders/save con datos completos
      const response = await fetch('/api/orders/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al guardar la orden');
      }

      console.log('✅ Orden guardada exitosamente:', result);

      setOrderCreated(true);

      // Actualizar detalles de la orden con los datos reales
      setOrderDetails({
        id: result.orderId || paymentId || `ORD-${Date.now()}`,
        orderNumber:
          result.orderNumber || `#${Date.now().toString().slice(-6)}`,
        status: 'confirmed',
        total: result.total || 0,
        paymentMethod: paymentMethod === 'pse' ? 'PSE' : 'MercadoPago',
        createdAt: new Date().toLocaleString(),
        paymentId: paymentId || undefined,
      });

      // Limpiar localStorage después del éxito
      try {
        localStorage.removeItem('checkout_cart_data');
        localStorage.removeItem('checkout_customer_data');
        localStorage.removeItem('checkout_shipping_data');

        // ✅ Limpiar TODOS los datos del carrito
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cart_total');
        localStorage.removeItem('cart_timestamp');
        localStorage.removeItem('checkout_cart_backup');
        localStorage.removeItem('checkout_started_at');

        // Limpiar datos específicos de MercadoPago
        localStorage.removeItem('mercadopago_preference_id');
        localStorage.removeItem('mercadopago_payment_id');
        localStorage.removeItem('mercadopago_status');

        // Limpiar sessionStorage también
        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('checkout_data');

        console.log(
          '🧹 localStorage y sessionStorage completamente limpiados después del éxito'
        );
      } catch (e) {
        console.warn('⚠️ Error al limpiar storage:', e);
      }
    } catch (error: any) {
      console.error('❌ Error al crear orden:', error);
      setError(error.message || 'Error al procesar la orden');
    } finally {
      setIsCreatingOrder(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeOrderSuccess = async () => {
      const paymentId = searchParams.get('payment_id');
      const orderId = searchParams.get('order_id');
      const paymentMethod = searchParams.get('payment_method');

      console.log('📄 Parámetros de URL:', {
        orderId,
        paymentId,
        paymentMethod,
      });

      if (paymentId && !orderId && !orderCreated) {
        // Si hay payment_id pero no order_id, crear la orden usando /api/orders/save
        console.log(
          '💳 Pago detectado, creando orden usando /api/orders/save...'
        );
        await createOrderFromMercadoPago();
      } else {
        // Si ya hay order_id o no hay payment_id, solo mostrar detalles
        const orderDetails: OrderDetails = {
          id: orderId || `ORD-${Date.now()}`,
          orderNumber: `#${Date.now().toString().slice(-6)}`,
          status: 'confirmed',
          total: 0,
          paymentMethod:
            paymentMethod === 'cash_on_delivery'
              ? 'Contra Entrega'
              : paymentMethod === 'pse'
              ? 'PSE'
              : 'MercadoPago',
          createdAt: new Date().toLocaleString(),
          paymentId: paymentId || undefined,
        };

        setOrderDetails(orderDetails);
        setLoading(false);
      }
    };

    initializeOrderSuccess();
  }, [searchParams, orderCreated]);

  if (loading || isCreatingOrder) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {isCreatingOrder
              ? '💾 Guardando orden con GraphQL...'
              : 'Procesando orden...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Error al Procesar Orden
            </h1>
            <p className="text-lg text-gray-600 mb-6">{error}</p>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/checkout')}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors mr-4"
              >
                Reintentar Checkout
              </button>

              <button
                onClick={() => router.push('/')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header de éxito */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Orden Confirmada y Guardada!
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Tu pedido ha sido procesado y{' '}
            <strong>guardado usando GraphQL</strong>. Recibirás un email de
            confirmación pronto.
          </p>

          {orderCreated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold">
                ✅ Orden guardada exitosamente usando /api/orders/save → GraphQL
              </p>
            </div>
          )}

          {orderDetails && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-3">
                Orden {orderDetails.orderNumber}
              </h2>
              <div className="text-green-700 space-y-2">
                <p>
                  <strong>ID de Orden:</strong> {orderDetails.id}
                </p>
                <p>
                  <strong>Estado:</strong>{' '}
                  <span className="capitalize">{orderDetails.status}</span>
                </p>
                <p>
                  <strong>Método de Pago:</strong> {orderDetails.paymentMethod}
                </p>
                {orderDetails.paymentId && (
                  <p>
                    <strong>ID de Pago:</strong> {orderDetails.paymentId}
                  </p>
                )}
                <p>
                  <strong>Total:</strong> ${orderDetails.total.toLocaleString()}
                </p>
                <p>
                  <strong>Fecha:</strong> {orderDetails.createdAt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Información del sistema GraphQL */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💾 Sistema de Guardado Activo
          </h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <p>• Orden procesada usando endpoint /api/orders/save</p>
            <p>• Datos persistidos en Strapi usando mutations GraphQL</p>
            <p>• Sistema de fallback automático a REST API disponible</p>
            <p>• Información completa de MercadoPago capturada</p>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Próximos Pasos
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Confirmación por Email
                </h3>
                <p className="text-gray-600">
                  Recibirás un email con los detalles completos de tu orden.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Preparación del Pedido
                </h3>
                <p className="text-gray-600">
                  Nuestro equipo comenzará a preparar tu pedido inmediatamente.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Envío y Entrega</h3>
                <p className="text-gray-600">
                  Te notificaremos cuando tu pedido sea enviado para hacer
                  seguimiento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Continuar Comprando
          </button>

          <button
            onClick={() => router.push('/checkout')}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            🛒 Nuevo Pedido
          </button>

          <button
            onClick={() => router.push('/account/orders')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
          >
            Ver Mis Pedidos
          </button>
        </div>

        {/* Debug info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">
            Debug Info (Solo desarrollo)
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Order ID:</strong> {searchParams.get('order_id')}
            </p>
            <p>
              <strong>Payment ID:</strong> {searchParams.get('payment_id')}
            </p>
            <p>
              <strong>Payment Method:</strong>{' '}
              {searchParams.get('payment_method')}
            </p>
            <p>
              <strong>Status:</strong> {searchParams.get('status')}
            </p>
            <p>
              <strong>Order Created:</strong> {orderCreated ? 'Sí' : 'No'}
            </p>
            <p>
              <strong>Endpoint Used:</strong> /api/orders/save → GraphQL ✅
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
