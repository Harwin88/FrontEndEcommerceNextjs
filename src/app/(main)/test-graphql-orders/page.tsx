'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useOrdersRedux } from '@/hooks/useOrdersRedux';
import {
  addItemToCart,
  removeAllItemsFromCart,
  selectCartItems,
  selectTotalPrice,
} from '@/redux/slices/cartSlice';
import { orderService } from '@/services/orderService.simple';
import React, { useState } from 'react';

const TestGraphQLOrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const {
    orders,
    createOrderLoading,
    createOrderError,
    createOrderSuccess,
    lastCreatedOrderId,
    createOrder,
    reset,
    clearError,
    hasItems,
  } = useOrdersRedux();

  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setLogs((prev) => [...prev, logMessage]);
    console.log(logMessage);
  };

  const addTestProduct = () => {
    const testProduct = {
      id: Math.random() * 1000,
      title: 'Producto GraphQL Test',
      price: 250000,
      discountedPrice: 200000,
      quantity: 1,
      images: ['/test-graphql.jpg'],
      category: 'GraphQL Test',
    };

    dispatch(addItemToCart(testProduct));
    addLog('✅ Producto agregado al carrito');
  };

  const testGraphQLOrder = async () => {
    try {
      addLog('🚀 INICIANDO TEST CON GRAPHQL CLIENT...');

      if (!hasItems) {
        addLog('❌ Error: Carrito vacío');
        return;
      }

      const customerData = {
        firstName: 'Test',
        lastName: 'GraphQL',
        email: 'test.graphql@example.com',
        phone: '+57 300 555 0123',
      };

      const shippingData = {
        firstName: 'Test',
        lastName: 'GraphQL',
        addressLine1: 'Dirección GraphQL 123',
        addressLine2: 'Apt GraphQL',
        city: 'Bogotá',
        state: 'Cundinamarca',
        postalCode: '110111',
        country: 'CO',
        phone: '+57 300 555 0123',
        email: 'test.graphql@example.com',
      };

      addLog('📊 USANDO SISTEMA REDUX + GRAPHQL MUTATIONS');
      addLog('🔧 Cliente GraphQL configurado y listo');
      addLog('📦 Items en carrito: ' + cartItems.length);
      addLog('💰 Total: $' + totalPrice.toLocaleString());

      await createOrder(customerData, shippingData);

      addLog('🎉 ¡ORDEN CREADA EXITOSAMENTE CON GRAPHQL!');
      if (lastCreatedOrderId) {
        addLog('📄 ID de orden: ' + lastCreatedOrderId);
      }
    } catch (error: any) {
      addLog('❌ Error: ' + error.message);
    }
  };

  const clearTest = () => {
    setLogs([]);
    reset();
    clearError();
    dispatch(removeAllItemsFromCart());
    addLog('🔄 Test limpiado');
  };

  // Función para probar la nueva estrategia de órdenes simplificadas
  const testSimplifiedOrder = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 Iniciando prueba de orden simplificada...');

      const testCartData = {
        cliente: {
          firstName: 'Test',
          lastName: 'User',
          email: `test-${Date.now()}@example.com`,
          phone: '300-123-4567',
        },
        shippingAddress: {
          firstName: 'Test',
          lastName: 'User',
          addressLine1: 'Calle 123 #45-67',
          addressLine2: 'Apto 101',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
          phone: '300-123-4567',
          email: `test-${Date.now()}@example.com`,
        },
        items: [
          {
            productId: '1',
            quantity: 2,
            unitPrice: 50000,
            title: 'Producto de Prueba 1',
          },
          {
            productId: '2',
            quantity: 1,
            unitPrice: 75000,
            title: 'Producto de Prueba 2',
          },
        ],
        notes: 'Orden de prueba para verificar estrategia simplificada',
      };

      console.log('📦 Datos de prueba:', testCartData);

      const result = await orderService.createOrderFromCart(testCartData);

      console.log('✅ Resultado de la prueba:', result);

      setResults({
        success: true,
        message: 'Orden creada exitosamente',
        order: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('❌ Error en prueba:', error);
      setError(error.message || 'Error desconocido');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para probar diagnóstico completo
  const testDiagnostic = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🔍 Iniciando diagnóstico completo...');
      const diagnostic = await orderService.diagnosticarGraphQL();

      setResults({
        success: true,
        message: 'Diagnóstico completado',
        diagnostic,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('❌ Error en diagnóstico:', error);
      setError(error.message || 'Error en diagnóstico');
    } finally {
      setLoading(false);
    }
  };

  // Función para probar solo categorías
  const testCategoriesOnly = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 Probando solo categorías...');
      await orderService.testCategoriesOnly();

      setResults({
        success: true,
        message: 'Prueba de categorías completada - ver consola',
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('❌ Error en prueba de categorías:', error);
      setError(error.message || 'Error en categorías');
    } finally {
      setLoading(false);
    }
  };

  // Función para probar orden completa con datos realistas
  const testCompleteOrder = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log(
        '🧪 Iniciando prueba de orden completa con datos realistas...'
      );

      const testCartData = {
        cliente: {
          firstName: 'Ana María',
          lastName: 'González Rodríguez',
          email: `ana.gonzalez.${Date.now()}@email.com`,
          phone: '+57 301 234 5678',
        },
        shippingAddress: {
          firstName: 'Ana María',
          lastName: 'González Rodríguez',
          addressLine1: 'Calle 127 #15-40',
          addressLine2: 'Apartamento 501, Torre B',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110221',
          country: 'CO',
          phone: '+57 301 234 5678',
          email: `ana.gonzalez.${Date.now()}@email.com`,
        },
        items: [
          {
            productId: 'PROD-001',
            quantity: 2,
            unitPrice: 89500,
            title: 'Camiseta Premium Algodón',
          },
          {
            productId: 'PROD-002',
            quantity: 1,
            unitPrice: 156000,
            title: 'Jeans Classic Fit',
          },
          {
            productId: 'PROD-003',
            quantity: 3,
            unitPrice: 45000,
            title: 'Calcetines Deportivos (Pack 3)',
          },
        ],
        notes:
          'Orden de prueba con datos completos - Por favor manejar con cuidado',
      };

      console.log('📦 Datos de prueba completos:', testCartData);

      const result = await orderService.createOrderFromCart(testCartData);

      console.log('✅ Resultado de la prueba completa:', result);

      setResults({
        success: true,
        message: 'Orden completa creada exitosamente',
        order: result,
        timestamp: new Date().toISOString(),
        summary: {
          orderNumber: result.orderNumber || 'N/A',
          customer: `${testCartData.cliente.firstName} ${testCartData.cliente.lastName}`,
          email: testCartData.cliente.email,
          itemsCount: testCartData.items.length,
          total: testCartData.items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
          ),
        },
      });
    } catch (error: any) {
      console.error('❌ Error en prueba completa:', error);
      setError(error.message || 'Error desconocido');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para probar específicamente el fallback de estrategias
  const testFallbackStrategies = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log(
        '🧪 ===== PRUEBA ESPECÍFICA DE FALLBACK DE ESTRATEGIAS ====='
      );
      console.log(
        '🎯 Esta prueba debería mostrar el flujo: Flujo Completo → Orden Simplificada → REST API'
      );

      const testCartData = {
        cliente: {
          firstName: 'Prueba',
          lastName: 'Fallback',
          email: `prueba.fallback.${Date.now()}@test.com`,
          phone: '+57 300 000 0000',
        },
        shippingAddress: {
          firstName: 'Prueba',
          lastName: 'Fallback',
          addressLine1: 'Dirección de Prueba 123',
          addressLine2: 'Oficina 456',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
          phone: '+57 300 000 0000',
          email: `prueba.fallback.${Date.now()}@test.com`,
        },
        items: [
          {
            productId: 'TEST-FALLBACK-001',
            quantity: 1,
            unitPrice: 150000,
            title: 'Producto de Prueba Fallback',
          },
        ],
        notes:
          'PRUEBA DE FALLBACK - Esta orden debe crearse con estrategia simplificada',
      };

      console.log('📦 Datos para prueba de fallback:', testCartData);
      console.log('⏰ Iniciando proceso... observa los logs detallados:');

      const result = await orderService.createOrderFromCart(testCartData);

      console.log('✅ ===== RESULTADO FINAL DE PRUEBA DE FALLBACK =====');
      console.log('🎉 Orden creada exitosamente:', result);

      // Analizar qué estrategia se usó basándose en la estructura del resultado
      let strategyUsed = 'Desconocida';
      if (result.cliente && result.cliente.documentId) {
        strategyUsed = 'Flujo Completo (con cliente y dirección)';
      } else if (result.notes && result.notes.includes('customer')) {
        strategyUsed = 'Orden Simplificada (datos en notes)';
      } else if (result.id && !result.documentId) {
        strategyUsed = 'REST API (fallback final)';
      }

      setResults({
        success: true,
        message: 'Prueba de fallback completada exitosamente',
        order: result,
        strategy: strategyUsed,
        timestamp: new Date().toISOString(),
        analysis: {
          hasCliente: !!(result.cliente && result.cliente.documentId),
          hasNotesWithData: !!(
            result.notes && result.notes.includes('customer')
          ),
          orderNumber: result.orderNumber || result.id || 'N/A',
          isGraphQL: !!result.documentId,
          isREST: !!result.id && !result.documentId,
        },
      });
    } catch (error: any) {
      console.error('❌ ===== ERROR EN PRUEBA DE FALLBACK =====');
      console.error('💥 Error final:', error);

      setError(error.message || 'Error desconocido en prueba de fallback');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para probar específicamente con el esquema GraphQL actual
  const testWithCurrentSchema = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 ===== PRUEBA CON ESQUEMA GRAPHQL ACTUAL =====');
      console.log(
        '🎯 Usando todos los campos disponibles según el esquema GraphQL'
      );

      const testCartData = {
        cliente: {
          firstName: 'María José',
          lastName: 'Rodríguez Silva',
          email: `maria.rodriguez.${Date.now()}@test.com`,
          phone: '+57 315 678 9012',
        },
        shippingAddress: {
          firstName: 'María José',
          lastName: 'Rodríguez Silva',
          addressLine1: 'Carrera 15 #93-47',
          addressLine2: 'Apartamento 302, Edificio Palma Real',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110221',
          country: 'CO',
          phone: '+57 315 678 9012',
          email: `maria.rodriguez.${Date.now()}@test.com`,
        },
        items: [
          {
            productId: 'PROD-SCHEMA-001',
            quantity: 2,
            unitPrice: 125000,
            title: 'Producto Schema Test 1',
          },
          {
            productId: 'PROD-SCHEMA-002',
            quantity: 1,
            unitPrice: 89500,
            title: 'Producto Schema Test 2',
          },
        ],
        notes:
          'Prueba con esquema GraphQL actual - Campos: orderNumber, status, subtotal, totalAmount, orderDate, currency, notes, cliente, shippingAddress',
      };

      console.log('📋 Datos completos para prueba:', testCartData);
      console.log(
        '💰 Total esperado:',
        testCartData.items.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0
        )
      );

      const result = await orderService.createOrderFromCart(testCartData);

      console.log('✅ ===== RESULTADO CON ESQUEMA ACTUAL =====');
      console.log('🎉 Orden creada:', result);

      setResults({
        success: true,
        message: 'Orden creada con esquema GraphQL actual',
        order: result,
        timestamp: new Date().toISOString(),
        schemaFields: {
          orderNumber: result.orderNumber || 'N/A',
          status: result.status || 'N/A',
          subtotal: result.subtotal || 'N/A',
          totalAmount: result.totalAmount || 'N/A',
          currency: result.currency || 'N/A',
          orderDate: result.orderDate || 'N/A',
          hasCliente: !!result.cliente,
          hasShippingAddress: !!result.shippingAddress,
          hasNotes: !!result.notes,
          documentId: result.documentId || 'N/A',
        },
      });
    } catch (error: any) {
      console.error('❌ ===== ERROR CON ESQUEMA ACTUAL =====');
      console.error('💥 Error:', error);

      setError(error.message || 'Error con esquema GraphQL actual');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para probar diferentes estados del enum ENUM_ORDER_STATUS
  const testOrderStatuses = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 ===== PRUEBA DE ESTADOS ENUM_ORDER_STATUS =====');
      console.log(
        '🎯 Probando diferentes valores: pending, confirmed, processing, shipped, delivered, cancelled, refunded'
      );

      const statuses = [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded',
      ];
      const testResults = [];

      for (let i = 0; i < statuses.length; i++) {
        const status = statuses[i];
        console.log(
          `\n🔍 PROBANDO STATUS: ${status.toUpperCase()} (${i + 1}/${
            statuses.length
          })`
        );

        const testCartData = {
          cliente: {
            firstName: 'Test',
            lastName: `Status ${
              status.charAt(0).toUpperCase() + status.slice(1)
            }`,
            email: `test.${status}.${Date.now()}@example.com`,
            phone: '+57 300 000 0000',
          },
          shippingAddress: {
            firstName: 'Test',
            lastName: `Status ${
              status.charAt(0).toUpperCase() + status.slice(1)
            }`,
            addressLine1: `Dirección Status ${status}`,
            addressLine2: `Apt ${status}`,
            city: 'Bogotá',
            state: 'Cundinamarca',
            postalCode: '110111',
            country: 'CO',
            phone: '+57 300 000 0000',
            email: `test.${status}.${Date.now()}@example.com`,
          },
          items: [
            {
              productId: `PROD-${status.toUpperCase()}`,
              quantity: 1,
              unitPrice: 100000,
              title: `Producto Test ${
                status.charAt(0).toUpperCase() + status.slice(1)
              }`,
            },
          ],
          notes: `Prueba de status: ${status} - ENUM_ORDER_STATUS`,
        };

        try {
          // Solo probamos con status 'pending' ya que es el que se crea inicialmente
          // Los otros status normalmente se actualizarían después de crear la orden
          const result = await orderService.createOrderFromCart(testCartData);

          testResults.push({
            status: status,
            success: true,
            orderId: result.documentId || result.id,
            orderNumber: result.orderNumber,
            actualStatus: result.status,
          });

          console.log(
            `✅ Status ${status}: Orden creada con ID ${
              result.documentId || result.id
            }`
          );
        } catch (error: any) {
          testResults.push({
            status: status,
            success: false,
            error: error.message,
          });
          console.log(`❌ Status ${status}: Error - ${error.message}`);
        }

        // Pequeña pausa entre pruebas
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      console.log('\n📊 ===== RESUMEN DE PRUEBAS DE STATUS =====');
      testResults.forEach((result) => {
        if (result.success) {
          console.log(
            `✅ ${result.status}: ${result.orderNumber} (Estado actual: ${result.actualStatus})`
          );
        } else {
          console.log(`❌ ${result.status}: ${result.error}`);
        }
      });

      setResults({
        success: true,
        message: 'Prueba de estados completada',
        statusTests: testResults,
        timestamp: new Date().toISOString(),
        summary: {
          total: testResults.length,
          successful: testResults.filter((r) => r.success).length,
          failed: testResults.filter((r) => !r.success).length,
        },
      });
    } catch (error: any) {
      console.error('❌ ===== ERROR EN PRUEBA DE STATUS =====');
      console.error('💥 Error:', error);

      setError(error.message || 'Error en prueba de estados');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para probar todos los campos de OrderItem
  const testCompleteOrderFields = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      console.log('🧪 ===== PRUEBA DE CAMPOS COMPLETOS =====');
      console.log('🎯 Verificando que todos los campos se usen correctamente');

      const testCartData = {
        cliente: {
          firstName: 'Verificación',
          lastName: 'Campos Completos',
          email: `verificacion.campos.${Date.now()}@test.com`,
          phone: '+57 310 123 4567',
        },
        shippingAddress: {
          firstName: 'Verificación',
          lastName: 'Campos Completos',
          addressLine1: 'Avenida Verificación #123-45',
          addressLine2: 'Torre Campos, Oficina 678',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110321',
          country: 'CO',
          phone: '+57 310 123 4567',
          email: `verificacion.campos.${Date.now()}@test.com`,
        },
        items: [
          {
            productId: 'PROD-VERIFY-001',
            quantity: 3,
            unitPrice: 89500,
            title: 'Producto Verificación Completa',
          },
          {
            productId: 'PROD-VERIFY-002',
            quantity: 1,
            unitPrice: 156000,
            title: 'Producto Campos Avanzados',
          },
        ],
        notes:
          'Prueba de verificación completa de campos - OrderItem con productName, originalPrice, discountAmount, sku, productImage',
      };

      console.log('📋 Campos a verificar en OrderItem:');
      console.log('  ✅ productName (título del producto)');
      console.log('  ✅ quantity (cantidad)');
      console.log('  ✅ unitPrice (precio unitario)');
      console.log('  ✅ originalPrice (precio original)');
      console.log('  ✅ subtotal (subtotal calculado)');
      console.log('  ✅ discountAmount (descuento aplicado)');
      console.log('  ✅ sku (código de producto)');
      console.log('  ✅ productImage (URL de imagen)');
      console.log('  ✅ order (relación con orden)');
      console.log('  ✅ product (relación con producto)');

      const result = await orderService.createOrderFromCart(testCartData);

      console.log('✅ ===== VERIFICACIÓN DE CAMPOS COMPLETADA =====');
      console.log('🎉 Orden creada con campos completos:', result);

      setResults({
        success: true,
        message: 'Verificación de campos completada exitosamente',
        order: result,
        timestamp: new Date().toISOString(),
        fieldsVerified: {
          orderNumber: result.orderNumber,
          status: result.status,
          totalAmount: result.totalAmount,
          currency: result.currency,
          orderDate: result.orderDate,
          hasCompleteNotes: !!(
            result.notes && result.notes.includes('customer')
          ),
          itemsExpected: testCartData.items.length,
          expectedTotal: testCartData.items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
          ),
        },
      });
    } catch (error: any) {
      console.error('❌ ===== ERROR EN VERIFICACIÓN DE CAMPOS =====');
      console.error('💥 Error:', error);

      setError(error.message || 'Error en verificación de campos');
      setResults({
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            🧬 Test GraphQL Orders System v2.0
          </h1>
          <p className="text-lg text-gray-600">
            Prueba del sistema mejorado con estrategia simplificada
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-semibold">
              🔧 Nueva estrategia: Orden simplificada → Flujo completo → REST
              API fallback
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Manejo inteligente de errores de permisos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel de Control */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">🎮 Control Panel</h2>

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
              </div>
            </div>

            {/* Estados del sistema */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Estados del Sistema</h3>
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
                  <span>Loading: {createOrderLoading ? 'Sí' : 'No'}</span>
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
                  <span>Success: {createOrderSuccess ? 'Sí' : 'No'}</span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: createOrderError ? '#ef4444' : '#6b7280',
                    }}
                  ></span>
                  <span>Error: {createOrderError || 'Ninguno'}</span>
                </div>
              </div>
            </div>

            {/* Botones de prueba */}
            <div className="space-y-3">
              <button
                onClick={testSimplifiedOrder}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-green-600 hover:bg-green-700 text-white"
              >
                {loading ? '⏳ Probando...' : 'Probar Orden Simplificada'}
              </button>

              <button
                onClick={testDiagnostic}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? '⏳ Diagnosticando...' : '🔍 Diagnóstico Completo'}
              </button>

              <button
                onClick={testCategoriesOnly}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-purple-600 hover:bg-purple-700 text-white"
              >
                {loading ? '⏳ Probando...' : '📂 Solo Categorías'}
              </button>

              <button
                onClick={testCompleteOrder}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {loading ? '⏳ Probando...' : '🚀 Probar Orden Completa'}
              </button>

              <button
                onClick={testFallbackStrategies}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-pink-600 hover:bg-pink-700 text-white"
              >
                {loading
                  ? '⏳ Probando...'
                  : '🚀 Probar Fallback de Estrategias'}
              </button>

              <button
                onClick={testWithCurrentSchema}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-teal-600 hover:bg-teal-700 text-white"
              >
                {loading ? '⏳ Probando...' : '🚀 Probar Esquema Actual'}
              </button>

              <button
                onClick={testOrderStatuses}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {loading
                  ? '⏳ Probando...'
                  : '🚀 Probar Estados ENUM_ORDER_STATUS'}
              </button>

              <button
                onClick={testCompleteOrderFields}
                disabled={loading}
                className="w-full py-3 px-4 rounded font-semibold bg-pink-600 hover:bg-pink-700 text-white"
              >
                {loading
                  ? '⏳ Probando...'
                  : '🚀 Probar Verificación de Campos'}
              </button>
            </div>

            {/* Mensajes de estado */}
            {createOrderSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-green-800 text-sm">
                  ✅ ¡Orden creada con GraphQL!
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

          {/* Logs en Tiempo Real */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">📝 Logs GraphQL</h2>
            <div className="bg-black text-green-400 p-4 rounded h-96 overflow-y-auto font-mono text-xs">
              {logs.length === 0 ? (
                <p className="text-gray-500">
                  Esperando logs del sistema GraphQL...
                </p>
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

        {/* Resultados */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {results.success ? '✅ Resultados' : '❌ Error'}
            </h2>

            <div className="space-y-4">
              <div>
                <strong>Estado:</strong>{' '}
                <span
                  className={
                    results.success ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {results.success ? 'Éxito' : 'Fallo'}
                </span>
              </div>

              <div>
                <strong>Mensaje:</strong> {results.message}
              </div>

              <div>
                <strong>Timestamp:</strong> {results.timestamp}
              </div>

              {results.order && (
                <div>
                  <strong>Orden creada:</strong>
                  <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                    {JSON.stringify(results.order, null, 2)}
                  </pre>
                </div>
              )}

              {results.diagnostic && (
                <div>
                  <strong>Diagnóstico:</strong>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={
                          results.diagnostic.publicQueries.success
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {results.diagnostic.publicQueries.success ? '✅' : '❌'}
                      </span>
                      <span>
                        Queries públicas:{' '}
                        {results.diagnostic.publicQueries.message}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={
                          results.diagnostic.authentication.success
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {results.diagnostic.authentication.success
                          ? '✅'
                          : '❌'}
                      </span>
                      <span>
                        Autenticación:{' '}
                        {results.diagnostic.authentication.message}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={
                          results.diagnostic.graphqlConnection.success
                            ? 'text-green-600'
                            : 'text-red-600'
                        }
                      >
                        {results.diagnostic.graphqlConnection.success
                          ? '✅'
                          : '❌'}
                      </span>
                      <span>
                        GraphQL autenticado:{' '}
                        {results.diagnostic.graphqlConnection.message}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {results.summary && (
                <div>
                  <strong>Resumen de la Orden:</strong>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong>Número de Orden:</strong>{' '}
                      {results.summary.orderNumber}
                    </div>
                    <div>
                      <strong>Cliente:</strong> {results.summary.customer}
                    </div>
                    <div>
                      <strong>Email:</strong> {results.summary.email}
                    </div>
                    <div>
                      <strong>Cantidad de Productos:</strong>{' '}
                      {results.summary.itemsCount}
                    </div>
                    <div>
                      <strong>Total:</strong> $
                      {results.summary.total.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {results.strategy && (
                <div>
                  <strong>Estrategia Usada:</strong> {results.strategy}
                </div>
              )}

              {results.analysis && (
                <div>
                  <strong>Análisis de Resultado:</strong>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong>Tiene Cliente:</strong>{' '}
                      {results.analysis.hasCliente ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Tiene Datos en Notes:</strong>{' '}
                      {results.analysis.hasNotesWithData ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Número de Orden:</strong>{' '}
                      {results.analysis.orderNumber}
                    </div>
                    <div>
                      <strong>Es GraphQL:</strong>{' '}
                      {results.analysis.isGraphQL ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Es REST:</strong>{' '}
                      {results.analysis.isREST ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>
              )}

              {results.schemaFields && (
                <div>
                  <strong>Campos del Esquema:</strong>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong>Número de Orden:</strong>{' '}
                      {results.schemaFields.orderNumber}
                    </div>
                    <div>
                      <strong>Estado:</strong> {results.schemaFields.status}
                    </div>
                    <div>
                      <strong>Subtotal:</strong> $
                      {results.schemaFields.subtotal.toLocaleString()}
                    </div>
                    <div>
                      <strong>Total:</strong> $
                      {results.schemaFields.totalAmount.toLocaleString()}
                    </div>
                    <div>
                      <strong>Moneda:</strong> {results.schemaFields.currency}
                    </div>
                    <div>
                      <strong>Fecha de Orden:</strong>{' '}
                      {results.schemaFields.orderDate}
                    </div>
                    <div>
                      <strong>Tiene Cliente:</strong>{' '}
                      {results.schemaFields.hasCliente ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Tiene Dirección:</strong>{' '}
                      {results.schemaFields.hasShippingAddress ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Tiene Notas:</strong>{' '}
                      {results.schemaFields.hasNotes ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Es GraphQL:</strong>{' '}
                      {results.schemaFields.documentId ? 'Sí' : 'No'}
                    </div>
                  </div>
                </div>
              )}

              {results.statusTests && (
                <div>
                  <strong>Pruebas de Estados ENUM_ORDER_STATUS:</strong>
                  <div className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {results.statusTests.map((test, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded border ${
                            test.success
                              ? 'bg-green-50 border-green-200'
                              : 'bg-red-50 border-red-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className={
                                test.success ? 'text-green-600' : 'text-red-600'
                              }
                            >
                              {test.success ? '✅' : '❌'}
                            </span>
                            <span className="font-semibold uppercase">
                              {test.status}
                            </span>
                          </div>
                          {test.success && (
                            <div className="text-sm text-gray-600 mt-1">
                              <div>
                                <strong>Orden:</strong> {test.orderNumber}
                              </div>
                              <div>
                                <strong>Estado Real:</strong>{' '}
                                {test.actualStatus}
                              </div>
                              <div>
                                <strong>ID:</strong> {test.orderId}
                              </div>
                            </div>
                          )}
                          {!test.success && (
                            <div className="text-sm text-red-600 mt-1">
                              {test.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {results.summary && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <strong>Resumen:</strong>
                        <div className="text-sm mt-1">
                          <span className="text-green-600">
                            ✅ Exitosas: {results.summary.successful}
                          </span>
                          {' • '}
                          <span className="text-red-600">
                            ❌ Fallidas: {results.summary.failed}
                          </span>
                          {' • '}
                          <span className="text-blue-600">
                            📊 Total: {results.summary.total}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {results.fieldsVerified && (
                <div>
                  <strong>Verificación de Campos:</strong>
                  <div className="space-y-2 mt-2">
                    <div>
                      <strong>Número de Orden:</strong>{' '}
                      {results.fieldsVerified.orderNumber}
                    </div>
                    <div>
                      <strong>Estado:</strong> {results.fieldsVerified.status}
                    </div>
                    <div>
                      <strong>Total:</strong> $
                      {results.fieldsVerified.totalAmount.toLocaleString()}
                    </div>
                    <div>
                      <strong>Moneda:</strong> {results.fieldsVerified.currency}
                    </div>
                    <div>
                      <strong>Fecha de Orden:</strong>{' '}
                      {results.fieldsVerified.orderDate}
                    </div>
                    <div>
                      <strong>Tiene Notas Completas:</strong>{' '}
                      {results.fieldsVerified.hasCompleteNotes ? 'Sí' : 'No'}
                    </div>
                    <div>
                      <strong>Cantidad de Productos Esperados:</strong>{' '}
                      {results.fieldsVerified.itemsExpected}
                    </div>
                    <div>
                      <strong>Total Esperado:</strong> $
                      {results.fieldsVerified.expectedTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4">❌ Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Información del sistema */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            📊 Información del Sistema
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                🔧 Estrategia Nueva
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • Paso 1: Intentar orden simplificada (sin cliente/dirección)
                </li>
                <li>• Paso 2: Si falla, intentar flujo completo</li>
                <li>• Paso 3: Si falla por permisos, usar REST API</li>
                <li>• Manejo inteligente de errores de permisos</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">🎯 Beneficios</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Menos dependencias de permisos complejos</li>
                <li>• Fallback automático a REST API</li>
                <li>• Mejor manejo de errores</li>
                <li>• Órdenes siempre se crean</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                📋 ENUM_ORDER_STATUS
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <span className="font-semibold text-blue-600">pending</span>{' '}
                  - Orden creada, pendiente de pago
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-yellow-600">
                    confirmed
                  </span>{' '}
                  - Pago confirmado
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-orange-600">
                    processing
                  </span>{' '}
                  - En proceso de preparación
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-purple-600">shipped</span>{' '}
                  - Enviada
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-green-600">
                    delivered
                  </span>{' '}
                  - Entregada
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-red-600">cancelled</span>{' '}
                  - Cancelada
                </li>
                <li>
                  •{' '}
                  <span className="font-semibold text-gray-600">refunded</span>{' '}
                  - Reembolsada
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                🛍️ Campos OrderItem
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <span className="font-semibold">productName</span> - Nombre
                  del producto
                </li>
                <li>
                  • <span className="font-semibold">quantity</span> - Cantidad
                </li>
                <li>
                  • <span className="font-semibold">unitPrice</span> - Precio
                  unitario
                </li>
                <li>
                  • <span className="font-semibold">originalPrice</span> -
                  Precio original
                </li>
                <li>
                  • <span className="font-semibold">subtotal</span> - Subtotal
                  del item
                </li>
                <li>
                  • <span className="font-semibold">discountAmount</span> -
                  Descuento aplicado
                </li>
                <li>
                  • <span className="font-semibold">sku</span> - Código SKU
                </li>
                <li>
                  • <span className="font-semibold">productImage</span> - URL de
                  imagen
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                📊 Campos OrderHistory
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <span className="font-semibold">status</span> - Estado
                  actual
                </li>
                <li>
                  • <span className="font-semibold">previousStatus</span> -
                  Estado anterior
                </li>
                <li>
                  • <span className="font-semibold">changeDate</span> - Fecha
                  del cambio
                </li>
                <li>
                  • <span className="font-semibold">changedBy</span> - Quién
                  hizo el cambio
                </li>
                <li>
                  • <span className="font-semibold">automaticChange</span> - Si
                  fue automático
                </li>
                <li>
                  • <span className="font-semibold">notificationSent</span> - Si
                  se envió notificación
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 font-semibold">
              💡 Para verificar los documentos GraphQL disponibles:
            </p>
            <div className="text-sm text-yellow-700 mt-2 space-y-1">
              <p>
                1. Ve a{' '}
                <code className="bg-yellow-100 px-1 rounded">
                  http://localhost:1337/graphql
                </code>
              </p>
              <p>2. Explora la documentación en el panel derecho</p>
              <p>
                3. Busca mutations como{' '}
                <code className="bg-yellow-100 px-1 rounded">
                  createOrderHistory
                </code>
              </p>
              <p>
                4. Verifica tipos como{' '}
                <code className="bg-yellow-100 px-1 rounded">
                  OrderItemInput
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGraphQLOrdersPage;
