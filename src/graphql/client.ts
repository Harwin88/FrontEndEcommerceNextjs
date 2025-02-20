// src/graphql/client.ts
import { createClient, cacheExchange, fetchExchange } from '@urql/core';  // Importa desde @urql/core
 // Imprime la URL de la API de GraphQL

 // Cargar las variables de entorno

 const API_URL: string = process.env.API_URL;  // Concatenación con comillas dobles
console.log("URL de la API de GraphQL:", API_URL);

const client = createClient({
  url: API_URL || "https://app-cms-graphql-1bfb73601929.herokuapp.com/graphql",  // URL de la API de GraphQL
  exchanges: [cacheExchange, fetchExchange], // Configura los intercambios
  fetchOptions: {
    
    headers: {
      "Content-Type": "application/json", // Asegúrate de tener los encabezados correctos
    },
  },
});

export default client;
