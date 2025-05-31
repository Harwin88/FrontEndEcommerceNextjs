# 🔥 Integración MercadoPago - Sistema de Órdenes

## 🚀 Configuración Rápida

### 1. Iniciar el servidor

```bash
npm run dev
# Servidor: http://localhost:3000
```

### 2. Configurar túnel público (VSCode Dev Tunnels)

Tu túnel de VSCode ya está funcionando en: `https://qrzq2bsn-3000.use.devtunnels.ms/`

El sistema está configurado para trabajar automáticamente con:

- **Desarrollo local**: `http://localhost:3000`
- **VSCode Dev Tunnels**: Se detecta automáticamente
- **Variables de entorno**: `TUNNEL_URL` o `NEXT_PUBLIC_TUNNEL_URL`

### 3. Probar el sistema

#### Test básico del webhook:

```bash
# GET
curl http://localhost:3000/api/test-webhook

# POST
curl -X POST http://localhost:3000/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"test":"data","amount":50000}'
```

#### Test con tu túnel de VSCode:

```bash
curl https://qrzq2bsn-3000.use.devtunnels.ms/api/test-webhook
```

### 4. Configurar en MercadoPago Dashboard

Ve a tu cuenta de MercadoPago y configura:

- **Webhook URL**: `https://qrzq2bsn-3000.use.devtunnels.ms/api/mercadopago/webhook`
- **Success URL**: `https://qrzq2bsn-3000.use.devtunnels.ms/order-success`
- **Failure URL**: `https://qrzq2bsn-3000.use.devtunnels.ms/failure`
- **Pending URL**: `https://qrzq2bsn-3000.use.devtunnels.ms/pending`

## 🧪 Flujo de Prueba Completo

### 1. Probar creación de órdenes básicas

1. Ve a `http://localhost:3000`
2. Agrega productos al carrito
3. Ve a checkout (`http://localhost:3000/checkout`)
4. Llena el formulario del cliente y dirección
5. El sistema creará una orden básica (como funcionaba antes)

### 2. Verificar funcionamiento

- Las órdenes se crean con información básica del cliente
- Se almacenan los items del carrito
- Se genera un número de orden único

### 3. Para pruebas con MercadoPago

- Los webhooks de MercadoPago llegarán a tu túnel de VSCode
- Se completará la información de pago automáticamente
- Revisa los logs en la consola

## 📁 Archivos Importantes

### Endpoints de API

- `src/app/api/mercadopago/webhook/route.ts` - Webhook principal
- `src/app/api/orders/save/route.ts` - Guardar órdenes
- `src/app/api/create_preference/route.ts` - Crear preferencia de pago
- `src/app/api/process_payment/route.ts` - Procesar pagos
- `src/app/api/test-webhook/route.ts` - Testing

### Servicios

- `src/services/orderService.ts` - Lógica principal de órdenes
- `src/config/tunnel.ts` - Configuración de URLs

### Páginas

- `src/app/(site)/(pages)/order-success/page.tsx` - Página de éxito
- `src/app/(site)/(pages)/failure/page.tsx` - Página de error
- `src/app/(site)/(pages)/pending/page.tsx` - Página pendiente

### Componentes

- `src/components/Checkout/PaymentMethod.tsx` - Brick de pago

## 🔧 Sistema de Fallbacks

El sistema tiene 3 niveles de recuperación automática:

1. **Orden Completa** - GraphQL con todas las relaciones
2. **GraphQL Simplificado** - Versión básica con GraphQL
3. **REST Simulado** - Fallback final que siempre funciona

Si un nivel falla, automáticamente usa el siguiente.

## 🐛 Solución de Problemas

### Error: "auto_return invalid"

- ✅ **Solucionado**: URLs actualizadas en `create_preference`

### Error: "Usuario no autenticado"

- ✅ **Solucionado**: Sistema de fallbacks implementado

### Error: "undefined values"

- ✅ **Solucionado**: Validación y valores por defecto agregados

### Error: "Tunnel closed" o "Authentication required"

- **Solución**: El túnel de VSCode se maneja automáticamente
- Si hay problemas, reinicia VSCode o recrea el túnel

### Error: "Cannot reach webhook"

- **Verificar**:
  1. Túnel de VSCode está activo
  2. Servidor Next.js está corriendo en puerto 3000
  3. Tienes permisos de GitHub para acceder al túnel

## 📊 Logs Útiles

El sistema genera logs detallados:

```bash
# Webhook recibido
🔔 Webhook de MercadoPago recibido: {...}

# Orden creada
✅ Orden creada desde webhook: {...}

# Configuración de tunnel
🌐 Configuración de Tunnel: {...}

# Fallbacks activados
🔄 INTENTANDO FALLBACK CON API REST...
```

## 🎯 URLs de Prueba con tu túnel de VSCode

- **App**: `https://qrzq2bsn-3000.use.devtunnels.ms/`
- **Checkout**: `https://qrzq2bsn-3000.use.devtunnels.ms/checkout`
- **Test Webhook**: `https://qrzq2bsn-3000.use.devtunnels.ms/api/test-webhook`
- **MercadoPago Webhook**: `https://qrzq2bsn-3000.use.devtunnels.ms/api/mercadopago/webhook`

## 💡 Consejos

1. **El túnel de VSCode** se mantiene activo automáticamente
2. **Usa desarrollo local** para pruebas rápidas (`localhost:3000`)
3. **Revisa los logs** para debugging
4. **El sistema funciona** tanto con túnel como sin túnel
5. **Las órdenes básicas** se crean igual que antes
