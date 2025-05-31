# 📋 Reglas del Proyecto E-commerce Next.js

## 🏗️ **Arquitectura del Proyecto**

### **Estructura de Directorios**

```
src/
├── app/                     # Next.js 13+ App Router
│   ├── (site)/             # Grupo de rutas principales con layout completo
│   ├── (main)/             # Grupo de rutas específicas (order-success, etc.)
│   └── api/                # API Routes de Next.js
├── components/             # Componentes React reutilizables
├── hooks/                  # Custom hooks (useOrdersRedux, etc.)
├── redux/                  # Estado global con Redux Toolkit
│   ├── features/          # Slices de Redux (ordersSlice, cartSlice)
│   ├── slices/            # Slices legacy
│   └── store.ts           # Configuración del store
├── services/              # Servicios de API (orderService, etc.)
├── graphql/               # Cliente GraphQL y queries/mutations
├── types/                 # Definiciones de TypeScript
└── utils/                 # Utilidades compartidas
```

### **Patrones de Arquitectura**

1. **Redux Toolkit**: Estado global centralizado
2. **GraphQL Client**: URQL como cliente principal
3. **Fallback Pattern**: GraphQL → REST API automático
4. **Custom Hooks**: Abstracción de lógica compleja
5. **Error Boundaries**: Manejo de errores en componentes

---

## 🔧 **Reglas de Desarrollo**

### **TypeScript**

- ✅ **OBLIGATORIO**: Usar tipos explícitos en todas las funciones públicas
- ✅ **INTERFACES**: Definir interfaces para todos los objetos de datos
- ✅ **ENUMS**: Usar enums para valores constantes
- ❌ **PROHIBIDO**: Usar `any` sin justificación documentada

```typescript
// ✅ CORRECTO
interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

// ❌ INCORRECTO
const customerData: any = { ... };
```

### **React Components**

- ✅ **FUNCTIONAL COMPONENTS**: Usar solo componentes funcionales
- ✅ **CUSTOM HOOKS**: Extraer lógica reutilizable a hooks personalizados
- ✅ **ERROR BOUNDARIES**: Implementar manejo de errores
- ✅ **LOADING STATES**: Manejar estados de carga explícitamente

```typescript
// ✅ CORRECTO
const OrderComponent: React.FC = () => {
  const { createOrder, createOrderLoading, createOrderError } =
    useOrdersRedux();

  if (createOrderLoading) return <LoadingSpinner />;
  if (createOrderError) return <ErrorMessage error={createOrderError} />;

  return <div>...</div>;
};
```

### **Redux Pattern**

- ✅ **REDUX TOOLKIT**: Usar createSlice y createAsyncThunk
- ✅ **CUSTOM HOOKS**: Crear hooks para abstraer selectors complejos
- ✅ **TYPED HOOKS**: Usar hooks tipados (useAppSelector, useAppDispatch)
- ✅ **CONSISTENT NAMING**: Seguir convención de nombres establecida

```typescript
// ✅ PATRÓN CORRECTO
export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (orderData: CartToOrderData, { rejectWithValue }) => {
    try {
      const result = await orderService.createOrderFromCart(orderData);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
```

---

## 🧬 **Sistema GraphQL**

### **Prioridad de Métodos**

1. **GraphQL Client** (URQL) - Método principal
2. **REST API** - Fallback automático
3. **Error Handling** - Logging detallado

### **Mutations Principales**

- `CreateOrderDocument` - Crear órdenes
- `CreateClienteDocument` - Crear clientes
- `CreateDireccionEnvioDocument` - Crear direcciones
- `CreateOrderItemDocument` - Crear items de orden

### **Patrón de Implementación**

```typescript
// ✅ PATRÓN GRAPHQL
try {
  console.log(
    '🔄 OrderService: USANDO GRAPHQL CLIENT como método principal...'
  );
  const result = await this.createOrderFromCartGraphQL(cartData);
  console.log('✅ OrderService: ÉXITO con GraphQL Client');
  return result;
} catch (graphqlError) {
  console.warn('⚠️ OrderService: GraphQL Client falló, intentando REST API...');
  const result = await this.createOrderFromCartREST(cartData);
  return result;
}
```

