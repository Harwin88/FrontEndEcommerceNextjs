'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import {
  selectCartItems,
  selectTotalPrice,
  addItemToCart,
  removeAllItemsFromCart,
} from '@/redux/slices/cartSlice';
import { useOrdersRedux } from '@/hooks/useOrdersRedux';

const TestOrdersReduxPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const {
    orders,
    currentOrder,
    loading,
    error,
    createOrderLoading,
    createOrderError,
    createOrderSuccess,
    lastCreatedOrderId,
    createOrder,
    fetchOrders,
    reset,
    clearError,
    hasItems,
  } = useOrdersRedux();

  const [customerData, setCustomerData] = useState({
    firstName: 'Juan',
    lastName: 'Test',
    email: 'test@example.com',
    phone: '+57 300 123 4567',
  });

  const [shippingData, setShippingData] = useState({
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
  });

  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs((prev) => [...prev, logMessage]);
    console.log(logMessage);
  };

  const addTestProduct = () => {
    const testProduct = {
      id: 999,
      title: 'Producto de Prueba Redux',
      price: 150000,
      discountedPrice: 120000,
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

  const handleCreateOrder = async () => {
    try {
      addLog('🚀 Iniciando creación de orden con Redux + GraphQL...');

      if (!hasItems) {
        addLog('❌ Error: Carrito vacío');
        return;
      }

      addLog('📦 Datos del carrito: ' + JSON.stringify(cartItems, null, 2));
      addLog('💰 Total del carrito: $' + totalPrice.toLocaleString());
      addLog('👤 Datos del cliente: ' + JSON.stringify(customerData, null, 2));
      addLog('🏠 Datos de envío: ' + JSON.stringify(shippingData, null, 2));

      addLog('⏳ Creando orden...');

      await createOrder(customerData, shippingData);

      addLog('✅ Orden creada exitosamente!');
      if (lastCreatedOrderId) {
        addLog('📄 ID de la orden: ' + lastCreatedOrderId);
      }
    } catch (error: any) {
      addLog('❌ Error al crear orden: ' + error.message);
    }
  };

  const handleFetchOrders = async () => {
    try {
      addLog('📋 Obteniendo lista de órdenes...');
      await fetchOrders();
      addLog('✅ Órdenes obtenidas: ' + orders.length + ' órdenes');
    } catch (error: any) {
      addLog('❌ Error al obtener órdenes: ' + error.message);
    }
  };

  const resetTest = () => {
    setLogs([]);
    reset();
    clearError();
    addLog('🔄 Test reiniciado');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Test Sistema de Órdenes con Redux + GraphQL
          </h1>
          <p className="text-lg text-gray-600">
            Prueba del nuevo sistema siguiendo el patrón de registro de usuarios
          </p>
        </div>

        {/* Grid de 3 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de Control */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">🎮 Panel de Control</h2>

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
                  Agregar Producto
                </button>
                <button
                  onClick={clearCart}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Limpiar Carrito
                </button>
              </div>
            </div>

            {/* Estados Redux */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Estados Redux</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: createOrderLoading
                        ? '#f59e0b'
                        : '#10b981',
                    }}
                  ></span>
                  <span>
                    Create Loading: {createOrderLoading ? 'Sí' : 'No'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: createOrderSuccess
                        ? '#10b981'
                        : '#6b7280',
                    }}
                  ></span>
                  <span>
                    Create Success: {createOrderSuccess ? 'Sí' : 'No'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: createOrderError ? '#ef4444' : '#6b7280',
                    }}
                  ></span>
                  <span>Create Error: {createOrderError || 'Ninguno'}</span>
                </div>
                <p>Órdenes: {orders.length}</p>
                <p>Última orden: {lastCreatedOrderId || 'Ninguna'}</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={handleCreateOrder}
                disabled={createOrderLoading || !hasItems}
                className={`w-full py-3 px-4 rounded font-semibold ${
                  createOrderLoading || !hasItems
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {createOrderLoading
                  ? 'Creando...'
                  : 'Crear Orden (Redux + GraphQL)'}
              </button>

              <button
                onClick={handleFetchOrders}
                disabled={loading}
                className={`w-full py-2 px-4 rounded font-semibold ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Cargando...' : 'Obtener Órdenes'}
              </button>

              <button
                onClick={resetTest}
                className="w-full py-2 px-4 border border-gray-300 rounded hover:bg-gray-50"
              >
                Reiniciar Test
              </button>
            </div>

            {/* Estados de éxito/error */}
            {createOrderSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 text-sm">
                  ✅ ¡Orden creada exitosamente!
                </p>
                {lastCreatedOrderId && (
                  <p className="text-green-700 text-xs mt-1">
                    ID: {lastCreatedOrderId}
                  </p>
                )}
              </div>
            )}

            {createOrderError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-800 text-sm">❌ {createOrderError}</p>
              </div>
            )}
          </div>

          {/* Logs de Debug */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">📝 Logs de Debug</h2>
            <div className="bg-black text-green-400 p-4 rounded h-96 overflow-y-auto font-mono text-xs">
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

          {/* Información y Estados */}
          <div className="space-y-6">
            {/* Datos de Prueba */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">📋 Datos de Prueba</h2>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Cliente</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(customerData, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Envío</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(shippingData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Lista de Órdenes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                📋 Órdenes ({orders.length})
              </h2>

              {orders.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No hay órdenes disponibles
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {orders.map((order, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm">
                            {order.orderNumber || `Orden #${index + 1}`}
                          </p>
                          <p className="text-xs text-gray-600">
                            {order.status} - $
                            {(
                              order.totalAmount ||
                              order.total ||
                              0
                            ).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información del Sistema */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🔧 Sistema Redux + GraphQL Pattern
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <h4 className="font-semibold mb-2">✅ Implementado:</h4>
              <ul className="space-y-1">
                <li>• Redux Toolkit con createAsyncThunk</li>
                <li>• GraphQL mutations (CreateOrder, CreateCliente, etc.)</li>
                <li>• REST API como fallback automático</li>
                <li>• Integración con carrito Redux</li>
                <li>• Manejo de estados de carga/error</li>
                <li>• Limpieza automática del carrito</li>
                <li>• Patrón siguiendo user registration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Flujo:</h4>
              <ul className="space-y-1">
                <li>1. Hook useOrdersRedux valida datos</li>
                <li>2. Dispatch createOrderThunk (Redux)</li>
                <li>3. orderService intenta GraphQL primero</li>
                <li>4. Si falla, usa REST API como fallback</li>
                <li>5. Redux actualiza estado global</li>
                <li>6. Carrito se limpia automáticamente</li>
                <li>7. UI refleja cambios instantáneamente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOrdersReduxPage;
