// src/graphql/client.ts
import { createClient, cacheExchange, fetchExchange } from '@urql/core';  // Importa desde @urql/core

const client = createClient({
  url: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337/graphql',  // URL de la API de GraphQL
  exchanges: [cacheExchange, fetchExchange], // Configura los intercambios
  fetchOptions: {
    headers: {
      "Content-Type": "application/json", // Asegúrate de tener los encabezados correctos
    },
  },
});

export default client;
