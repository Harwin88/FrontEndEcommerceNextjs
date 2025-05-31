'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectCartItems,
  selectTotalPrice,
  addItemToCart,
  removeAllItemsFromCart,
} from '@/redux/slices/cartSlice';
import { useOrderIntegration } from '@/hooks/useOrderIntegration';

const DebugOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const {
    createOrder,
    createOrderWithPayment,
    loading,
    error,
    success,
    orderId,
    reset,
  } = useOrderIntegration();

  const [testStep, setTestStep] = useState<'setup' | 'testing' | 'results'>(
    'setup'
  );
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs((prev) => [...prev, logMessage]);
    console.log(logMessage);
  };

  // Datos de prueba
  const testCustomerData = {
    firstName: 'Juan',
    lastName: 'Test',
    email: 'test@example.com',
    phone: '+57 300 123 4567',
  };

  const testShippingData = {
    firstName: 'Juan',
    lastName: 'Test',
    addressLine1: 'Calle Test 123',
    addressLine2: '',
    city: 'Bogotá',
    state: 'Cundinamarca',
    postalCode: '110111',
    country: 'CO',
    phone: '+57 300 123 4567',
    email: 'test@example.com',
  };

  const addTestProduct = () => {
    const testProduct = {
      id: 999,
      title: 'Producto de Prueba',
      price: 100000,
      discountedPrice: 80000,
      quantity: 1,
      images: ['/test.jpg'],
      category: 'Test',
    };

    dispatch(addItemToCart(testProduct));
    addLog('✅ Producto de prueba agregado al carrito');
  };

  const clearCart = () => {
    dispatch(removeAllItemsFromCart());
    addLog('🧹 Carrito limpiado');
  };

  const testSimpleOrder = async () => {
    try {
      setTestStep('testing');
      addLog('🚀 Iniciando prueba de orden simple...');

      if (cartItems.length === 0) {
        addLog('❌ Error: Carrito vacío');
        return;
      }

      addLog('📦 Datos del carrito:', JSON.stringify(cartItems, null, 2));
      addLog('💰 Total del carrito: $' + totalPrice.toLocaleString());

      const orderData = {
        customer: testCustomerData,
        shipping: testShippingData,
      };

      addLog('📋 Datos de la orden:', JSON.stringify(orderData, null, 2));
      addLog('⏳ Creando orden...');

      const order = await createOrder(orderData);

      addLog('✅ Orden creada exitosamente!');
      addLog('📄 Detalles de la orden:', JSON.stringify(order, null, 2));

      setTestStep('results');
    } catch (error: any) {
      addLog('❌ Error al crear orden: ' + error.message);
      setTestStep('results');
    }
  };

  const testOrderWithPayment = async () => {
    try {
      setTestStep('testing');
      addLog('🚀 Iniciando prueba de orden con pago...');

      if (cartItems.length === 0) {
        addLog('❌ Error: Carrito vacío');
        return;
      }

      // Simular resultado de pago pendiente
      const mockPaymentResult = {
        id: 'PAYMENT_TEST_' + Date.now(),
        status: 'pending',
        status_detail: 'pending_waiting_transfer',
        payment_method_id: 'pse',
        transaction_amount: totalPrice,
        external_reference: 'TEST_REF_' + Date.now(),
      };

      addLog(
        '💳 Simulando pago pendiente:',
        JSON.stringify(mockPaymentResult, null, 2)
      );

      const orderData = {
        customer: testCustomerData,
        shipping: testShippingData,
      };

      addLog('⏳ Creando orden con pago...');

      const order = await createOrderWithPayment(orderData, mockPaymentResult);

      addLog('✅ Orden con pago creada exitosamente!');
      addLog('📄 Detalles de la orden:', JSON.stringify(order, null, 2));

      setTestStep('results');
    } catch (error: any) {
      addLog('❌ Error al crear orden con pago: ' + error.message);
      setTestStep('results');
    }
  };

  const resetTest = () => {
    setTestStep('setup');
    setLogs([]);
    reset();
    addLog('🔄 Test reiniciado');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🐛 Debug Sistema de Órdenes
          </h1>
          <p className="text-lg text-gray-600">
            Página para debuggear y probar la creación de órdenes paso a paso
          </p>
        </div>

        {/* Estado actual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Panel de control */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Panel de Control</h2>

            {/* Estado del carrito */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Estado del Carrito</h3>
              <p>Items: {cartItems.length}</p>
              <p>Total: ${totalPrice.toLocaleString()}</p>

              <div className="mt-3 space-x-2">
                <button
                  onClick={addTestProduct}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Agregar Producto Test
                </button>
                <button
                  onClick={clearCart}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>

            {/* Estados del hook */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Estado del Hook</h3>
              <div className="space-y-1 text-sm">
                <p>Loading: {loading ? 'Sí' : 'No'}</p>
                <p>Error: {error || 'Ninguno'}</p>
                <p>Success: {success ? 'Sí' : 'No'}</p>
                <p>Order ID: {orderId || 'Ninguno'}</p>
              </div>
            </div>

            {/* Botones de prueba */}
            <div className="space-y-3">
              <button
                onClick={testSimpleOrder}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-3 px-4 rounded font-semibold ${
                  loading || cartItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {loading ? 'Procesando...' : 'Probar Orden Simple'}
              </button>

              <button
                onClick={testOrderWithPayment}
                disabled={loading || cartItems.length === 0}
                className={`w-full py-3 px-4 rounded font-semibold ${
                  loading || cartItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Procesando...' : 'Probar Orden con Pago'}
              </button>

              <button
                onClick={resetTest}
                className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
              >
                Reiniciar Test
              </button>
            </div>
          </div>

          {/* Logs en tiempo real */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Logs de Debug</h2>
            <div className="bg-black text-green-400 p-4 rounded h-96 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <p className="text-gray-500">Esperando logs...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Datos de prueba */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Datos de Prueba</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Cliente</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(testCustomerData, null, 2)}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Envío</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(testShippingData, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            📋 Instrucciones de Debug
          </h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <p>
              1. <strong>Agregar producto test</strong> al carrito usando el
              botón
            </p>
            <p>
              2. <strong>Probar orden simple</strong> para verificar la creación
              básica
            </p>
            <p>
              3. <strong>Probar orden con pago</strong> para verificar la
              integración de pagos
            </p>
            <p>
              4. <strong>Revisar logs</strong> para ver el flujo detallado
            </p>
            <p>
              5. <strong>Verificar la consola del navegador</strong> para logs
              adicionales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugOrdersPage;
