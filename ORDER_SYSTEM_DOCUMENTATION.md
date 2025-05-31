# Sistema de Órdenes GraphQL - NextJS Frontend

## Descripción General

Este sistema proporciona una implementación completa de gestión de órdenes para el frontend NextJS, integrado con un backend Strapi usando GraphQL. El sistema está diseñado para manejar todo el flujo de órdenes desde la creación hasta la gestión, incluyendo clientes, direcciones de envío y proceso de checkout.

## Estructura del Sistema

### 1. **GraphQL Mutations y Queries** (`src/graphql/`)

#### Mutations (`src/graphql/mutation/orders.graphql`)

- **CreateOrder**: Crear nueva orden
- **UpdateOrder**: Actualizar orden existente
- **CreateOrderItem**: Crear item de orden
- **UpdateOrderItem**: Actualizar item de orden
- **DeleteOrderItem**: Eliminar item de orden
- **CreateCliente**: Crear nuevo cliente
- **UpdateCliente**: Actualizar cliente
- **CreateDireccionEnvio**: Crear dirección de envío
- **UpdateDireccionEnvio**: Actualizar dirección de envío

#### Queries (`src/graphql/queries/orders.graphql`)

- **GetOrders**: Obtener lista de órdenes con filtros y paginación
- **GetOrderById**: Obtener orden específica por ID
- **GetOrdersByCliente**: Obtener órdenes de un cliente específico
- **GetClientes**: Obtener lista de clientes
- **GetClienteById**: Obtener cliente específico
- **GetDireccionesEnvio**: Obtener direcciones de envío
- **SearchOrders**: Búsqueda de órdenes por términos
- **GetProducts**: Obtener productos
- **GetVariants**: Obtener variantes de productos

#### Constantes GraphQL (`src/graphql/constants/orders.ts`)

Contiene todas las definiciones GraphQL como constantes reutilizables.

### 2. **Tipos TypeScript** (`src/types/orders.ts`)

#### Tipos Principales

- **Order**: Orden principal con todos sus campos
- **OrderItem**: Item individual de una orden
- **Cliente**: Cliente del sistema
- **DireccionEnvio**: Dirección de envío
- **Product**: Producto
- **Variant**: Variante de producto

#### Tipos de Input

- **OrderInput**: Para crear/actualizar órdenes
- **ClienteInput**: Para crear/actualizar clientes
- **DireccionEnvioInput**: Para crear/actualizar direcciones

#### Tipos de Aplicación

- **CartToOrderData**: Para convertir carrito en orden
- **CheckoutFormData**: Datos del proceso de checkout
- **OrderFiltersInput**: Filtros para búsqueda de órdenes

### 3. **Servicio de Órdenes** (`src/services/orderService.ts`)

Clase centralizada que maneja todas las operaciones relacionadas con órdenes:

#### Métodos Principales

- `getOrders()`: Obtener órdenes con filtros
- `getOrderById()`: Obtener orden específica
- `createOrder()`: Crear nueva orden
- `updateOrder()`: Actualizar orden
- `createOrderFromCart()`: Crear orden desde carrito (proceso completo)
- `searchOrders()`: Buscar órdenes

#### Gestión de Clientes

- `getClientes()`: Obtener clientes
- `createCliente()`: Crear cliente
- `updateCliente()`: Actualizar cliente
- `findClienteByName()`: Buscar cliente por nombre

#### Gestión de Direcciones

- `createDireccionEnvio()`: Crear dirección
- `updateDireccionEnvio()`: Actualizar dirección

### 4. **Redux Slice** (`src/redux/features/ordersSlice.ts`)

#### Estado Global

```typescript
interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  filters: OrderFiltersInput;
  searchTerm: string;
  pagination: PaginationMeta;
  checkoutData: CheckoutFormData | null;
  checkoutStep: 'customer' | 'shipping' | 'payment' | 'review' | 'success';
  clientes: Cliente[];
  direccionesEnvio: DireccionEnvio[];
}
```

#### Async Thunks

- `fetchOrders`: Obtener órdenes
- `fetchOrderById`: Obtener orden por ID
- `createOrderFromCart`: Crear orden desde carrito
- `createOrder`: Crear orden individual
- `updateOrder`: Actualizar orden
- `searchOrders`: Buscar órdenes
- `fetchClientes`: Obtener clientes
- `createCliente`: Crear cliente
- `createDireccionEnvio`: Crear dirección

#### Actions

- `clearError`: Limpiar errores
- `updateFilters`: Actualizar filtros
- `updateSearchTerm`: Actualizar término de búsqueda
- `initializeCheckout`: Inicializar checkout
- `updateCheckoutData`: Actualizar datos de checkout
- `setCheckoutStep`: Cambiar paso del checkout
- `completeCheckout`: Completar checkout

### 5. **Hook Personalizado** (`src/hooks/useOrders.ts`)

Hook principal que expone toda la funcionalidad del sistema de órdenes:

#### Funciones Principales

```typescript
const {
  // Estado
  orders,
  currentOrder,
  loading,
  checkoutData,

  // Acciones CRUD
  getOrders,
  getOrderById,
  createNewOrder,
  updateExistingOrder,

  // Proceso de checkout
  processCheckoutFromCart,
  initCheckout,
  nextCheckoutStep,

  // Búsqueda y filtros
  searchOrdersData,
  setFilters,
  setSearchTerm,

  // Utilidades
  clearErrors,
  canProceedToNextStep,
} = useOrders();
```

