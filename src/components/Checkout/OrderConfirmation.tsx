import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectCartItems, selectTotalPrice } from '@/redux/slices/cartSlice';
import { useCreateOrder } from '@/hooks/useCreateOrder';

interface OrderConfirmationProps {
  customerData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  shippingData: {
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
  onOrderComplete: (orderId: string) => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  customerData,
  shippingData,
  onOrderComplete,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  // ✅ Usar el hook personalizado para crear órdenes
  const { createOrder, loading, error, success, reset } = useCreateOrder();

  const handleCreateOrder = async () => {
    try {
      reset(); // Limpiar estados previos

      console.log('🚀 Iniciando creación de orden con datos:', {
        customerData,
        shippingData,
        cartItems: cartItems.length,
        totalPrice,
      });

      const order = await createOrder(customerData, shippingData);

      console.log('✅ Orden completada, notificando componente padre');
      onOrderComplete(order.id);
    } catch (error: any) {
      console.error('❌ Error manejado por el componente:', error.message);
      // El error ya está manejado por el hook, no necesitamos hacer nada más
    }
  };

  // ✅ Mostrar mensaje de éxito
  if (success) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            ¡Orden Creada Exitosamente!
          </h2>
          <p className="text-gray-600">
            Tu orden ha sido procesada y está siendo preparada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Confirmar Orden</h2>

      {/* Resumen del cliente */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Información del Cliente</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p>
            <strong>Nombre:</strong> {customerData.firstName}{' '}
            {customerData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {customerData.email}
          </p>
          {customerData.phone && (
            <p>
              <strong>Teléfono:</strong> {customerData.phone}
            </p>
          )}
        </div>
      </div>

      {/* Resumen de envío */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Información de Envío</h3>
        <div className="bg-gray-50 p-4 rounded">
          <p>
            <strong>Dirección:</strong> {shippingData.addressLine1}
          </p>
          {shippingData.addressLine2 && <p>{shippingData.addressLine2}</p>}
          <p>
            <strong>Ciudad:</strong> {shippingData.city}, {shippingData.state}
          </p>
          {shippingData.postalCode && (
            <p>
              <strong>Código Postal:</strong> {shippingData.postalCode}
            </p>
          )}
        </div>
      </div>

      {/* Resumen de productos */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Productos ({cartItems.length} items)
        </h3>
        <div className="bg-gray-50 p-4 rounded">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-600">
                  Cantidad: {item.quantity} × $
                  {(item.discountedPrice || item.price).toLocaleString()}
                </p>
              </div>
              <p className="font-bold">
                $
                {(
                  (item.discountedPrice || item.price) * item.quantity
                ).toLocaleString()}
              </p>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
          <button
            onClick={reset}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Intentar nuevamente
          </button>
        </div>
      )}

      {/* Botón de confirmación */}
      <div className="flex justify-end">
        <button
          onClick={handleCreateOrder}
          disabled={loading || cartItems.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            loading || cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creando Orden...
            </div>
          ) : (
            'Confirmar Orden'
          )}
        </button>
      </div>

      {/* Información adicional */}
      {cartItems.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          <p>
            Tu carrito está vacío. Agrega productos antes de crear una orden.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
