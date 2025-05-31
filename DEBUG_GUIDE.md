# 🐛 Guía Completa de Debugging

## 🚀 **Inicio Rápido**

### **1. Abrir VS Code**

```bash
code .
```

### **2. Instalar Extensiones Recomendadas**

- VS Code te sugerirá automáticamente las extensiones
- Clic en "Install All" cuando aparezca la notificación

### **3. Iniciar Debugging**

```bash
# Opción 1: Usar scripts npm
npm run debug

# Opción 2: Usar VS Code Task
Ctrl+Shift+P → "Tasks: Run Task" → "🚀 Start Development Server"

# Opción 3: Usar VS Code Debug
F5 → Seleccionar "🚀 Next.js: Debug Full Stack"
```

---

## 🔧 **Modos de Debugging**

### **🧬 GraphQL Orders Debug**

```bash
npm run debug:graphql
```

**Qué debuggear:**

- Mutaciones GraphQL (`CreateOrderDocument`, `CreateClienteDocument`)
- Cliente URQL
- Flujo de creación de órdenes
- Fallback a REST API

**Páginas de prueba:**

- `/test-graphql-orders` - Test específico de GraphQL
- `/checkout-redux` - Checkout completo

### **🛒 Orders System Debug**

```bash
npm run debug:orders
```

**Qué debuggear:**

- Redux state (ordersSlice)
- Hook `useOrdersRedux`
- Flujo completo de órdenes
- Estados de carga/error

### **💳 Payment System Debug**

```bash
npm run debug:payment
```

**Qué debuggear:**

- MercadoPago integration
- Payment processing
- Webhooks
- Success/failure flows

### **🔧 API Routes Debug**

```bash
npm run debug:api
```

**Qué debuggear:**

- `/api/create_preference`
- `/api/process_payment`
- `/api/orders/*`
- Middleware de autenticación

---

## 🎯 **Debugging por Componente**

### **Order Success Page**

**Problema común:** `Error: could not find react-redux context value`

**Debugging steps:**

1. Verificar que esté en ruta `(site)` con Provider
2. Comprobar layout hierarchy
3. Verificar Redux store configuration

```typescript
// En order-success/page.tsx
console.log('🔍 Redux Provider status:', store.getState());
```

### **Checkout Flow**

**Debugging típico:**

1. Estado del carrito
2. Validación de formularios
3. Integración con MercadoPago
4. Almacenamiento en localStorage

```typescript
// En checkout components
console.log('📦 Cart items:', cartItems);
console.log('💾 Stored data:', localStorage.getItem('checkout_customer_data'));
```

### **GraphQL Client**

**Debugging mutations:**

```typescript
const result = await client
  .mutation(CreateOrderDocument, variables)
  .toPromise();
console.log('🧬 GraphQL result:', result);
if (result.error) {
  console.error('❌ GraphQL error:', result.error);
}
```

---

## 🔍 **Herramientas de Debugging**

### **1. VS Code Debugger**

- **F5**: Iniciar debugging
- **F9**: Toggle breakpoint
- **F10**: Step over
- **F11**: Step into
- **Shift+F11**: Step out

### **2. Browser DevTools**

- **Redux DevTools**: Estado global
- **React DevTools**: Árbol de componentes
- **Network Tab**: Requests HTTP/GraphQL
- **Console**: Logs estructurados

### **3. Console Logs Estructurados**

```typescript
// ✅ Formato correcto según PROJECT_RULES.md
console.log('🚀 INFO: Operación iniciada');
console.log('📦 DATA: Datos procesados:', data);
console.log('✅ SUCCESS: Operación exitosa');
console.warn('⚠️ WARNING: Fallback ejecutado');
console.error('❌ ERROR: Operación falló', error);
```

---

## 📊 **Monitoreo de Performance**

### **Bundle Analysis**

```bash
npm run analyze
```

### **Type Checking**

```bash
npm run type-check:watch
```

### **Memory Leaks**

1. Abrir Chrome DevTools
2. Performance tab
3. Record memory allocation
4. Buscar memory leaks en componentes

---

## 🆘 **Troubleshooting Común**

### **Error: Redux Provider Missing**

```
Error: could not find react-redux context value
```

**Solución:**

1. Verificar que el componente esté en `(site)` group
2. Revisar `src/app/(site)/layout.tsx`
3. Confirmar que ReduxProvider envuelve el componente

### **Error: GraphQL Network**

```
Network request failed
```

**Debugging:**

