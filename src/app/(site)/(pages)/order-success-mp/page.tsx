'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrderSuccessMPPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Extraer parámetros de MercadoPago
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');
        const merchantOrderId = searchParams.get('merchant_order_id');

        console.log('🎉 Retorno de MercadoPago detectado:', {
          paymentId,
          status,
          externalReference,
          merchantOrderId,
        });

        if (paymentId) {
          setResult(`¡Pago completado! ID: ${paymentId}, Estado: ${status}`);

          // Redirigir a la página principal de order-success con los parámetros
          setTimeout(() => {
            router.push(`/order-success?payment_id=${paymentId}&status=${status}&source=mercadopago_return`);
          }, 2000);
        } else {
          setResult('No se recibieron datos de pago válidos');
        }
      } catch (error) {
        console.error('Error procesando retorno de MercadoPago:', error);
        setResult('Error al procesar el retorno del pago');
      } finally {
        setLoading(false);
      }
    };

    processPaymentReturn();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Procesando retorno de MercadoPago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
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

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Procesando Pago
        </h1>

        <p className="text-gray-600 mb-4">{result}</p>

        <p className="text-sm text-gray-500">
          Redirigiendo automáticamente...
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessMPPage;