---

## 🐛 **Debugging y Logging**

### **Niveles de Logging**

- 🚀 **INFO**: Inicio de operaciones importantes
- 📦 **DATA**: Datos siendo procesados
- ✅ **SUCCESS**: Operaciones exitosas
- ⚠️ **WARNING**: Fallbacks o situaciones no ideales
- ❌ **ERROR**: Errores que requieren atención
- 🔧 **DEBUG**: Información técnica detallada

### **Formato de Console Logs**

```typescript
// ✅ FORMATO CORRECTO
console.log('🚀 useOrdersRedux: Iniciando creación de orden con GraphQL...');
console.log('📦 useOrdersRedux: Datos preparados:', orderData);
console.log('✅ useOrdersRedux: Orden creada exitosamente');
console.warn('⚠️ useOrdersRedux: Fallback a REST API');
console.error('❌ useOrdersRedux: Error al crear orden:', error);
```

### **Error Handling Pattern**

```typescript
// ✅ PATRÓN DE MANEJO DE ERRORES
try {
  // Operación principal
  const result = await operation();
  console.log('✅ Operación exitosa:', result);
  return result;
} catch (error: any) {
  console.error('❌ Error en operación:', error);

  // Fallback si es aplicable
  try {
    const fallbackResult = await fallbackOperation();
    console.log('🔄 Fallback exitoso:', fallbackResult);
    return fallbackResult;
  } catch (fallbackError: any) {
    console.error('❌ Fallback también falló:', fallbackError);
    throw new Error(`Operación falló: ${error.message}`);
  }
}
```

---

## 🔄 **Sistema de Órdenes**

### **Flujo Principal**

1. **Carrito** → Redux state con items
2. **Checkout** → Formulario multi-paso
3. **Payment** → MercadoPago o contra entrega
4. **Order Creation** → GraphQL mutations
5. **Success Page** → Confirmación y limpieza

### **Estados de Redux**

```typescript
interface OrdersState {
  // Lista y estado actual
  orders: Order[];
  currentOrder: Order | null;

  // Estados de carga específicos
  createOrderLoading: boolean;
  createOrderError: string | null;
  createOrderSuccess: boolean;

  // Metadatos
  lastCreatedOrderId: string | null;
  successMessage: string | null;
}
```

### **Hooks Personalizados**

- `useOrdersRedux`: Manejo completo de órdenes
- `useAuthRedirect`: Protección de rutas
- Cada hook debe abstraer complejidad y proveer API simple

---

## 🌐 **APIs y Servicios**

### **OrderService Pattern**

- **Método Principal**: `createOrderFromCart()`
- **GraphQL Method**: `createOrderFromCartGraphQL()`
- **REST Fallback**: `createOrderFromCartREST()`
- **Validation**: Validar datos antes de enviar

### **API Routes Structure**

```
/api/
├── create_preference     # MercadoPago preferences
├── process_payment      # Procesar pagos
├── orders/             # CRUD de órdenes
├── mercadopago/
│   └── webhook         # Webhooks de MercadoPago
└── auth/               # Autenticación
```

---

## 📱 **Páginas y Routing**

### **Grupos de Rutas**

- **(site)**: Páginas principales con layout completo
- **(main)**: Páginas específicas (order-success, test pages)

### **Páginas de Testing**

- `/test-graphql-orders` - Testing específico de GraphQL
- `/checkout-redux` - Checkout completo con Redux
- `/test-orders-redux` - Debug avanzado del sistema

### **Layout Requirements**

- **Root Layout**: Solo en (site) con Provider completo
- **No Sub-layouts**: Evitar layouts anidados que causen conflictos
- **Error Boundaries**: En cada nivel crítico

---

## 🔐 **Seguridad y Validación**

### **Validación de Datos**

```typescript
// ✅ PATRÓN DE VALIDACIÓN
const validateCustomerData = (data: CustomerData): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.firstName) {
    errors.push({ field: 'firstName', message: 'Nombre es requerido' });
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email válido es requerido' });
  }

  return errors;
};
```

### **Autenticación**

- **JWT Tokens**: Validación en middleware
- **Protected Routes**: Hook useAuthRedirect
- **Session Management**: Redux + localStorage

