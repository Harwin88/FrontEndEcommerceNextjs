// Script simple para probar token de Strapi
require('dotenv').config({ path: '.env.local' });

async function testToken() {
  console.log('🔍 ===== PRUEBA SIMPLE DE TOKEN =====');

  const token = process.env.STRAPI_API_TOKEN;
  console.log('🔑 Token encontrado:', token ? 'SÍ (longitud: ' + token.length + ')' : 'NO');

  if (!token) {
    console.log('❌ STRAPI_API_TOKEN no encontrado en .env.local');
    return;
  }

  // Usar la URL correcta de Strapi
  const strapiUrl = 'https://strapi.harwinclick.com/graphql';
  console.log('📡 Probando:', strapiUrl);

  try {
    const query = `
      mutation {
        createCliente(data: {
          firstName: "Test"
          lastName: "Simple"
          email: "test-simple-${Date.now()}@test.com"
          phone: "123456789"
          isActive: true
          registrationDate: "${new Date().toISOString()}"
          publishedAt: "${new Date().toISOString()}"
        }) {
          documentId
          firstName
          lastName
        }
      }
    `;

    console.log('📤 Enviando mutación...');

    const response = await fetch(strapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });

    console.log('📊 Status HTTP:', response.status);

    const result = await response.json();
    console.log('📊 Respuesta completa:', JSON.stringify(result, null, 2));

    if (result.errors) {
      console.log('❌ ERRORES ENCONTRADOS:');
      result.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.message}`);
        if (error.extensions) {
          console.log(`      Código: ${error.extensions.code}`);
        }
      });

      // Analizar tipo de error
      const errorMsg = result.errors[0]?.message || '';
      if (errorMsg.includes('Forbidden') || errorMsg.includes('forbidden')) {
        console.log('💡 DIAGNÓSTICO: Token sin permisos suficientes');
        console.log('🔧 SOLUCIÓN: Cambiar token a "Full Access" en Strapi Admin');
      } else if (errorMsg.includes('Unauthorized') || errorMsg.includes('unauthorized')) {
        console.log('💡 DIAGNÓSTICO: Token inválido o expirado');
        console.log('🔧 SOLUCIÓN: Generar nuevo token en Strapi Admin');
      } else if (errorMsg.includes('Internal Server Error')) {
        console.log('💡 DIAGNÓSTICO: Error interno del servidor (posiblemente permisos)');
        console.log('🔧 SOLUCIÓN: Verificar permisos del token en Strapi Admin');
      }
    } else if (result.data?.createCliente) {
      console.log('✅ ¡TOKEN FUNCIONA CORRECTAMENTE!');
      console.log('✅ Cliente creado:', result.data.createCliente.documentId);
    } else {
      console.log('⚠️ Respuesta inesperada');
    }

  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }
}

testToken();
