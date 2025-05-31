import { NextRequest, NextResponse } from 'next/server';

/**
 * Función para obtener token de cookies (simulada para servidor)
 */
function getTokenFromCookies(request: NextRequest): string | null {
  try {
    const authCookie =
      request.cookies.get('auth-token') ||
      request.cookies.get('token') ||
      request.cookies.get('jwt');
    return authCookie?.value || null;
  } catch (error) {
    return null;
  }
}

/**
 * Endpoint para mostrar información detallada sobre tokens disponibles
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 ===== ANÁLISIS DETALLADO DE TOKENS =====');

    // Obtener tokens
    const userToken = getTokenFromCookies(request);
    const serviceToken = process.env.STRAPI_API_TOKEN;

    // Información del token de usuario
    const userTokenInfo = userToken
      ? {
          available: true,
          source: 'Cookies del navegador (usuario autenticado)',
          length: userToken.length,
          preview: `${userToken.substring(0, 20)}...${userToken.substring(
            userToken.length - 10
          )}`,
          priority: 'ALTA',
          usage: 'Se usa SIEMPRE cuando está disponible',
          security: 'Alto - Permisos específicos del usuario',
        }
      : {
          available: false,
          reason: 'Usuario no autenticado o cookies no disponibles',
        };

    // Información del token de servicio
    const serviceTokenInfo = serviceToken
      ? {
          available: true,
          source: 'Variable de entorno STRAPI_API_TOKEN',
          length: serviceToken.length,
          preview: `${serviceToken.substring(0, 20)}...${serviceToken.substring(
            serviceToken.length - 10
          )}`,
          priority: userToken ? 'BAJA (fallback)' : 'ALTA (único disponible)',
          usage: 'Solo para webhooks cuando no hay token de usuario',
          security: 'Medio - Permisos de servicio completos',
          type: serviceToken.startsWith('sk_')
            ? 'Service Key'
            : serviceToken.startsWith('pk_')
            ? 'Public Key'
            : 'Token personalizado',
          validation: {
            lengthOk: serviceToken.length >= 32,
            formatOk: /^[a-zA-Z0-9_-]+$/.test(serviceToken),
          },
        }
      : {
          available: false,
          reason: 'Variable STRAPI_API_TOKEN no definida',
        };

    // Estrategia actual
    let currentStrategy = '';
    if (userToken) {
      currentStrategy =
        '🎯 USANDO: Token de usuario autenticado (PRIORIDAD ALTA)';
    } else if (serviceToken) {
      currentStrategy = '🎯 USANDO: Token de servicio (FALLBACK)';
    } else {
      currentStrategy = '⚠️ USANDO: Fallback REST (sin tokens)';
    }

    // Variables de entorno relacionadas con Strapi
    const strapiEnvVars = Object.keys(process.env)
      .filter((key) => key.includes('STRAPI'))
      .reduce((acc, key) => {
        acc[key] = process.env[key] ? 'DEFINIDA' : 'VACÍA';
        return acc;
      }, {} as Record<string, string>);

    const response = {
      timestamp: new Date().toISOString(),
      currentStrategy,
      tokens: {
        user: userTokenInfo,
        service: serviceTokenInfo,
      },
      environment: {
        strapiUrl:
          process.env.NEXT_PUBLIC_API_URL || 'https://strapi.harwinclick.com',
        strapiVariables: strapiEnvVars,
      },
      recommendations: {
        optimal: 'Tener usuario autenticado para usar su token específico',
        fallback:
          'Configurar STRAPI_API_TOKEN con permisos "Full Access" para webhooks',
        security: 'El token de usuario es más seguro que el token de servicio',
      },
    };

    console.log('📊 Información de tokens generada:', response);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error al obtener información de tokens:', error);

    return NextResponse.json(
      {
        error: 'Error al obtener información de tokens',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Endpoint POST para probar autenticación con diferentes tokens
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testType = 'user' } = body;

    console.log(`🧪 ===== PRUEBA DE TOKEN: ${testType.toUpperCase()} =====`);

    const userToken = getTokenFromCookies(request);
    const serviceToken = process.env.STRAPI_API_TOKEN;

    let testResult = {};

    if (testType === 'user' && userToken) {
      // Probar token de usuario
      try {
        const { GraphQLClient } = await import('graphql-request');
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'https://strapi.harwinclick.com';

        const client = new GraphQLClient(`${apiUrl}/graphql`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // Query simple para probar conectividad
        const query = `
          query {
            me {
              id
              username
              email
            }
          }
        `;

        const result = await client.request(query);

        testResult = {
          success: true,
          tokenType: 'user',
          tokenLength: userToken.length,
          result: result,
          message: 'Token de usuario funciona correctamente',
        };
      } catch (error: any) {
        testResult = {
          success: false,
          tokenType: 'user',
          error: error.message,
          message: 'Error con token de usuario',
        };
      }
    } else if (testType === 'service' && serviceToken) {
      // Probar token de servicio
      try {
        const { GraphQLClient } = await import('graphql-request');
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || 'https://strapi.harwinclick.com';

        const client = new GraphQLClient(`${apiUrl}/graphql`, {
          headers: {
            Authorization: `Bearer ${serviceToken}`,
          },
        });

        // Query simple para probar conectividad
        const query = `
          query {
            clientes(pagination: { limit: 1 }) {
              data {
                id
                documentId
              }
            }
          }
        `;

        const result = await client.request(query);

        testResult = {
          success: true,
          tokenType: 'service',
          tokenLength: serviceToken.length,
          result: result,
          message: 'Token de servicio funciona correctamente',
        };
      } catch (error: any) {
        testResult = {
          success: false,
          tokenType: 'service',
          error: error.message,
          message: 'Error con token de servicio',
        };
      }
    } else {
      testResult = {
        success: false,
        message: `Token ${testType} no disponible`,
        available: {
          user: !!userToken,
          service: !!serviceToken,
        },
      };
    }

    return NextResponse.json(
      {
        testType,
        timestamp: new Date().toISOString(),
        result: testResult,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error en prueba de token:', error);

    return NextResponse.json(
      {
        error: 'Error en prueba de token',
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