---

## 🎨 **UI/UX Guidelines**

### **Estados de Componentes**

- **Loading**: Spinners con texto descriptivo
- **Error**: Mensajes claros con acciones de recuperación
- **Success**: Confirmaciones visuales con próximos pasos
- **Empty**: Estados vacíos con calls-to-action

### **Responsive Design**

- **Mobile First**: Diseñar primero para móvil
- **Breakpoints**: sm, md, lg, xl de Tailwind
- **Touch Targets**: Mínimo 44px para botones

---

## 🧪 **Testing Strategy**

### **Páginas de Testing**

1. **GraphQL Testing**: `/test-graphql-orders`
2. **Checkout Flow**: `/checkout-redux`
3. **Debug Panel**: `/test-orders-redux`

### **Testing Checklist**

- [ ] Agregar producto al carrito
- [ ] Completar checkout
- [ ] Procesar pago (sandbox)
- [ ] Verificar creación de orden
- [ ] Confirmar limpieza de carrito
- [ ] Validar logs de GraphQL

---

## 📊 **Performance**

### **Optimizaciones**

- **Dynamic Imports**: Componentes pesados
- **Lazy Loading**: Imágenes y componentes
- **Memoization**: React.memo para componentes puros
- **Bundle Analysis**: Regular review del bundle size

### **Monitoring**

- **Console Logs**: Estructurados y con emojis
- **Error Tracking**: Captura de errores en boundaries
- **Performance Metrics**: Core Web Vitals

---

## 🚀 **Deployment**

### **Environment Variables**

```env
# MercadoPago
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=
MERCADO_PAGO_ACCESS_TOKEN=

# GraphQL
NEXT_PUBLIC_GRAPHQL_ENDPOINT=

# Auth
JWT_SECRET=
```

### **Build Process**

1. **Lint**: Verificar código
2. **Type Check**: Validar TypeScript
3. **Build**: Compilar para producción
4. **Test**: Ejecutar tests automatizados

---

## 📝 **Convenciones de Código**

### **Naming Conventions**

- **Variables**: camelCase
- **Functions**: camelCase con verbo
- **Components**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Files**: kebab-case o PascalCase según tipo

### **Git Conventions**

```
feat: nueva funcionalidad
fix: corrección de bug
docs: documentación
style: formateo
refactor: refactorización
test: tests
chore: tareas de mantenimiento
```

---

## 🔧 **Debugging Tools**

### **VS Code Configuration**

- **Extensions**: ES7+ React/Redux/React-Native snippets
- **Settings**: Auto-save, format on save
- **Debugger**: Launch configurations para Next.js

### **Browser DevTools**

- **Redux DevTools**: Para inspeccionar state
- **React Developer Tools**: Para árbol de componentes
- **Network Tab**: Para monitorear APIs

---

## ✅ **Checklist de Desarrollo**

### **Antes de Commit**

- [ ] Código compila sin errores
- [ ] No hay console.errors en producción
- [ ] Tipos TypeScript correctos
- [ ] Documentación actualizada
- [ ] Tests pasan (si existen)

### **Antes de Deploy**

- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] Testing manual en staging
- [ ] Performance check
- [ ] Error boundaries funcionando

---

## 🆘 **Troubleshooting Común**

### **Redux Provider Error**

```
Error: could not find react-redux context value
```

**Solución**: Verificar que el componente esté dentro del ReduxProvider en (site)/layout.tsx

### **GraphQL Client Error**

```
Network request failed
```

**Solución**: Verificar NEXT_PUBLIC_GRAPHQL_ENDPOINT y conexión

### **Layout Conflicts**

```
Missing Required HTML Tag: <html>, <body>
```

**Solución**: Eliminar layouts anidados, usar solo root layout

---

## 📚 **Recursos de Referencia**

- [Next.js App Router](https://nextjs.org/docs/app)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [URQL GraphQL Client](https://formidable.com/open-source/urql/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MercadoPago SDK](https://www.mercadopago.com.co/developers)

---

**Última actualización**: 2025-01-28
**Versión**: 1.0.0
**Mantenido por**: Equipo de Desarrollo
