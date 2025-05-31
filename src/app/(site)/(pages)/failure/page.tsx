'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const FailurePage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    console.log('🚫 Pago falló:', {
      paymentId,
      status,
      searchParams: Object.fromEntries(searchParams.entries())
    });
  }, [searchParams]);

  const handleRetry = () => {
    router.push('/checkout');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-red-600"
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

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pago No Completado
        </h1>

        <p className="text-gray-600 mb-6">
          Hubo un problema al procesar tu pago. No te preocupes, no se realizó ningún cargo.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Intentar de Nuevo
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Volver al Inicio
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>¿Necesitas ayuda? Contáctanos:</p>
          <p>📧 soporte@tutienda.com</p>
          <p>📞 +57 (1) 234-5678</p>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
