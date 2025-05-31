import React from 'react';
import Link from 'next/link';

interface AuthRequiredProps {
  message?: string;
  redirectUrl?: string;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({
  message = 'Necesitas iniciar sesión para acceder a esta función',
  redirectUrl = '/signin',
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-2">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-1 p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Acceso Restringido
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="space-y-3">
          <Link
            href={redirectUrl}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Iniciar Sesión
          </Link>

          <Link
            href="/signup"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
          >
            Crear Cuenta
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition duration-200"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthRequired;
