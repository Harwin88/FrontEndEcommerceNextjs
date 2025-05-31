// src/graphql/client.ts
import { cacheExchange, createClient, fetchExchange } from '@urql/core'; // Importa desde @urql/core
// Imprime la URL de la API de GraphQL

// Cargar las variables de entorno

const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || 'https://strapi.harwinclick.com/graphql';

// Cliente público (sin autenticación) - para queries como categorías, productos, etc.
const publicClient = createClient({
  url: API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

// Cliente privado (con autenticación) - para mutations y queries que requieren login
const privateClient = createClient({
  url: API_URL,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Agregar token de autenticación
    if (typeof window !== 'undefined') {
      // Intenta obtener el token desde localStorage primero
      let token: string | null = localStorage.getItem('token');
      if (!token) {
        // Si no está en localStorage, busca en cookies
        const match = document.cookie.match(/token=([^;]+)/);
        if (match && match[1]) {
          token = match[1];
        }
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return { headers };
  },
});

// Exportar el cliente público como default para mantener compatibilidad
export default publicClient;

// Exportar también el cliente privado para operaciones autenticadas
export { privateClient };