## Flujo de Checkout

### Pasos del Checkout

1. **Customer**: Captura datos del cliente (Nombre, Apellido)
2. **Shipping**: Dirección de envío (Dirección, Departamento)
3. **Payment**: Método de pago (por implementar)
4. **Review**: Revisión final de la orden
5. **Success**: Confirmación de orden creada

### Proceso `createOrderFromCart`

1. Validar datos del cliente y dirección
2. Crear o buscar cliente existente
3. Crear dirección de envío
4. Calcular totales de la orden
5. Crear orden principal
6. Crear items de la orden
7. Limpiar carrito
8. Mostrar confirmación

## Validaciones

### Validación de Orden

- PrecioTotal debe ser mayor a cero
- cantidadTotal debe ser mayor a cero
- orderNumber es requerido

### Validación de Cliente

- Nombre es requerido
- Apellido es requerido

### Validación de Dirección

- Dirección es requerida
- Departamento es requerido

## Uso del Sistema

### 1. Configuración Inicial

```typescript
// En tu store.ts
import ordersReducer from './features/ordersSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    // otros reducers...
  },
});
```

### 2. Uso Básico en Componentes

```typescript
import { useOrders } from '../hooks/useOrders';

const OrdersPage = () => {
  const { orders, loading, getOrders, searchOrdersData, setFilters } =
    useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        orders.map((order) => (
          <div key={order.documentId}>
            <h3>Orden {order.orderNumber}</h3>
            <p>Total: ${order.PrecioTotal}</p>
            <p>
              Cliente: {order.cliente?.Nombre} {order.cliente?.Apellido}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
```

### 3. Proceso de Checkout

```typescript
const CheckoutPage = () => {
  const { cart } = useCart();
  const {
    processCheckoutFromCart,
    initCheckout,
    checkoutStep,
    nextCheckoutStep,
    canProceedToNextStep,
  } = useOrders();

  const handleStartCheckout = () => {
    initCheckout({
      cliente: { Nombre: '', Apellido: '' },
      direccionEnvio: { Direccion: '', Departamento: 'Antioquia' },
      notes: '',
    });
  };

  const handleCompleteOrder = async () => {
    const cartData = {
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      cliente: checkoutData.cliente,
      direccionEnvio: checkoutData.direccionEnvio,
      notes: checkoutData.notes || '',
    };

    await processCheckoutFromCart(cartData);
  };

  return (
    <div>
      {checkoutStep === 'customer' && <CustomerForm />}
      {checkoutStep === 'shipping' && <ShippingForm />}
      {checkoutStep === 'review' && (
        <button onClick={handleCompleteOrder} disabled={!canProceedToNextStep}>
          Confirmar Orden
        </button>
      )}
    </div>
  );
};
```

### 4. Búsqueda y Filtros

```typescript
const OrderSearch = () => {
  const {
    filteredOrders,
    searchTerm,
    setSearchTerm,
    setFilters,
    searchOrdersData,
  } = useOrders();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchOrdersData(term);
  };

  const handleFilterByDate = (startDate: string, endDate: string) => {
    setFilters({
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    });
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Buscar órdenes..."
      />
      {filteredOrders.map((order) => (
        <OrderCard key={order.documentId} order={order} />
      ))}
    </div>
  );
};
```

## Características del Sistema

### ✅ Implementado

- ✅ CRUD completo de órdenes
- ✅ Gestión de clientes y direcciones
- ✅ Proceso de checkout paso a paso
- ✅ Búsqueda y filtros avanzados
- ✅ Validaciones completas
- ✅ Integración con carrito de compras
- ✅ Manejo de errores robusto
- ✅ Estados de carga y envío
- ✅ Paginación
- ✅ Tipos TypeScript completos
- ✅ Documentación GraphQL generada automáticamente

### 🔄 Pendiente por Implementar

- 🔄 Métodos de pago reales
- 🔄 Integración con pasarelas de pago
- 🔄 Notificaciones por email
- 🔄 Tracking de órdenes
- 🔄 Cancelación de órdenes
- 🔄 Reembolsos

## Dependencias

- **Redux Toolkit**: Estado global
- **GraphQL Request**: Cliente GraphQL
- **React**: UI Framework
- **TypeScript**: Tipado estático

## Comandos Útiles

```bash
# Generar tipos GraphQL
yarn generate

# Ejecutar en desarrollo
yarn dev

# Build para producción
yarn build
```

## Estructura de Archivos

```
src/
├── graphql/
│   ├── mutation/
│   │   └── orders.graphql
│   ├── queries/
│   │   └── orders.graphql
│   ├── constants/
│   │   └── orders.ts
│   └── generated/
│       └── graphql.ts
├── types/
│   └── orders.ts
├── services/
│   └── orderService.ts
├── redux/
│   ├── features/
│   │   └── ordersSlice.ts
│   └── store.ts
└── hooks/
    └── useOrders.ts
```

Este sistema proporciona una base sólida y escalable para la gestión de órdenes en aplicaciones e-commerce usando NextJS y GraphQL.
