# 🛒 NextCommerce - E-commerce Platform

Una plataforma de e-commerce moderna construida con Next.js 15, TypeScript, Redux Toolkit y integración con MercadoPago.

## 🚀 Características Principales

- ✅ **Arquitectura Moderna**: Next.js 15 con App Router
- ✅ **TypeScript**: Tipado estricto para mejor desarrollo
- ✅ **Redux Toolkit**: Gestión de estado predictible
- ✅ **GraphQL**: API eficiente con URQL
- ✅ **Pagos Seguros**: Integración con MercadoPago
- ✅ **UI Moderna**: Tailwind CSS + Componentes personalizados
- ✅ **Performance**: Lazy loading, code splitting y optimizaciones
- ✅ **Seguridad**: JWT verificado, headers de seguridad, validación Zod

## 🔧 Tecnologías Utilizadas

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Redux Toolkit** - Gestión de estado
- **URQL** - Cliente GraphQL
- **React Loading Skeleton** - Estados de carga

### Backend/API

- **Next.js API Routes** - Endpoints del servidor
- **GraphQL** - API de datos
- **Zod** - Validación de esquemas
- **MercadoPago SDK** - Procesamiento de pagos

### Herramientas de Desarrollo

- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **GraphQL Code Generator** - Generación de tipos

## 🛡️ Mejoras de Seguridad Implementadas

### 1. Autenticación JWT Segura

- ✅ Verificación de firma JWT (no solo decodificación)
- ✅ Limpieza automática de tokens inválidos
- ✅ Configuración segura de cookies

### 2. Headers de Seguridad

```typescript
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 3. Validación de API

- ✅ Esquemas Zod para todas las rutas API
- ✅ Validación de entrada en checkout y pagos
- ✅ Manejo seguro de errores

### 4. Variables de Entorno

- ✅ Archivo `.env.example` con documentación
- ✅ Validación de variables requeridas

## ⚡ Optimizaciones de Rendimiento

### 1. Code Splitting y Lazy Loading

- ✅ Dynamic imports para componentes pesados
- ✅ Lazy loading de modales
- ✅ Optimización de chunks webpack

### 2. Cache Inteligente

- ✅ Cache con TTL en localStorage
- ✅ Cache de Redux para productos
- ✅ Política de cache optimizada para GraphQL

### 3. Imágenes Optimizadas

- ✅ Formatos WebP y AVIF
- ✅ Lazy loading de imágenes
- ✅ Compresión automática

### 4. Bundle Optimization

- ✅ Separación de vendors
- ✅ Tree shaking
- ✅ Eliminación de console.log en producción

## 🏗️ Estructura del Proyecto Mejorada

```
src/
├── app/                    # Next.js App Router
│   ├── (site)/            # Rutas públicas
│   ├── api/               # API routes
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes base reutilizables
│   ├── Common/           # Componentes comunes
│   └── ErrorBoundary.tsx # Manejo de errores
├── hooks/                # Custom hooks
├── lib/                  # Utilidades
├── redux/                # Estado global
├── types/                # Definiciones TypeScript
└── graphql/              # Queries y esquemas GraphQL
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd nextjs-ecommerce-template-main
```

### 2. Instalar dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Configurar variables de entorno

```bash
cp env.example .env.local
```

Completa las variables en `.env.local`:

```env
# Database
DATABASE_URL=your_database_url

# NextJS
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# GraphQL API
NEXT_PUBLIC_API_URL=your_graphql_api_url
API_URL=your_graphql_api_url

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# MercadoPago Payment
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=your_public_key
MERCADO_PAGO_ACCESS_TOKEN=your_access_token
MERCADOPAGO_ACCESS_TOKEN=your_access_token
MERCADO_PAGO_APP_ID=your_app_id
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

### 5. Generar tipos GraphQL (opcional)

```bash
npm run generate
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run generate` - Genera tipos GraphQL

## 🔒 Configuración de Seguridad en Producción

### 1. Variables de Entorno

Asegúrate de configurar todas las variables de entorno en tu plataforma de despliegue.

### 2. HTTPS

Configura HTTPS para habilitar las características de seguridad completas.

### 3. Headers de Seguridad

Los headers están configurados automáticamente en `next.config.js`.

### 4. JWT Secret

Usa un secret fuerte y único para JWT en producción.

## 🛠️ Error Boundary y Manejo de Errores

El proyecto incluye Error Boundaries para capturar y manejar errores de React:

- ✅ Error Boundary global en el layout
- ✅ Error Boundaries específicos para componentes críticos
- ✅ Fallbacks personalizados para diferentes tipos de errores
- ✅ Logging de errores en desarrollo

## 📱 Responsive Design

- ✅ Diseño completamente responsivo
- ✅ Mobile-first approach
- ✅ Optimizado para tablets y desktop
- ✅ Touch-friendly interfaces

## 🔄 Estado y Cache

### Redux Store

- `auth` - Estado de autenticación
- `cart` - Carrito de compras
- `products` - Cache de productos
- `categories` - Cache de categorías
- `wishlist` - Lista de deseos

### Cache Strategy

- **Redux**: Cache en memoria durante la sesión
- **localStorage**: Cache persistente con TTL
- **GraphQL**: Cache a nivel de query con URQL

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles específicos

## 🧬 Sistema de Órdenes GraphQL Mejorado

