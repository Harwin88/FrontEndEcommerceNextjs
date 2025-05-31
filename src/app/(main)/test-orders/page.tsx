import React from 'react';
import CheckoutWithOrders from '@/components/Checkout/CheckoutWithOrders';

const TestOrdersPage: React.FC = () => {
  const handleOrderSuccess = (orderId: string) => {
    console.log('✅ Orden creada con ID:', orderId);
    alert(`¡Orden creada exitosamente! ID: ${orderId}`);
  };

  const handleCancel = () => {
    console.log('🚫 Checkout cancelado');
    // En una app real, esto redirigiría a la página de productos
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛒 Prueba del Sistema de Órdenes
          </h1>
          <p className="text-gray-600">
            Esta página permite probar la creación de órdenes desde el carrito
          </p>
        </div>

        <CheckoutWithOrders
          onSuccess={handleOrderSuccess}
          onCancel={handleCancel}
        />

        {/* Información de Debug */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              📝 Información de Debug
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  Funcionalidades Integradas:
                </h4>
                <ul className="space-y-1 text-blue-700">
                  <li>✅ Carrito Redux funcional</li>
                  <li>✅ Hook useCreateOrder personalizado</li>
                  <li>✅ OrderService con REST API</li>
                  <li>✅ Validación de datos completa</li>
                  <li>✅ Manejo de errores robusto</li>
                  <li>✅ Limpieza automática del carrito</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">
                  APIs Disponibles:
                </h4>
                <ul className="space-y-1 text-blue-700">
                  <li>🔗 POST /api/orders - Crear orden</li>
                  <li>🔗 GET /api/orders - Listar órdenes</li>
                  <li>🔗 POST /api/process_payment - Pagos</li>
                  <li>🔗 POST /api/create_preference - MercadoPago</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded border">
              <h4 className="font-medium text-gray-800 mb-2">
                🧪 Para probar:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                <li>Agrega productos al carrito desde cualquier página</li>
                <li>Vuelve a esta página para procesar la orden</li>
                <li>Completa los pasos del checkout</li>
                <li>
                  Revisa los logs del navegador para ver el flujo completo
                </li>
                <li>Verifica que el carrito se limpia después del éxito</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOrdersPage;