1. Verificar `NEXT_PUBLIC_GRAPHQL_ENDPOINT`
2. Comprobar conexión de red
3. Revisar CORS settings
4. Verificar cliente GraphQL configuration

### **Error: Layout Conflicts**

```
Missing Required HTML Tag: <html>, <body>
```

**Solución:**

1. Eliminar layouts anidados innecesarios
2. Usar solo root layout en `(site)`
3. Verificar estructura de grupos de rutas

### **Error: Module Resolution**

```
Module not found: Can't resolve
```

**Debugging:**

1. Verificar paths en `tsconfig.json`
2. Comprobar imports relativos vs absolutos
3. Reiniciar TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## 🧪 **Testing del Sistema**

### **Checklist de Testing Completo**

```bash
# 1. Limpiar proyecto
npm run clean

# 2. Verificar tipos
npm run type-check

# 3. Iniciar con debugging
npm run debug:graphql

# 4. Testing manual:
```

**Pasos de testing:**

1. ✅ Ir a `/test-graphql-orders`
2. ✅ Agregar producto al carrito
3. ✅ Crear orden con GraphQL
4. ✅ Verificar logs en consola
5. ✅ Confirmar orden en base de datos
6. ✅ Verificar limpieza del carrito

### **Testing de Payment Flow**

1. ✅ Ir a `/checkout`
2. ✅ Llenar formulario completo
3. ✅ Procesar pago (sandbox)
4. ✅ Verificar redirection a `/order-success`
5. ✅ Confirmar creación de orden
6. ✅ Verificar datos almacenados

---

## 🛠️ **Comandos Útiles**

### **PowerShell (Windows)**

```powershell
# Matar procesos Node
taskkill /f /im node.exe

# Limpiar puerto 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Iniciar con debugging
npm run debug
```

### **Scripts de Desarrollo**

```bash
# Debug específico
npm run debug:graphql    # Solo GraphQL
npm run debug:orders     # Solo orders system
npm run debug:payment    # Solo payment system

# Análisis
npm run analyze         # Bundle analysis
npm run type-check      # Type checking

# Limpieza
npm run clean          # Limpiar cache
npm run clean:full     # Reinstalar todo
```

---

## 📝 **Logging Best Practices**

### **Niveles de Log**

```typescript
// 🚀 INFO - Inicio de operaciones
console.log('🚀 useOrdersRedux: Iniciando creación de orden...');

// 📦 DATA - Datos being processed
console.log('📦 OrderService: Datos preparados:', orderData);

// ✅ SUCCESS - Operaciones exitosas
console.log('✅ OrderService: Orden creada exitosamente');

// ⚠️ WARNING - Fallbacks o situaciones no ideales
console.warn('⚠️ OrderService: GraphQL falló, usando REST API');

// ❌ ERROR - Errores que requieren atención
console.error('❌ OrderService: Error crítico:', error);

// 🔧 DEBUG - Información técnica
console.log('🔧 GraphQL Client: Ejecutando mutation...');
```

### **Debugging Contextual**

```typescript
// Agregar contexto útil
console.log('🔍 Debug Context:', {
  component: 'OrderSuccessPage',
  paymentId: searchParams.get('payment_id'),
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
});
```

---

## 🎯 **Debugging por Escenario**

### **Scenario 1: Orden no se crea después del pago**

1. Verificar logs en `/order-success`
2. Comprobar localStorage data
3. Revisar GraphQL mutations
4. Verificar Redux state
5. Confirmar API responses

### **Scenario 2: Redux state inconsistente**

1. Abrir Redux DevTools
2. Verificar actions dispatched
3. Revisar reducers
4. Comprobar middleware
5. Verificar selectors

### **Scenario 3: GraphQL mutations fallan**

1. Verificar network tab
2. Comprobar variables enviadas
3. Revisar schema GraphQL
4. Verificar autenticación
5. Comprobar CORS settings

---

## 📚 **Recursos Adicionales**

- **VS Code Debugging**: [Official Guide](https://code.visualstudio.com/docs/editor/debugging)
- **Next.js Debugging**: [Next.js Docs](https://nextjs.org/docs/advanced-features/debugging)
- **Redux DevTools**: [Extension Guide](https://github.com/reduxjs/redux-devtools)
- **GraphQL Debugging**: [Best Practices](https://graphql.org/learn/validation/)

---

**🔄 Última actualización**: 2025-01-28
**📖 Mantenido por**: Equipo de Desarrollo