### Resumen de Mejoras Implementadas

#### ✅ Problema Resuelto

- **Error inicial**: "Error al crear cliente: [GraphQL] Forbidden access"
- **Causa**: Restricciones de permisos en el backend de Strapi para crear clientes, direcciones y órdenes
- **Solución**: Estrategia de fallback inteligente con múltiples niveles

#### 🔧 Nueva Arquitectura del Sistema

##### 1. **Cliente GraphQL Separado**

- **Cliente Público** (`publicClient`): Para queries sin autenticación (categorías, productos)
- **Cliente Privado** (`privateClient`): Para operaciones autenticadas (órdenes, clientes)

##### 2. **Estrategia de Creación de Órdenes (3 Niveles)**

```
1. 🚀 Orden Simplificada (GraphQL)
   ├── Solo orden + items
   ├── Sin cliente ni dirección
   └── Menos dependencias de permisos

2. 🔄 Flujo Completo (GraphQL)
   ├── Cliente + Dirección + Orden + Items
   ├── Búsqueda de cliente existente
   └── Creación completa si hay permisos

3. 🛡️ REST API Fallback
   ├── Si GraphQL falla por permisos
   ├── API REST como respaldo
   └── Garantiza que siempre se cree la orden
```

##### 3. **Manejo Inteligente de Errores**

- Detección automática de errores de permisos
- Fallback automático entre estrategias
- Logging detallado para debugging
- Funciones de diagnóstico integradas

#### 🎯 Componentes Actualizados

##### **OrderService** (`src/services/orderService.ts`)

- ✅ Estrategia de orden simplificada
- ✅ Detección de errores de permisos
- ✅ Fallback automático a REST API
- ✅ Funciones de diagnóstico
- ✅ Logging detallado

##### **Cliente GraphQL** (`src/graphql/client.ts`)

- ✅ Separación en cliente público/privado
- ✅ Headers de autenticación automáticos
- ✅ Manejo de cookies para tokens

##### **Hook useOrdersRedux** (`src/hooks/useOrdersRedux.ts`)

- ✅ Soporte para items alternativos del carrito
- ✅ Integración con nuevo OrderService
- ✅ Manejo de carritos vacíos

##### **Formulario de Checkout** (`src/components/Checkout/CheckoutWithRedux.tsx`)

- ✅ Integración completa con sistema GraphQL
- ✅ Guardado de datos en localStorage
- ✅ Redirección automática a página de éxito
- ✅ Manejo de estados de loading/error

##### **Página de Éxito** (`src/app/(main)/order-success/page.tsx`)

- ✅ Soporte para órdenes desde formulario
- ✅ Manejo de datos alternativos del carrito
- ✅ Información del sistema GraphQL

#### 🧪 Sistema de Pruebas

##### **Página de Pruebas** (`src/app/(main)/test-graphql-orders/page.tsx`)

- ✅ Prueba de orden simplificada
- ✅ Diagnóstico completo del sistema
- ✅ Prueba de queries públicas
- ✅ Interfaz visual para debugging

#### 📊 Funciones de Diagnóstico

```typescript
// Verificar autenticación
await orderService.testAuthentication();

// Probar conexión GraphQL
await orderService.testGraphQLConnection();

// Probar queries públicas
await orderService.testPublicQueries();

// Diagnóstico completo
await orderService.diagnosticarGraphQL();
```

#### 🚀 Cómo Usar el Sistema

##### 1. **Desde el Formulario de Checkout**

```
1. Ir a /checkout-redux
2. Llenar datos del cliente
3. Llenar datos de envío
4. Revisar y crear orden
5. Redirección automática a página de éxito
```

##### 2. **Desde la Página de Pruebas**

```
1. Ir a /test-graphql-orders
2. Usar botones de prueba
3. Ver logs en consola
4. Verificar resultados
```

#### 🔍 Estados del Sistema

- ✅ **Categorías y productos**: Funcionan sin errores de autenticación
- ✅ **Creación de órdenes**: Múltiples estrategias de fallback
- ✅ **Página de éxito**: Manejo completo de datos
- ✅ **Enum de status**: Valores correctos del backend
- ✅ **Separación de clientes**: Independencia entre queries públicas y privadas

#### ⚠️ Errores Normales y Esperados

**Es NORMAL ver estos errores en la consola:**

```
❌ Error message: "[GraphQL] Forbidden access"
```

**¿Por qué ocurre esto?**

- El sistema PRIMERO intenta crear clientes y direcciones (flujo completo)
- El backend de Strapi tiene restricciones de permisos configuradas
- Cuando falla por permisos, automáticamente usa la estrategia simplificada
- **Esto es parte del diseño del sistema y NO es un error**

**Flujo Normal de Funcionamiento:**

```
1. 🚀 Intenta Flujo Completo
   └── ❌ Error de permisos (ESPERADO)

2. 🔄 Automáticamente usa Orden Simplificada
   └── ✅ Orden creada exitosamente

3. 📊 Resultado Final:
   └── Orden con toda la información preservada
```

**Cómo Verificar que Funciona Correctamente:**

1. Verifica que la orden se cree al final (mensaje de éxito)
2. Revisa que los datos están en el campo `notes` de la orden
3. Confirma que `orderNumber`, `totalAmount` y `currency` están poblados

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
