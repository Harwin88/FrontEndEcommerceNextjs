// src/graphql/client.ts
import { createClient, cacheExchange, fetchExchange } from '@urql/core';  // Importa desde @urql/core
 // Imprime la URL de la API de GraphQL

 // Cargar las variables de entorno

 const API_URL: string = process.env.NEXT_PUBLIC_API_URL;  // Concatenación con comillas dobles

const client = createClient({
  url: API_URL ,  // URL de la API de GraphQL
  exchanges: [cacheExchange, fetchExchange], // Configura los intercambios
  fetchOptions: {
    
    headers: {
      "Content-Type": "application/json", // Asegúrate de tener los encabezados correctos
    },
  },
});

export default client;
