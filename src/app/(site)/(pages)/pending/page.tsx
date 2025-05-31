'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const PendingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    console.log('⏳ Pago pendiente:', {
      paymentId,
      status,
      searchParams: Object.fromEntries(searchParams.entries()),
    });
  }, [searchParams]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleCheckStatus = () => {
    // Aquí podrías implementar una verificación del estado del pago
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.084 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Pago Pendiente
        </h1>

        <p className="text-gray-600 mb-6">
          Tu pago está siendo procesado. Recibirás una confirmación por email
          una vez que se complete.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800 mb-2">
            ¿Qué significa esto?
          </h3>
          <ul className="text-sm text-yellow-700 text-left space-y-1">
            <li>• El pago puede tardar hasta 24 horas en procesarse</li>
            <li>• Recibirás un email de confirmación</li>
            <li>• No necesitas hacer nada más</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCheckStatus}
            className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition duration-300"
          >
            Verificar Estado
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
          >
            Volver al Inicio
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>¿Tienes preguntas? Contáctanos:</p>
          <p>📧 soporte@tutienda.com</p>
          <p>📞 +57 (1) 234-5678</p>
        </div>
      </div>
    </div>
  );
};

export default PendingPage;
