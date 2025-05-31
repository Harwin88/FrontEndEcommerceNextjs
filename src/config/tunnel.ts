// Configuración dinámica para URLs de tunnel
export const getTunnelConfig = () => {
  // En desarrollo, usar la URL del tunnel de VSCode
  const isDevelopment = process.env.NODE_ENV === 'development';

  // URL base por defecto
  let baseUrl = 'http://localhost:3000';

  if (isDevelopment) {
    // Intentar leer URL desde variable de entorno
    const tunnelUrl =
      process.env.TUNNEL_URL || process.env.NEXT_PUBLIC_TUNNEL_URL;

    if (tunnelUrl) {
      baseUrl = tunnelUrl;
    } else {
      // Para MercadoPago, intentar usar el túnel conocido de VSCode
      // URL específica del túnel del usuario
      const vscodeDevTunnel = 'https://qrzq2bsn-3000.use.devtunnels.ms';

      // En desarrollo, usar el túnel público para back_urls de MercadoPago
      // pero mantener localhost para desarrollo local
      baseUrl = vscodeDevTunnel;
    }
  } else {
    // En producción, usar la URL real del sitio
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tudominio.com';
  }

  return {
    baseUrl,
    webhookUrl: `${baseUrl}/api/mercadopago/webhook`,
    successUrl: `${baseUrl}/order-success`,
    failureUrl: `${baseUrl}/failure`,
    pendingUrl: `${baseUrl}/pending`,
  };
};

// Configuración estática para usar en componentes
export const TUNNEL_CONFIG = getTunnelConfig();

// Helper para logs
export const logTunnelConfig = () => {
  const config = getTunnelConfig();
  console.log('🌐 Configuración de Tunnel:', config);
  console.log(
    '✅ Sistema configurado para funcionar con túnel de VSCode o localhost'
  );
  console.log(
    '🔧 Si usas VSCode Dev Tunnels, el sistema debería funcionar automáticamente'
  );
  return config;
};
