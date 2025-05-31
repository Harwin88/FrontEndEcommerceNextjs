'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectCartItems,
  selectTotalPrice,
  addItemToCart,
} from '@/redux/slices/cartSlice';
import CheckoutWithOrders from '@/components/Checkout/CheckoutWithOrders';
import PaymentMethodWithOrders from '@/components/Checkout/PaymentMethodWithOrders';

const DemoOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const [demoStep, setDemoStep] = useState<'products' | 'checkout' | 'payment'>(
    'products'
  );
  const [customerData, setCustomerData] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    phone: '+57 300 123 4567',
  });
  const [shippingData, setShippingData] = useState({
    firstName: 'Juan',
    lastName: 'Pérez',
    addressLine1: 'Calle 123 # 45-67',
    addressLine2: 'Apto 101',
    city: 'Bogotá',
    state: 'Cundinamarca',
    postalCode: '110111',
    country: 'CO',
    phone: '+57 300 123 4567',
    email: 'juan.perez@example.com',
  });

  // Productos de demostración
  const demoProducts = [
    {
      id: 1,
      title: 'Smartphone Premium',
      price: 899000,
      discountedPrice: 799000,
      description: 'Último modelo con características avanzadas',
      category: 'Electrónicos',
      images: ['/api/placeholder/300/300'],
    },
    {
      id: 2,
      title: 'Auriculares Inalámbricos',
      price: 299000,
      discountedPrice: 249000,
      description: 'Sonido de alta calidad con cancelación de ruido',
      category: 'Audio',
      images: ['/api/placeholder/300/300'],
    },
    {
      id: 3,
      title: 'Tablet 10 pulgadas',
      price: 599000,
      description: 'Perfecta para trabajo y entretenimiento',
      category: 'Electrónicos',
      images: ['/api/placeholder/300/300'],
    },
  ];

  const addToCart = (product: any) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice,
      quantity: 1,
      images: product.images,
      category: product.category,
    };

    dispatch(addItemToCart(cartItem));
    console.log('✅ Producto agregado al carrito:', cartItem);
  };

  const handleOrderSuccess = (orderId: string) => {
    console.log('🎉 ¡Orden creada exitosamente!', orderId);
    alert(`¡Orden creada exitosamente! ID: ${orderId}`);
    setDemoStep('products');
  };

  const handlePaymentSuccess = (paymentResult: any) => {
    console.log('💳 Pago procesado exitosamente:', paymentResult);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛍️ Demo Completa del Sistema de Órdenes
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Prueba el flujo completo: Productos → Carrito → Checkout → Pago →
            Orden
          </p>

          {/* Indicador de pasos */}
          <div className="flex justify-center space-x-4 mb-8">
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                demoStep === 'products'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <span>1. Productos</span>
            </div>
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                demoStep === 'checkout'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <span>2. Checkout</span>
            </div>
            <div
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                demoStep === 'payment'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <span>3. Pago</span>
            </div>
          </div>
        </div>

        {/* Estado del carrito */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Carrito de Compras</h3>
              <p className="text-gray-600">
                {cartItems.length} productos - Total: $
                {totalPrice.toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setDemoStep('products')}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Ver Productos
              </button>
              {cartItems.length > 0 && (
                <>
                  <button
                    onClick={() => setDemoStep('checkout')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Checkout Simple
                  </button>
                  <button
                    onClick={() => setDemoStep('payment')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Checkout con Pago
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Items del carrito */}
          {cartItems.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span>
                      {item.title} x{item.quantity}
                    </span>
                    <span className="font-semibold">
                      $
                      {(
                        (item.discountedPrice || item.price) * item.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenido principal */}
        {demoStep === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Productos Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagen del Producto</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {product.discountedPrice ? (
                          <>
                            <span className="text-2xl font-bold text-green-600">
                              ${product.discountedPrice.toLocaleString()}
                            </span>
                            <span className="ml-2 text-lg text-gray-500 line-through">
                              ${product.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {demoStep === 'checkout' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Checkout Simple (Sin Pago)
            </h2>
            <CheckoutWithOrders
              onSuccess={handleOrderSuccess}
              onCancel={() => setDemoStep('products')}
            />
          </div>
        )}

        {demoStep === 'payment' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">
              Checkout con Integración de Pagos
            </h2>

            {/* Información del cliente y envío (prellenada para demo) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Información del Cliente
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Nombre:</strong> {customerData.firstName}{' '}
                    {customerData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {customerData.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {customerData.phone}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Dirección de Envío
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Dirección:</strong> {shippingData.addressLine1}
                  </p>
                  {shippingData.addressLine2 && (
                    <p>{shippingData.addressLine2}</p>
                  )}
                  <p>
                    <strong>Ciudad:</strong> {shippingData.city},{' '}
                    {shippingData.state}
                  </p>
                  <p>
                    <strong>Código Postal:</strong> {shippingData.postalCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Componente de pago */}
            <PaymentMethodWithOrders
              shippingCoste={15000}
              dataForm={{
                customer: customerData,
                shipping: shippingData,
              }}
              onOrderSuccess={handleOrderSuccess}
              onPaymentSuccess={handlePaymentSuccess}
            />

            <div className="flex justify-center">
              <button
                onClick={() => setDemoStep('products')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Volver a Productos
              </button>
            </div>
          </div>
        )}

        {/* Información técnica */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            📋 Información Técnica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">Flujos Implementados:</h4>
              <ul className="space-y-1">
                <li>✅ Gestión de carrito Redux</li>
                <li>✅ Checkout simple (sin pago)</li>
                <li>✅ Checkout con MercadoPago</li>
                <li>✅ Pago contra entrega</li>
                <li>✅ Creación automática de órdenes</li>
                <li>✅ Limpieza de carrito post-orden</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">APIs Utilizadas:</h4>
              <ul className="space-y-1">
                <li>🔗 POST /api/orders - Crear órdenes</li>
                <li>🔗 POST /api/create_preference - MercadoPago</li>
                <li>🔗 POST /api/process_payment - Procesar pagos</li>
                <li>📦 orderService - Lógica de negocio</li>
                <li>🎣 useOrderIntegration - Hook personalizado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOrdersPage;
