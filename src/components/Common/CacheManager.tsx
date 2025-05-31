'use client';
import { useCartManager } from '@/hooks/useCartManager';
import React, { useEffect } from 'react';

interface CacheManagerProps {
  children: React.ReactNode;
}

/**
 * 🧹 Componente que maneja la limpieza automática de datos obsoletos
 * Se ejecuta al cargar la aplicación para limpiar datos antiguos
 */
const CacheManager: React.FC<CacheManagerProps> = ({ children }) => {
  const { detectStaleCart, clearStaleData, isCheckoutComplete } =
    useCartManager();

  useEffect(() => {
    const cleanupStaleData = () => {
      try {
        // Detectar y limpiar carrito obsoleto
        if (detectStaleCart()) {
          console.log(
            '🧹 CacheManager: Detectado carrito obsoleto (>24h), limpiando...'
          );
          clearStaleData();
        }

        // Si el checkout fue completado, asegurar que todo esté limpio
        if (isCheckoutComplete) {
          console.log(
            '🧹 CacheManager: Checkout completado detectado, verificando limpieza...'
          );

          // Limpiar datos específicos que podrían quedar
          const keysToCheck = [
            'checkout_cart_data',
            'checkout_customer_data',
            'checkout_shipping_data',
            'mercadopago_preference_id',
          ];

          keysToCheck.forEach((key) => {
            if (localStorage.getItem(key)) {
              localStorage.removeItem(key);
              console.log(`🧹 CacheManager: Limpiado ${key} residual`);
            }
          });
        }

        // Limpiar datos temporales de sesiones anteriores
        const tempKeys = [
          'temp_order_data',
          'temp_payment_data',
          'debug_order_info',
          'test_order_result',
        ];

        tempKeys.forEach((key) => {
          if (localStorage.getItem(key) || sessionStorage.getItem(key)) {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.warn('⚠️ CacheManager: Error durante limpieza:', error);
      }
    };

    // Ejecutar limpieza inmediata
    cleanupStaleData();

    // Configurar limpieza periódica cada 30 minutos
    const interval = setInterval(cleanupStaleData, 30 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [detectStaleCart, clearStaleData, isCheckoutComplete]);

  return <>{children}</>;
};

export default CacheManager;
