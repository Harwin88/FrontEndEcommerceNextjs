'use client';

import { useAppSelector } from '@/hooks/redux';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { selectCartItems, selectTotalPrice } from '@/redux/slices/cartSlice';
import React, { useState } from 'react';

interface CheckoutWithOrdersProps {
  onSuccess?: (orderId: string) => void;
  onCancel?: () => void;
}

const CheckoutWithOrders: React.FC<CheckoutWithOrdersProps> = ({
  onSuccess,
  onCancel,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const { createOrder, loading, error, success, reset } = useCreateOrder();

  const [step, setStep] = useState<
    'customer' | 'shipping' | 'review' | 'success'
  >('customer');
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'CO',
    phone: '',
    email: '',
  });

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerData.firstName && customerData.lastName && customerData.email) {
      // Pre-llenar datos de envío con datos del cliente
      setShippingData((prev) => ({
        ...prev,
        firstName: prev.firstName || customerData.firstName,
        lastName: prev.lastName || customerData.lastName,
        email: prev.email || customerData.email,
        phone: prev.phone || customerData.phone,
      }));
      setStep('shipping');
    }
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shippingData.addressLine1 && shippingData.city && shippingData.state) {
      setStep('review');
    }
  };

  const handleCreateOrder = async () => {
    try {
      const order = await createOrder(customerData, shippingData);
      console.log('✅ Orden creada con ID:', order.id);
      setStep('success');
      if (onSuccess) {
        onSuccess(order.id);
      }
    } catch (error) {
      console.error('❌ Error al crear orden:', error);
    }
  };

  // Si no hay items en el carrito
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Carrito Vacío</h2>
        <p className="text-gray-600 mb-4">No tienes productos en tu carrito.</p>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Ir de Compras
        </button>
      </div>
    );
  }

  // Paso 1: Información del Cliente
  if (step === 'customer') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Información del Cliente</h2>

        <form onSubmit={handleCustomerSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre *</label>
              <input
                type="text"
                required
                value={customerData.firstName}
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Apellido *
              </label>
              <input
                type="text"
                required
                value={customerData.lastName}
                onChange={(e) =>
                  setCustomerData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              value={customerData.email}
              onChange={(e) =>
                setCustomerData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Teléfono</label>
            <input
              type="tel"
              value={customerData.phone}
              onChange={(e) =>
                setCustomerData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continuar a Envío
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Paso 2: Información de Envío
  if (step === 'shipping') {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Información de Envío</h2>

        <form onSubmit={handleShippingSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre *</label>
              <input
                type="text"
                required
                value={shippingData.firstName}
                onChange={(e) =>
                  setShippingData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Apellido *
              </label>
              <input
                type="text"
                required
                value={shippingData.lastName}
                onChange={(e) =>
                  setShippingData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Dirección *
            </label>
            <input
              type="text"
              required
              value={shippingData.addressLine1}
              onChange={(e) =>
                setShippingData((prev) => ({
                  ...prev,
                  addressLine1: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Calle 123 # 45-67"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Apartamento, suite, etc.
            </label>
            <input
              type="text"
              value={shippingData.addressLine2}
              onChange={(e) =>
                setShippingData((prev) => ({
                  ...prev,
                  addressLine2: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Apto 101"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ciudad *</label>
              <input
                type="text"
                required
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData((prev) => ({ ...prev, city: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Bogotá"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Departamento *
              </label>
              <input
                type="text"
                required
                value={shippingData.state}
                onChange={(e) =>
                  setShippingData((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Cundinamarca"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Código Postal
            </label>
            <input
              type="text"
              value={shippingData.postalCode}
              onChange={(e) =>
                setShippingData((prev) => ({
                  ...prev,
                  postalCode: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="110111"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep('customer')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Volver
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Revisar Orden
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Paso 3: Revisión de la Orden
  if (step === 'review') {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Revisar Orden</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Información del Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cliente</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
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

          {/* Información de Envío */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Envío</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <strong>Nombre:</strong> {shippingData.firstName}{' '}
                {shippingData.lastName}
              </p>
              <p>
                <strong>Dirección:</strong> {shippingData.addressLine1}
              </p>
              {shippingData.addressLine2 && <p>{shippingData.addressLine2}</p>}
              <p>
                <strong>Ciudad:</strong> {shippingData.city},{' '}
                {shippingData.state}
              </p>
              {shippingData.postalCode && (
                <p>
                  <strong>Código Postal:</strong> {shippingData.postalCode}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Productos ({cartItems.length} items)
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
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
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
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

        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep('shipping')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Volver a Envío
          </button>
          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
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
              'Crear Orden'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Paso 4: Éxito
  if (step === 'success' || success) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
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
        <p className="text-gray-600 mb-6">
          Tu orden ha sido procesada y pronto recibirás un email de
          confirmación.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              reset();
              setStep('customer');
              if (onCancel) onCancel();
            }}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Nueva Orden
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Ir de Compras
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default CheckoutWithOrders;
