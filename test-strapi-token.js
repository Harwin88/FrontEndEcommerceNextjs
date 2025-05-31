// Script de prueba para verificar token de Strapi
require('dotenv').config({ path: '.env.local' });

async function testStrapiToken() {
  console.log('🔍 ===== PRUEBA DE TOKEN DE STRAPI =====');

  const token = process.env.STRAPI_API_TOKEN;
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://strapi.harwinclick.com';

  console.log('🔑 Token encontrado:', token ? 'SÍ' : 'NO');
  console.log('🌐 API URL:', apiUrl);

  if (!token) {
    console.log('❌ No se encontró STRAPI_API_TOKEN en .env.local');
    return;
  }

  // Probar GraphQL endpoint - CORREGIR URL
  const graphqlUrl = `${apiUrl}/graphql`;
  console.log('📡 Probando GraphQL en:', graphqlUrl);

  try {
    // Prueba simple: obtener información del usuario del token
    const testQuery = `
      query {
        me {
          id
          username
          email
        }
      }
    `;

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: testQuery,
      }),
    });

    console.log('📊 Status:', response.status);

    if (response.status !== 200) {
      const text = await response.text();
      console.log('📊 Error Response:', text);
      return;
    }

    const result = await response.json();
    console.log('📊 Response:', JSON.stringify(result, null, 2));

    if (!result.errors) {
      console.log('✅ Token funciona correctamente');
    } else {
      console.log(
        '❌ Token tiene problemas:',
        result.errors?.[0]?.message || 'Error desconocido'
      );
    }
  } catch (error) {
    console.log('❌ Error al probar token:', error.message);
  }

  // Probar crear un cliente simple
  console.log('\n🧪 Probando crear cliente...');

  try {
    const createClienteQuery = `
      mutation {
        createCliente(data: {
          firstName: "Test"
          lastName: "Token"
          email: "test-token@test.com"
          phone: "123456789"
          isActive: true
          registrationDate: "${new Date().toISOString()}"
          publishedAt: "${new Date().toISOString()}"
        }) {
          documentId
          firstName
          lastName
          email
        }
      }
    `;

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: createClienteQuery,
      }),
    });

    console.log('📊 Create Cliente Status:', response.status);

    if (response.status !== 200) {
      const text = await response.text();
      console.log('📊 Create Cliente Error Response:', text);
      return;
    }

    const result = await response.json();
    console.log('📊 Create Cliente Response:', JSON.stringify(result, null, 2));

    if (!result.errors) {
      console.log('✅ Puede crear clientes - Token tiene permisos correctos');
    } else {
      console.log(
        '❌ No puede crear clientes:',
        result.errors?.[0]?.message || 'Error desconocido'
      );

      if (
        result.errors?.[0]?.message?.includes('Forbidden') ||
        result.errors?.[0]?.message?.includes('Unauthorized') ||
        result.errors?.[0]?.message?.includes('Internal Server Error')
      ) {
        console.log(
          '💡 SOLUCIÓN: El token necesita permisos "Full Access" en Strapi Admin'
        );
      }
    }
  } catch (error) {
    console.log('❌ Error al crear cliente:', error.message);
  }
}

testStrapiToken().catch(console.error);
