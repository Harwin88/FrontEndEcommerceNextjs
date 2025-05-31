'use client';

import { useAppSelector } from '@/hooks/redux';
import { useOrdersRedux } from '@/hooks/useOrdersRedux';
import { selectCartItems, selectTotalPrice } from '@/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CheckoutFormData {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
  };
}

const CheckoutWithRedux: React.FC = () => {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  const {
    createOrderLoading,
    createOrderError,
    createOrderSuccess,
    lastCreatedOrderId,
    createOrder,
    reset,
    clearError,
    hasItems,
  } = useOrdersRedux();

  const [step, setStep] = useState<
    'customer' | 'shipping' | 'review' | 'success'
  >('customer');
  const [formData, setFormData] = useState<CheckoutFormData>({
    customer: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    shipping: {
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
    },
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ✅ Efecto para manejar éxito de creación de orden
  useEffect(() => {
    if (createOrderSuccess && lastCreatedOrderId) {
      console.log(
        '🎉 Orden creada exitosamente, redirigiendo a página de éxito...'
      );

      // Redirigir a la página de éxito con el ID de la orden
      const successUrl = `/order-success?order_id=${lastCreatedOrderId}&payment_method=checkout_form&source=checkout_redux`;

      console.log('🔄 Redirigiendo a:', successUrl);
      router.push(successUrl);
    }
  }, [createOrderSuccess, lastCreatedOrderId, router]);

  // ✅ Efecto para redirigir si el carrito está vacío
  useEffect(() => {
    if (!hasItems && step !== 'success') {
      router.push('/');
    }
  }, [hasItems, step, router]);

  const validateStep = (currentStep: string): boolean => {
    const errors: Record<string, string> = {};

    if (currentStep === 'customer') {
      if (!formData.customer.firstName.trim()) {
        errors.firstName = 'Nombre es requerido';
      }
      if (!formData.customer.lastName.trim()) {
        errors.lastName = 'Apellido es requerido';
      }
      if (!formData.customer.email.trim()) {
        errors.email = 'Email es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.customer.email)) {
        errors.email = 'Email inválido';
      }
      if (!formData.customer.phone.trim()) {
        errors.phone = 'Teléfono es requerido';
      }
    }

    if (currentStep === 'shipping') {
      if (!formData.shipping.firstName.trim()) {
        errors.shippingFirstName = 'Nombre es requerido';
      }
      if (!formData.shipping.lastName.trim()) {
        errors.shippingLastName = 'Apellido es requerido';
      }
      if (!formData.shipping.addressLine1.trim()) {
        errors.addressLine1 = 'Dirección es requerida';
      }
      if (!formData.shipping.city.trim()) {
        errors.city = 'Ciudad es requerida';
      }
      if (!formData.shipping.state.trim()) {
        errors.state = 'Estado/Departamento es requerido';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    section: 'customer' | 'shipping',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // ✅ Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 'customer' && validateStep('customer')) {
      // ✅ Auto-llenar datos de envío con datos del cliente
      setFormData((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          firstName: prev.customer.firstName,
          lastName: prev.customer.lastName,
          phone: prev.customer.phone,
          email: prev.customer.email,
        },
      }));
      setStep('shipping');
    } else if (step === 'shipping' && validateStep('shipping')) {
      setStep('review');
    }
  };

  const handlePrevStep = () => {
    if (step === 'shipping') {
      setStep('customer');
    } else if (step === 'review') {
      setStep('shipping');
    }
  };

  const handleCreateOrder = async () => {
    try {
      console.log('🚀 CheckoutWithRedux: Iniciando creación de orden...');

      // ✅ Guardar datos en localStorage para la página de éxito
      localStorage.setItem(
        'checkout_customer_data',
        JSON.stringify(formData.customer)
      );
      localStorage.setItem(
        'checkout_shipping_data',
        JSON.stringify(formData.shipping)
      );
      localStorage.setItem('checkout_cart_data', JSON.stringify(cartItems));

      console.log('💾 Datos guardados en localStorage para página de éxito');

      await createOrder(formData.customer, formData.shipping);

      console.log('✅ CheckoutWithRedux: Orden creada exitosamente');
    } catch (error: any) {
      console.error('❌ CheckoutWithRedux: Error al crear orden:', error);
    }
  };

  const handleStartOver = () => {
    reset();
    clearError();
    setStep('customer');
    setFormData({
      customer: { firstName: '', lastName: '', email: '', phone: '' },
      shipping: {
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
      },
    });
    setFormErrors({});
  };

  // ✅ Página de éxito
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Orden Creada!
            </h2>
            <p className="text-gray-600">
              Tu orden ha sido creada exitosamente con Redux + GraphQL
            </p>
          </div>

          {lastCreatedOrderId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600">ID de Orden:</p>
              <p className="font-mono text-sm font-semibold text-gray-900">
                {lastCreatedOrderId}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => router.push('/account/orders')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Ver Mis Órdenes
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Continuar Comprando
            </button>

            <button
              onClick={handleStartOver}
              className="w-full text-gray-500 text-sm hover:text-gray-700"
            >
              Crear Otra Orden
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout con Redux + GraphQL
          </h1>
          <p className="text-gray-600">
            Sistema de órdenes siguiendo el patrón de registro de usuarios
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {['customer', 'shipping', 'review'].map((stepName, index) => {
              const stepNumber = index + 1;
              const isActive = step === stepName;
              const isCompleted =
                ['customer', 'shipping', 'review'].indexOf(step) > index;

              return (
                <div key={stepName} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isCompleted ? '✓' : stepNumber}
                  </div>
                  <div className="ml-2 text-sm">
                    {stepName === 'customer'
                      ? 'Cliente'
                      : stepName === 'shipping'
                      ? 'Envío'
                      : 'Revisar'}
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario Principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Paso 1: Información del Cliente */}
              {step === 'customer' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Información del Cliente
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.customer.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            'customer',
                            'firstName',
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.firstName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="Ingresa tu nombre"
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={formData.customer.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            'customer',
                            'lastName',
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.lastName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="Ingresa tu apellido"
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.customer.email}
                        onChange={(e) =>
                          handleInputChange('customer', 'email', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.email
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={formData.customer.phone}
                        onChange={(e) =>
                          handleInputChange('customer', 'phone', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.phone
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="+57 300 123 4567"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleNextStep}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 2: Información de Envío */}
              {step === 'shipping' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Dirección de Envío</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            'shipping',
                            'firstName',
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.shippingFirstName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {formErrors.shippingFirstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.shippingFirstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            'shipping',
                            'lastName',
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.shippingLastName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {formErrors.shippingLastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.shippingLastName}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.addressLine1}
                        onChange={(e) =>
                          handleInputChange(
                            'shipping',
                            'addressLine1',
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.addressLine1
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="Calle, carrera, avenida"
                      />
                      {formErrors.addressLine1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.addressLine1}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complemento (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.addressLine2}
                        onChange={(e) =>
                          handleInputChange(
                            'shipping',
                            'addressLine2',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Apartamento, oficina, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.city}
                        onChange={(e) =>
                          handleInputChange('shipping', 'city', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Bogotá, Medellín, etc."
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado/Departamento *
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.state}
                        onChange={(e) =>
                          handleInputChange('shipping', 'state', e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          formErrors.state
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder="Cundinamarca, Antioquia, etc."
                      />
                      {formErrors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.postalCode}
                        onChange={(e) =>
                          handleInputChange(
                            'shipping',
                            'postalCode',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="110111"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.shipping.phone}
                        onChange={(e) =>
                          handleInputChange('shipping', 'phone', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handlePrevStep}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-semibold"
                    >
                      ← Atrás
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Revisar →
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Revisar Orden */}
              {step === 'review' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Revisar tu Orden</h2>

                  {/* Resumen de datos */}
                  <div className="space-y-6">
                    {/* Cliente */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Cliente
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formData.customer.firstName}{' '}
                        {formData.customer.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.customer.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.customer.phone}
                      </p>
                    </div>

                    {/* Envío */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Dirección de Envío
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formData.shipping.firstName}{' '}
                        {formData.shipping.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.shipping.addressLine1}
                      </p>
                      {formData.shipping.addressLine2 && (
                        <p className="text-sm text-gray-600">
                          {formData.shipping.addressLine2}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {formData.shipping.city}, {formData.shipping.state}{' '}
                        {formData.shipping.postalCode}
                      </p>
                    </div>

                    {/* Productos */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Productos ({cartItems.length})
                      </h3>
                      <div className="space-y-2">
                        {cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.title} x{item.quantity}
                            </span>
                            <span>
                              $
                              {(
                                (item.discountedPrice || item.price) *
                                item.quantity
                              ).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error de creación */}
                  {createOrderError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        ❌ {createOrderError}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={handlePrevStep}
                      disabled={createOrderLoading}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-semibold disabled:opacity-50"
                    >
                      ← Atrás
                    </button>
                    <button
                      onClick={handleCreateOrder}
                      disabled={createOrderLoading}
                      className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createOrderLoading ? 'Creando...' : 'Crear Orden'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar de Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-bold mb-4">Resumen del Pedido</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      $
                      {(
                        (item.discountedPrice || item.price) * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                <p>✅ Sistema Redux + GraphQL</p>
                <p>✅ Fallback REST API automático</p>
                <p>✅ Patrón de registro de usuarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutWithRedux;
