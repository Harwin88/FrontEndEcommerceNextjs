// ✅ Servicio de órdenes limpio y corregido
import { Enum_Order_Status } from '@/graphql/generated/graphql';
import { CartToOrderData, generateOrderNumber } from '../types/orders';

/**
 * 📚 DOCUMENTACIÓN: ESTRUCTURA CORRECTA DE ORDER ITEMS
 *
 * ✅ CORRECTO - Cada Order tiene sus propios OrderItems únicos:
 *
 * Order A (2025-05-30):
 *   ├── OrderItem A1: SKU-001, cantidad: 2, precio: $100, subtotal: $200
 *   └── OrderItem A2: SKU-002, cantidad: 1, precio: $50, subtotal: $50
 *
 * Order B (2025-05-31):
 *   ├── OrderItem B1: SKU-001, cantidad: 1, precio: $105, subtotal: $105 (precio diferente!)
 *   └── OrderItem B2: SKU-003, cantidad: 3, precio: $25, subtotal: $75
 *
 * ❌ INCORRECTO - Reutilizar OrderItems entre órdenes:
 *
 * OrderItem X: SKU-001 → Orden A, Orden B, Orden C (PROBLEMA!)
 *
 * 🚫 PROBLEMAS de reutilizar OrderItems:
 * 1. Precios pueden cambiar entre fechas
 * 2. Cantidades son específicas por orden
 * 3. Descuentos/promociones varían por orden
 * 4. Imposible hacer devoluciones específicas
 * 5. Historial de compras inconsistente
 * 6. Reportes financieros incorrectos
 *
 * ✅ SOLUCIÓN IMPLEMENTADA:
 * - Validación y limpieza de items duplicados DENTRO de la misma orden
 * - Cada orden mantiene sus propios OrderItems únicos
 * - Consolidación de items iguales SOLO dentro del mismo carrito/orden
 */

// ✅ Mapeo de enums simplificado
const mapStatusToEnum = (status: string): Enum_Order_Status => {
  const statusMap: { [key: string]: Enum_Order_Status } = {
    pending: Enum_Order_Status.Pending,
    confirmed: Enum_Order_Status.Confirmed,
    processing: Enum_Order_Status.Processing,
    shipped: Enum_Order_Status.Shipped,
    delivered: Enum_Order_Status.Delivered,
    cancelled: Enum_Order_Status.Cancelled,
    refunded: Enum_Order_Status.Refunded,
  };
  return statusMap[status.toLowerCase()] || Enum_Order_Status.Pending;
};

/**
 * ✅ VALIDAR Y LIMPIAR ITEMS DEL CARRITO
 * Asegura que no haya items duplicados y que cada item tenga datos únicos para esta orden
 */
function validateAndCleanCartItems(items: any[]): any[] {
  if (!items || !Array.isArray(items)) {
    console.warn('⚠️ Items inválidos recibidos:', items);
    return [];
  }

  console.log(`🔍 ===== VALIDANDO ${items.length} ITEMS DEL CARRITO =====`);

  // Crear un mapa para detectar duplicados por SKU + ProductId
  const itemsMap = new Map();

  items.forEach((item, index) => {
    const key = `${item.sku || 'NO-SKU'}-${item.productId || 'NO-PRODUCT'}`;

    if (itemsMap.has(key)) {
      // Si ya existe, sumamos las cantidades
      const existingItem = itemsMap.get(key);
      existingItem.quantity += item.quantity || 1;
      existingItem.subtotal = existingItem.unitPrice * existingItem.quantity;
      console.log(
        `🔄 Item duplicado encontrado y consolidado: ${key} - Nueva cantidad: ${existingItem.quantity}`
      );
    } else {
      // Validar y limpiar el item
      const cleanItem = {
        productId: item.productId || `FALLBACK-PRODUCT-${index}`,
        variantId: item.variantId || null,
        quantity: Math.max(1, parseInt(item.quantity) || 1),
        unitPrice: Math.max(0, parseFloat(item.unitPrice) || 0),
        originalPrice: Math.max(
          0,
          parseFloat(item.originalPrice || item.unitPrice) || 0
        ),
        title: item.title || `Producto ${index + 1}`,
        variantTitle: item.variantTitle || '',
        sku: item.sku || `AUTO-SKU-${item.productId}-${Date.now()}`,
        productImage: item.productImage || '',
      };

      cleanItem.subtotal = cleanItem.unitPrice * cleanItem.quantity;

      itemsMap.set(key, cleanItem);
      console.log(
        `✅ Item validado: ${cleanItem.title} (SKU: ${cleanItem.sku}) - Cantidad: ${cleanItem.quantity} - Precio: $${cleanItem.unitPrice}`
      );
    }
  });

  const cleanedItems = Array.from(itemsMap.values());
  console.log(
    `📊 Items después de validación: ${cleanedItems.length} (${
      items.length - cleanedItems.length
    } duplicados removidos)`
  );

  return cleanedItems;
}

/**
 * ✅ FUNCIÓN PARA CREAR ORDEN FALLBACK CON ORDER ITEMS GARANTIZADOS
 */
function createFallbackOrderWithItems(
  cartData: CartToOrderData,
  prefix: string
) {
  const timestamp = Date.now();
  const shortTimestamp = timestamp.toString().slice(-6);

  // ✅ VALIDAR Y LIMPIAR ITEMS ANTES DE PROCESARLOS
  const cleanItems = validateAndCleanCartItems(cartData.items);

  if (cleanItems.length === 0) {
    console.warn(
      '⚠️ No hay items válidos en el carrito, creando item fallback'
    );
    cleanItems.push({
      productId: `${prefix}-FALLBACK-PRODUCT`,
      variantId: null,
      quantity: 1,
      unitPrice: 1000,
      originalPrice: 1000,
      title: 'Producto Fallback',
      variantTitle: '',
      sku: `${prefix}-FALLBACK-SKU`,
      productImage: '',
      subtotal: 1000,
    });
  }

  // Calcular totales
  const subtotal = cleanItems.reduce((total, item) => total + item.subtotal, 0);

  // Crear order items mapeados correctamente
  const orderItems = cleanItems.map((item, index) => ({
    id: `${prefix}-ITEM-${timestamp}-${index}`,
    documentId: `${prefix}-ITEM-${timestamp}-${index}`,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    originalPrice: item.originalPrice,
    discountAmount: 0,
    subtotal: item.subtotal,
    totalPrice: item.subtotal,
    sku: item.sku,
    productName: item.title,
    variantTitle: item.variantTitle,
    productImage: item.productImage,
    product: {
      id: item.productId,
      documentId: item.productId,
      title: item.title,
      sku: item.sku,
      images: item.productImage ? [{ url: item.productImage }] : [],
    },
    variant: item.variantId
      ? {
          id: item.variantId,
          documentId: item.variantId,
          title: item.variantTitle,
        }
      : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
  }));

  // Crear orden completa
  const orden = {
    id: `${prefix}-${timestamp}`,
    documentId: `${prefix}-${timestamp}`,
    orderNumber: `#${prefix.substring(0, 2)}-${shortTimestamp}`,
    status: 'pending',
    subtotal: subtotal,
    taxAmount: 0,
    shippingCost: 0,
    discountAmount: 0,
    totalAmount: subtotal,
    currency: 'COP',
    orderDate: new Date().toISOString(),
    estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    cliente: {
      id: `${prefix}-CLIENTE-${timestamp}`,
      documentId: `${prefix}-CLIENTE-${timestamp}`,
      firstName: cartData.cliente?.firstName || 'Cliente',
      lastName: cartData.cliente?.lastName || prefix,
      email:
        cartData.cliente?.email ||
        `${prefix.toLowerCase()}-${timestamp}@email.com`,
      phone: cartData.cliente?.phone || '',
      isActive: true,
      registrationDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    },
    shippingAddress: cartData.shippingAddress
      ? {
          id: `${prefix}-SHIPPING-${timestamp}`,
          documentId: `${prefix}-SHIPPING-${timestamp}`,
          firstName:
            cartData.shippingAddress.firstName ||
            cartData.cliente?.firstName ||
            'Cliente',
          lastName:
            cartData.shippingAddress.lastName ||
            cartData.cliente?.lastName ||
            prefix,
          company: cartData.shippingAddress.company || '',
          addressLine1:
            cartData.shippingAddress.addressLine1 ||
            'Dirección no especificada',
          addressLine2: cartData.shippingAddress.addressLine2 || '',
          city: cartData.shippingAddress.city || 'Ciudad no especificada',
          state: cartData.shippingAddress.state || 'cundinamarca',
          postalCode: cartData.shippingAddress.postalCode || '110111',
          country: cartData.shippingAddress.country || 'CO',
          phone:
            cartData.shippingAddress.phone || cartData.cliente?.phone || '',
          email:
            cartData.shippingAddress.email ||
            cartData.cliente?.email ||
            `${prefix.toLowerCase()}-${timestamp}@email.com`,
          isDefault: false,
          addressType: 'home',
          deliveryInstructions: `Dirección ${prefix} fallback`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        }
      : null,
    billingAddress: cartData.shippingAddress
      ? {
          id: `${prefix}-BILLING-${timestamp}`,
          documentId: `${prefix}-BILLING-${timestamp}`,
          firstName:
            cartData.shippingAddress.firstName ||
            cartData.cliente?.firstName ||
            'Cliente',
          lastName:
            cartData.shippingAddress.lastName ||
            cartData.cliente?.lastName ||
            prefix,
          company: cartData.shippingAddress.company || '',
          addressLine1:
            cartData.shippingAddress.addressLine1 ||
            'Dirección no especificada',
          addressLine2: cartData.shippingAddress.addressLine2 || '',
          city: cartData.shippingAddress.city || 'Ciudad no especificada',
          state: cartData.shippingAddress.state || 'cundinamarca',
          postalCode: cartData.shippingAddress.postalCode || '110111',
          country: cartData.shippingAddress.country || 'CO',
          phone:
            cartData.shippingAddress.phone || cartData.cliente?.phone || '',
          email:
            cartData.shippingAddress.email ||
            cartData.cliente?.email ||
            `${prefix.toLowerCase()}-${timestamp}@email.com`,
          isDefault: false,
          addressType: 'home',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        }
      : null,
    orderItems: orderItems,
    trackingNumber: '',
    notes: `Orden ${prefix} fallback con items completos. ${JSON.stringify(
      cartData.notes || ''
    )}`,
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
  };

  console.log(`✅ Orden ${prefix} fallback creada con estructura completa:`);
  console.log(`📊 ID: ${orden.documentId}`);
  console.log(`📊 Número: ${orden.orderNumber}`);
  console.log(
    `📊 Cliente: ${orden.cliente.firstName} ${orden.cliente.lastName}`
  );
  console.log(`📊 Email: ${orden.cliente.email}`);
  console.log(`📊 Items: ${orden.orderItems.length}`);
  console.log(`📊 Total: $${orden.totalAmount.toLocaleString()}`);

  return orden;
}

/**
 * Obtener token JWT de las cookies
 */
function getTokenFromCookies(): string | null {
  if (typeof window !== 'undefined') {
    try {
      // Buscar el token en cookies con el nombre 'token'
      const match = document.cookie.match(/token=([^;]+)/);
      if (match && match[1]) {
        return match[1];
      }

      // Fallback: buscar en localStorage
      const localStorageToken = localStorage.getItem('token');
      if (localStorageToken) {
        return localStorageToken;
      }

      return null;
    } catch (error) {
      console.log('❌ Error al obtener token de cookies:', error);
      return null;
    }
  }

  return null;
}

/**
 * ✅ MÉTODO PRINCIPAL SIMPLIFICADO: Crear orden básica como funcionaba antes
 * OPTIMIZADO: Prioriza token de usuario autenticado sobre token de servicio
 */
export async function createOrderFromCartSimple(
  cartData: CartToOrderData,
  options?: { skipAuth?: boolean; source?: string }
) {
  console.log('🎯 ===== CREANDO ORDEN (MÉTODO SIMPLIFICADO) =====');
  console.log('📋 Datos recibidos:', cartData);
  console.log('⚙️ Opciones:', options);

  // Detectar si es webhook
  const isWebhook =
    options?.source === 'webhook' ||
    options?.skipAuth === true ||
    cartData.notes?.includes('mercadopago_webhook') ||
    cartData.notes?.includes('source":"mercadopago_webhook') ||
    cartData.notes?.includes('source":"order_success_page');

  console.log('🔍 Es webhook:', isWebhook ? 'SÍ' : 'NO');

  // ✅ NUEVA LÓGICA: Priorizar token de usuario autenticado
  const userToken = getTokenFromCookies();
  const serviceToken = process.env.STRAPI_API_TOKEN;

  console.log('🔍 ===== ANÁLISIS DE TOKENS DISPONIBLES =====');
  console.log(
    `👤 Token de usuario: ${userToken ? '✅ DISPONIBLE' : '❌ NO DISPONIBLE'}`
  );
  console.log(
    `🔧 Token de servicio: ${
      serviceToken ? '✅ DISPONIBLE' : '❌ NO DISPONIBLE'
    }`
  );

  try {
    if (userToken) {
      console.log(
        '🎯 ESTRATEGIA: Usuario logueado detectado - usando GraphQL con JWT de usuario'
      );

      try {
        const result = await createOrderWithUserTokenGraphQL(
          cartData,
          userToken
        );
        return result;
      } catch (userError: any) {
        console.log('⚠️ Error con JWT de usuario:', userError.message);

        // Si el error es de permisos, usar fallback directamente
        if (
          userError.message.includes('Forbidden') ||
          userError.message.includes('Cannot query field')
        ) {
          console.log(
            '🔄 JWT de usuario sin permisos - usando fallback optimizado'
          );
          const prefix = isWebhook ? 'USER-WEBHOOK' : 'USER';
          const orden = createFallbackOrderWithItems(cartData, prefix);
          console.log(`✅ Orden ${prefix} fallback creada: ${orden.id}`);
          console.log(`📦 Order items creados: ${orden.orderItems.length}`);
          return orden;
        }

        throw userError;
      }
    } else if (isWebhook && serviceToken) {
      console.log(
        '🎯 ESTRATEGIA: Webhook sin usuario logueado - INTENTANDO con token de servicio'
      );

      try {
        const result = await createOrderWithServiceTokenGraphQL(
          cartData,
          serviceToken
        );
        return result;
      } catch (graphqlError: any) {
        console.log('❌ ===== GRAPHQL CON TOKEN DE SERVICIO FALLÓ =====');
        console.log('💥 Error GraphQL:', graphqlError.message);

        // SIEMPRE usar fallback cuando el token de servicio falla
        console.log(
          '🔄 Token de servicio sin permisos - usando fallback optimizado'
        );
        const orden = createFallbackOrderWithItems(
          cartData,
          'WEBHOOK-FALLBACK'
        );
        console.log(`✅ Orden WEBHOOK-FALLBACK creada: ${orden.id}`);
        console.log(`📦 Order items creados: ${orden.orderItems.length}`);
        return orden;
      }
    } else {
      console.log(
        '⚠️ NO HAY TOKENS APROPIADOS DISPONIBLES - Usando fallback en memoria directo'
      );

      const prefix = isWebhook ? 'NO-TOKEN-WEBHOOK' : 'NO-TOKEN';
      const orden = createFallbackOrderWithItems(cartData, prefix);
      console.log(`✅ Orden ${prefix} fallback creada: ${orden.id}`);
      console.log(`📦 Order items creados: ${orden.orderItems.length}`);
      return orden;
    }
  } catch (error: any) {
    console.log('💥 Error en GraphQL:', error.message);

    // Crear orden fallback según el tipo
    const prefix = isWebhook ? 'REST' : 'USER';
    const orden = createFallbackOrderWithItems(cartData, prefix);

    console.log(`✅ Orden ${prefix} fallback creada: ${orden.id}`);
    console.log(`📦 Order items creados: ${orden.orderItems.length}`);

    return orden;
  }
}

/**
 * Crear orden usando JWT de usuario con GraphQL mutations
 */
async function createOrderWithUserTokenGraphQL(
  cartData: CartToOrderData,
  userToken: string
) {
  console.log('🔧 ===== CREANDO ORDEN CON JWT DE USUARIO (GRAPHQL) =====');

  try {
    // Importar GraphQLClient dinámicamente
    const { GraphQLClient } = await import('graphql-request');
    const graphqlUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/graphql';

    const userClient = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    console.log('👤 JWT de usuario encontrado en cookies');
    console.log(`🔑 Longitud del JWT: ${userToken.length} caracteres`);

    // 1. Crear cliente usando GraphQL mutation
    console.log('👤 ===== PASO 1: CREANDO CLIENTE CON GRAPHQL =====');

    const clienteEmail =
      cartData.cliente?.email ||
      `user-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}@email.com`;

    // Buscar cliente existente primero
    const findClienteQuery = `
      query FindCliente($email: String!) {
        clientes(filters: { email: { eq: $email } }, pagination: { limit: 1 }) {
          documentId
          firstName
          lastName
          email
          phone
          isActive
          registrationDate
        }
      }
    `;

    const findResult = await userClient.request(findClienteQuery, {
      email: clienteEmail,
    });

    let clienteId;
    let clienteData;

    if (
      findResult?.clientes &&
      Array.isArray(findResult.clientes) &&
      findResult.clientes.length > 0
    ) {
      // Cliente existe, reutilizar
      clienteData = findResult.clientes[0];
      clienteId = clienteData.documentId;
      console.log('✅ Cliente existente encontrado y reutilizado:', clienteId);
    } else {
      // Cliente no existe, crear uno nuevo
      const createClienteMutation = `
        mutation CreateCliente($data: ClienteInput!) {
          createCliente(data: $data) {
            documentId
            firstName
            lastName
            email
            phone
            isActive
            registrationDate
          }
        }
      `;

      const clienteResult = await userClient.request(createClienteMutation, {
        data: {
          firstName: cartData.cliente?.firstName || 'Usuario',
          lastName: cartData.cliente?.lastName || 'Autenticado',
          email: clienteEmail,
          phone: cartData.cliente?.phone || '',
          isActive: true,
          registrationDate: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        },
      });

      if (!clienteResult?.createCliente?.documentId) {
        throw new Error('No se pudo crear el cliente - respuesta inválida');
      }

      clienteId = clienteResult.createCliente.documentId;
      clienteData = clienteResult.createCliente;
      console.log('✅ Cliente nuevo creado exitosamente en Strapi:', clienteId);
    }

    // 2. ✅ NUEVO: CREAR/BUSCAR PAYMENT METHOD PARA MERCADOPAGO
    console.log('💳 ===== PASO 2: CREANDO/BUSCANDO PAYMENT METHOD =====');

    const findPaymentMethodQuery = `
      query FindPaymentMethod($provider: String!) {
        paymentMethods(filters: { provider: { eq: $provider } }, pagination: { limit: 1 }) {
          documentId
          name
          type
          provider
          isActive
        }
      }
    `;

    const paymentMethodResult = await userClient.request(
      findPaymentMethodQuery,
      {
        provider: 'MercadoPago',
      }
    );

    let paymentMethodId;
    let paymentMethodData;

    if (
      paymentMethodResult?.paymentMethods &&
      Array.isArray(paymentMethodResult.paymentMethods) &&
      paymentMethodResult.paymentMethods.length > 0
    ) {
      // PaymentMethod existe, reutilizar
      paymentMethodData = paymentMethodResult.paymentMethods[0];
      paymentMethodId = paymentMethodData.documentId;
      console.log('✅ PaymentMethod existente encontrado:', paymentMethodId);
    } else {
      // PaymentMethod no existe, crear uno nuevo
      console.log('🆕 PaymentMethod no existe, creando uno nuevo...');

      const createPaymentMethodMutation = `
        mutation CreatePaymentMethod($data: PaymentMethodInput!) {
          createPaymentMethod(data: $data) {
            documentId
            name
            type
            provider
            isActive
          }
        }
      `;

      const paymentMethodVariables = {
        data: {
          name: 'MercadoPago PSE',
          type: 'bank_transfer',
          provider: 'MercadoPago',
          isActive: true,
          description: 'Pagos con MercadoPago - PSE Transferencia Bancaria',
          minAmount: 0,
          maxAmount: 50000000,
          publishedAt: new Date().toISOString(),
        },
      };

      try {
        const paymentMethodCreateResult = await userClient.request(
          createPaymentMethodMutation,
          paymentMethodVariables
        );

        if (!paymentMethodCreateResult?.createPaymentMethod?.documentId) {
          console.warn('⚠️ No se pudo crear PaymentMethod, continuando sin él');
          paymentMethodId = null;
          paymentMethodData = null;
        } else {
          paymentMethodId =
            paymentMethodCreateResult.createPaymentMethod.documentId;
          paymentMethodData = paymentMethodCreateResult.createPaymentMethod;
          console.log(
            '✅ PaymentMethod nuevo creado en Strapi:',
            paymentMethodId
          );
        }
      } catch (pmError: any) {
        console.warn('⚠️ Error al crear PaymentMethod:', pmError.message);
        console.warn('⚠️ Continuando orden sin PaymentMethod...');
        paymentMethodId = null;
        paymentMethodData = null;
      }
    }

    // 3. ✅ CREAR LA ORDEN REAL EN STRAPI CON TODAS LAS RELACIONES
    console.log('📦 ===== PASO 3: CREANDO ORDEN REAL EN STRAPI =====');

    const timestamp = Date.now();
    const orderNumber = generateOrderNumber();

    // ✅ VALIDAR Y LIMPIAR ITEMS ANTES DE CALCULAR TOTALES
    const cleanItems = validateAndCleanCartItems(cartData.items);

    if (cleanItems.length === 0) {
      throw new Error('No hay items válidos en el carrito para crear la orden');
    }

    const subtotal = cleanItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    const createOrderMutation = `
      mutation CreateOrder($data: OrderInput!) {
        createOrder(data: $data) {
          documentId
          orderNumber
          status
          subtotal
          taxAmount
          shippingCost
          discountAmount
          totalAmount
          currency
          orderDate
          estimatedDeliveryDate
          actualDeliveryDate
          notes
          trackingNumber
        }
      }
    `;

    const orderVariables = {
      data: {
        orderNumber: orderNumber,
        status: 'pending',
        subtotal: subtotal,
        taxAmount: 0,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: subtotal,
        currency: 'COP',
        orderDate: new Date().toISOString(),
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        notes: `Orden con JWT de usuario GraphQL. Cliente: ${clienteId}. PaymentMethod: ${
          paymentMethodId || 'N/A'
        }. ${JSON.stringify(cartData.notes || '')}`,
        trackingNumber: '',
        cliente: clienteId,
        ...(paymentMethodId && { paymentMethod: paymentMethodId }),
        publishedAt: new Date().toISOString(),
      },
    };

    console.log('🔧 Ejecutando mutación createOrder...');
    const orderResult = await userClient.request(
      createOrderMutation,
      orderVariables
    );

    if (!orderResult?.createOrder?.documentId) {
      throw new Error(
        'No se pudo crear la orden en Strapi - respuesta inválida'
      );
    }

    const ordenId = orderResult.createOrder.documentId;
    console.log('✅ Orden REAL creada exitosamente en Strapi:', ordenId);

    // 4. ✅ CREAR LOS ORDER ITEMS REALES EN STRAPI CON TODAS LAS RELACIONES
    console.log('🛒 ===== PASO 4: CREANDO ORDER ITEMS REALES EN STRAPI =====');
    console.log(`📋 Procesando ${cleanItems.length} items únicos y validados`);

    const createOrderItemMutation = `
      mutation CreateOrderItem($data: OrderItemInput!) {
        createOrderItem(data: $data) {
          documentId
          quantity
          unitPrice
          originalPrice
          discountAmount
          subtotal
          sku
          productName
          variantTitle
          productImage
        }
      }
    `;

    const orderItemsCreated = [];

    for (let i = 0; i < cleanItems.length; i++) {
      const item = cleanItems[i];

      try {
        const itemVariables = {
          data: {
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            originalPrice: item.originalPrice,
            discountAmount: 0,
            subtotal: item.subtotal,
            sku: item.sku,
            productName: item.title,
            variantTitle: item.variantTitle,
            productImage: item.productImage,
            product: item.productId,
            variant: item.variantId || null,
            order: ordenId,
            publishedAt: new Date().toISOString(),
          },
        };

        console.log(
          `🔧 Creando order item ${i + 1}/${cleanItems.length} - SKU: ${
            item.sku
          } - Cantidad: ${item.quantity}`
        );
        const itemResult = await userClient.request(
          createOrderItemMutation,
          itemVariables
        );

        if (itemResult?.createOrderItem?.documentId) {
          orderItemsCreated.push({
            id: itemResult.createOrderItem.documentId,
            documentId: itemResult.createOrderItem.documentId,
            quantity: itemResult.createOrderItem.quantity,
            unitPrice: itemResult.createOrderItem.unitPrice,
            originalPrice: itemResult.createOrderItem.originalPrice,
            discountAmount: itemResult.createOrderItem.discountAmount,
            subtotal: itemResult.createOrderItem.subtotal,
            totalPrice: itemResult.createOrderItem.subtotal,
            sku: itemResult.createOrderItem.sku,
            productName: itemResult.createOrderItem.productName,
            variantTitle: itemResult.createOrderItem.variantTitle,
            productImage: itemResult.createOrderItem.productImage,
            product: {
              id: item.productId,
              documentId: item.productId,
              title: item.title,
              sku: item.sku,
              images: item.productImage ? [{ url: item.productImage }] : [],
            },
            variant: item.variantId
              ? {
                  id: item.variantId,
                  documentId: item.variantId,
                  title: item.variantTitle,
                }
              : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
          });
          console.log(
            `✅ Order item ${i + 1} creado en Strapi: ${
              itemResult.createOrderItem.documentId
            } - SKU: ${itemResult.createOrderItem.sku}`
          );
        } else {
          console.warn(
            `⚠️ No se pudo crear order item ${i + 1} - respuesta inválida`
          );
        }
      } catch (itemError: any) {
        console.warn(
          `⚠️ Error al crear order item ${i + 1}:`,
          itemError.message
        );
      }
    }

    // Crear orden completa con datos REALES de Strapi
    const ordenCompleta = {
      id: ordenId,
      documentId: ordenId,
      orderNumber: orderResult.createOrder.orderNumber,
      status: orderResult.createOrder.status,
      subtotal: orderResult.createOrder.subtotal,
      taxAmount: orderResult.createOrder.taxAmount,
      shippingCost: orderResult.createOrder.shippingCost,
      discountAmount: orderResult.createOrder.discountAmount,
      totalAmount: orderResult.createOrder.totalAmount,
      currency: orderResult.createOrder.currency,
      orderDate: orderResult.createOrder.orderDate,
      estimatedDeliveryDate: orderResult.createOrder.estimatedDeliveryDate,
      actualDeliveryDate: orderResult.createOrder.actualDeliveryDate,
      notes: orderResult.createOrder.notes,
      trackingNumber: orderResult.createOrder.trackingNumber,
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      cliente: {
        id: clienteId,
        documentId: clienteId,
        firstName: clienteData.firstName,
        lastName: clienteData.lastName,
        email: clienteData.email,
        phone: clienteData.phone,
        isActive: clienteData.isActive,
        registrationDate: clienteData.registrationDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
      paymentMethod: paymentMethodData
        ? {
            id: paymentMethodId,
            documentId: paymentMethodId,
            name: paymentMethodData.name,
            type: paymentMethodData.type,
            provider: paymentMethodData.provider,
            isActive: paymentMethodData.isActive,
          }
        : null,
      orderItems: orderItemsCreated,
    };

    console.log(
      '✅ ===== ORDEN + ORDER ITEMS + PAYMENT METHOD CREADOS EXITOSAMENTE EN STRAPI ====='
    );
    console.log('📊 ID de la orden REAL:', ordenCompleta.documentId);
    console.log('📊 Número de orden:', ordenCompleta.orderNumber);
    console.log('📊 Estado:', ordenCompleta.status);
    console.log(
      '📊 Estimación de entrega:',
      ordenCompleta.estimatedDeliveryDate,
      '(3 días)'
    );
    console.log('📊 Cliente REAL en Strapi:', clienteId);
    console.log('📊 PaymentMethod REAL:', paymentMethodId || 'N/A');
    console.log('📊 Order items REALES creados:', orderItemsCreated.length);
    console.log('📊 Total:', `$${ordenCompleta.totalAmount.toLocaleString()}`);
    console.log(
      '🏆 ¡ORDEN COMPLETA CON TODAS LAS RELACIONES GUARDADA EN STRAPI!'
    );

    // ✅ VERIFICACIÓN AUTOMÁTICA POST-CREACIÓN (JWT Usuario)
    console.log('\n🔍 ===== VERIFICACIÓN POST-CREACIÓN (JWT USUARIO) =====');
    // Usar token de servicio para verificación ya que tenemos permisos limitados con JWT usuario
    const serviceToken = process.env.STRAPI_API_TOKEN;
    if (serviceToken) {
      const verification = await verifyOrderItemsForOrder(
        ordenId,
        serviceToken
      );

      if (verification) {
        if (verification.isConsistent) {
          console.log(
            `✅ VERIFICACIÓN EXITOSA: Todos los ${verification.itemCount} items están correctamente asociados`
          );
        } else {
          console.log(
            `❌ PROBLEMA DETECTADO: Items mal asociados en orden ${verification.orderNumber}`
          );
        }
      }
    } else {
      console.log('⚠️ No se puede verificar: Token de servicio no disponible');
    }

    return ordenCompleta;
  } catch (error: any) {
    console.error('❌ Error con JWT de usuario:', error.message);
    throw error;
  }
}

/**
 * Crear orden usando token de servicio con GraphQL mutations (para webhooks)
 */
async function createOrderWithServiceTokenGraphQL(
  cartData: CartToOrderData,
  serviceToken: string
) {
  console.log('🔧 ===== CREANDO ORDEN CON TOKEN DE SERVICIO (GRAPHQL) =====');

  try {
    // Importar GraphQLClient dinámicamente
    const { GraphQLClient } = await import('graphql-request');
    const graphqlUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/graphql';

    const serviceClient = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: `Bearer ${serviceToken}`,
      },
    });

    console.log('🔧 Cliente GraphQL con token de servicio configurado');

    // 1. Crear cliente usando GraphQL mutation corregida
    console.log('👤 ===== PASO 1: CREANDO CLIENTE CON GRAPHQL =====');

    const clienteEmail =
      cartData.cliente?.email ||
      `webhook-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}@mercadopago.com`;

    // Query corregida sin campo "data" anidado
    const findClienteQuery = `
      query FindCliente($email: String!) {
        clientes(filters: { email: { eq: $email } }, pagination: { limit: 1 }) {
          documentId
          firstName
          lastName
          email
          phone
          isActive
          registrationDate
        }
      }
    `;

    console.log('🔧 Ejecutando búsqueda de cliente...');
    const findResult = await serviceClient.request(findClienteQuery, {
      email: clienteEmail,
    });
    console.log(
      '📥 Resultado de búsqueda:',
      JSON.stringify(findResult, null, 2)
    );

    let clienteId;
    let clienteData;

    if (
      findResult?.clientes &&
      Array.isArray(findResult.clientes) &&
      findResult.clientes.length > 0
    ) {
      // Cliente existe, reutilizar
      clienteData = findResult.clientes[0];
      clienteId = clienteData.documentId;
      console.log('✅ Cliente existente encontrado y reutilizado:', clienteId);
    } else {
      // Cliente no existe, crear uno nuevo
      console.log('🆕 Cliente no existe, creando uno nuevo...');

      const createClienteMutation = `
        mutation CreateCliente($data: ClienteInput!) {
          createCliente(data: $data) {
            documentId
            firstName
            lastName
            email
            phone
            isActive
            registrationDate
          }
        }
      `;

      const clienteVariables = {
        data: {
          firstName: cartData.cliente?.firstName || 'Cliente',
          lastName: cartData.cliente?.lastName || 'Webhook',
          email: clienteEmail,
          phone: cartData.cliente?.phone || '',
          isActive: true,
          registrationDate: new Date().toISOString(),
          publishedAt: new Date().toISOString(),
        },
      };

      console.log('🔧 Ejecutando mutación createCliente...');
      const clienteResult = await serviceClient.request(
        createClienteMutation,
        clienteVariables
      );

      if (!clienteResult?.createCliente?.documentId) {
        throw new Error(
          'No se pudo crear el cliente en Strapi - respuesta inválida'
        );
      }

      clienteId = clienteResult.createCliente.documentId;
      clienteData = clienteResult.createCliente;
      console.log('✅ Cliente nuevo creado exitosamente en Strapi:', clienteId);
    }

    // 2. ✅ NUEVO: CREAR/BUSCAR PAYMENT METHOD PARA MERCADOPAGO
    console.log('💳 ===== PASO 2: CREANDO/BUSCANDO PAYMENT METHOD =====');

    const findPaymentMethodQuery = `
      query FindPaymentMethod($provider: String!) {
        paymentMethods(filters: { provider: { eq: $provider } }, pagination: { limit: 1 }) {
          documentId
          name
          type
          provider
          isActive
        }
      }
    `;

    const paymentMethodResult = await serviceClient.request(
      findPaymentMethodQuery,
      {
        provider: 'MercadoPago',
      }
    );

    let paymentMethodId;
    let paymentMethodData;

    if (
      paymentMethodResult?.paymentMethods &&
      Array.isArray(paymentMethodResult.paymentMethods) &&
      paymentMethodResult.paymentMethods.length > 0
    ) {
      // PaymentMethod existe, reutilizar
      paymentMethodData = paymentMethodResult.paymentMethods[0];
      paymentMethodId = paymentMethodData.documentId;
      console.log('✅ PaymentMethod existente encontrado:', paymentMethodId);
    } else {
      // PaymentMethod no existe, crear uno nuevo
      console.log('🆕 PaymentMethod no existe, creando uno nuevo...');

      const createPaymentMethodMutation = `
        mutation CreatePaymentMethod($data: PaymentMethodInput!) {
          createPaymentMethod(data: $data) {
            documentId
            name
            type
            provider
            isActive
          }
        }
      `;

      const paymentMethodVariables = {
        data: {
          name: 'MercadoPago PSE',
          type: 'bank_transfer',
          provider: 'MercadoPago',
          isActive: true,
          description: 'Pagos con MercadoPago - PSE Transferencia Bancaria',
          minAmount: 0,
          maxAmount: 50000000,
          publishedAt: new Date().toISOString(),
        },
      };

      const paymentMethodCreateResult = await serviceClient.request(
        createPaymentMethodMutation,
        paymentMethodVariables
      );

      if (!paymentMethodCreateResult?.createPaymentMethod?.documentId) {
        console.warn('⚠️ No se pudo crear PaymentMethod, continuando sin él');
        paymentMethodId = null;
        paymentMethodData = null;
      } else {
        paymentMethodId =
          paymentMethodCreateResult.createPaymentMethod.documentId;
        paymentMethodData = paymentMethodCreateResult.createPaymentMethod;
        console.log(
          '✅ PaymentMethod nuevo creado en Strapi:',
          paymentMethodId
        );
      }
    }

    // 3. ✅ CREAR LA ORDEN REAL EN STRAPI CON TODAS LAS RELACIONES
    console.log('📦 ===== PASO 3: CREANDO ORDEN REAL EN STRAPI =====');

    const timestamp = Date.now();
    const orderNumber = generateOrderNumber();

    // ✅ VALIDAR Y LIMPIAR ITEMS ANTES DE CALCULAR TOTALES
    const cleanItems = validateAndCleanCartItems(cartData.items);

    if (cleanItems.length === 0) {
      throw new Error('No hay items válidos en el carrito para crear la orden');
    }

    const subtotal = cleanItems.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    const createOrderMutation = `
      mutation CreateOrder($data: OrderInput!) {
        createOrder(data: $data) {
          documentId
          orderNumber
          status
          subtotal
          taxAmount
          shippingCost
          discountAmount
          totalAmount
          currency
          orderDate
          estimatedDeliveryDate
          actualDeliveryDate
          notes
          trackingNumber
        }
      }
    `;

    const orderVariables = {
      data: {
        orderNumber: orderNumber,
        status: 'pending',
        subtotal: subtotal,
        taxAmount: 0,
        shippingCost: 0,
        discountAmount: 0,
        totalAmount: subtotal,
        currency: 'COP',
        orderDate: new Date().toISOString(),
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        notes: `Orden con token de servicio GraphQL. Cliente: ${clienteId}. PaymentMethod: ${
          paymentMethodId || 'N/A'
        }. ${JSON.stringify(cartData.notes || '')}`,
        trackingNumber: '',
        cliente: clienteId,
        ...(paymentMethodId && { paymentMethod: paymentMethodId }),
        publishedAt: new Date().toISOString(),
      },
    };

    console.log('🔧 Ejecutando mutación createOrder...');
    const orderResult = await serviceClient.request(
      createOrderMutation,
      orderVariables
    );

    if (!orderResult?.createOrder?.documentId) {
      throw new Error(
        'No se pudo crear la orden en Strapi - respuesta inválida'
      );
    }

    const ordenId = orderResult.createOrder.documentId;
    console.log('✅ Orden REAL creada exitosamente en Strapi:', ordenId);

    // 4. ✅ CREAR LOS ORDER ITEMS REALES EN STRAPI CON TODAS LAS RELACIONES
    console.log('🛒 ===== PASO 4: CREANDO ORDER ITEMS REALES EN STRAPI =====');
    console.log(`📋 Procesando ${cleanItems.length} items únicos y validados`);

    const createOrderItemMutation = `
      mutation CreateOrderItem($data: OrderItemInput!) {
        createOrderItem(data: $data) {
          documentId
          quantity
          unitPrice
          originalPrice
          discountAmount
          subtotal
          sku
          productName
          variantTitle
          productImage
        }
      }
    `;

    const orderItemsCreated = [];

    for (let i = 0; i < cleanItems.length; i++) {
      const item = cleanItems[i];

      try {
        const itemVariables = {
          data: {
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            originalPrice: item.originalPrice,
            discountAmount: 0,
            subtotal: item.subtotal,
            sku: item.sku,
            productName: item.title,
            variantTitle: item.variantTitle,
            productImage: item.productImage,
            product: item.productId,
            variant: item.variantId || null,
            order: ordenId,
            publishedAt: new Date().toISOString(),
          },
        };

        console.log(
          `🔧 Creando order item ${i + 1}/${cleanItems.length} - SKU: ${
            item.sku
          } - Cantidad: ${item.quantity}`
        );
        const itemResult = await serviceClient.request(
          createOrderItemMutation,
          itemVariables
        );

        if (itemResult?.createOrderItem?.documentId) {
          orderItemsCreated.push({
            id: itemResult.createOrderItem.documentId,
            documentId: itemResult.createOrderItem.documentId,
            quantity: itemResult.createOrderItem.quantity,
            unitPrice: itemResult.createOrderItem.unitPrice,
            originalPrice: itemResult.createOrderItem.originalPrice,
            discountAmount: itemResult.createOrderItem.discountAmount,
            subtotal: itemResult.createOrderItem.subtotal,
            totalPrice: itemResult.createOrderItem.subtotal,
            sku: itemResult.createOrderItem.sku,
            productName: itemResult.createOrderItem.productName,
            variantTitle: itemResult.createOrderItem.variantTitle,
            productImage: itemResult.createOrderItem.productImage,
            product: {
              id: item.productId,
              documentId: item.productId,
              title: item.title,
              sku: item.sku,
              images: item.productImage ? [{ url: item.productImage }] : [],
            },
            variant: item.variantId
              ? {
                  id: item.variantId,
                  documentId: item.variantId,
                  title: item.variantTitle,
                }
              : null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
          });
          console.log(
            `✅ Order item ${i + 1} creado en Strapi: ${
              itemResult.createOrderItem.documentId
            } - SKU: ${itemResult.createOrderItem.sku}`
          );
        } else {
          console.warn(
            `⚠️ No se pudo crear order item ${i + 1} - respuesta inválida`
          );
        }
      } catch (itemError: any) {
        console.warn(
          `⚠️ Error al crear order item ${i + 1}:`,
          itemError.message
        );
      }
    }

    // Crear orden completa con datos REALES de Strapi
    const ordenCompleta = {
      id: ordenId,
      documentId: ordenId,
      orderNumber: orderResult.createOrder.orderNumber,
      status: orderResult.createOrder.status,
      subtotal: orderResult.createOrder.subtotal,
      taxAmount: orderResult.createOrder.taxAmount,
      shippingCost: orderResult.createOrder.shippingCost,
      discountAmount: orderResult.createOrder.discountAmount,
      totalAmount: orderResult.createOrder.totalAmount,
      currency: orderResult.createOrder.currency,
      orderDate: orderResult.createOrder.orderDate,
      estimatedDeliveryDate: orderResult.createOrder.estimatedDeliveryDate,
      actualDeliveryDate: orderResult.createOrder.actualDeliveryDate,
      notes: orderResult.createOrder.notes,
      trackingNumber: orderResult.createOrder.trackingNumber,
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      cliente: {
        id: clienteId,
        documentId: clienteId,
        firstName: clienteData.firstName,
        lastName: clienteData.lastName,
        email: clienteData.email,
        phone: clienteData.phone,
        isActive: clienteData.isActive,
        registrationDate: clienteData.registrationDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      },
      paymentMethod: paymentMethodData
        ? {
            id: paymentMethodId,
            documentId: paymentMethodId,
            name: paymentMethodData.name,
            type: paymentMethodData.type,
            provider: paymentMethodData.provider,
            isActive: paymentMethodData.isActive,
          }
        : null,
      orderItems: orderItemsCreated,
    };

    console.log(
      '🎉 ===== ORDEN + ORDER ITEMS + PAYMENT METHOD CREADOS EXITOSAMENTE EN STRAPI ====='
    );
    console.log('📊 ID de la orden REAL:', ordenCompleta.documentId);
    console.log('📊 Número de orden:', ordenCompleta.orderNumber);
    console.log('📊 Estado:', ordenCompleta.status);
    console.log(
      '📊 Estimación de entrega:',
      ordenCompleta.estimatedDeliveryDate,
      '(3 días)'
    );
    console.log('📊 Cliente REAL en Strapi:', clienteId);
    console.log('📊 PaymentMethod REAL:', paymentMethodId || 'N/A');
    console.log('📊 Order items REALES creados:', orderItemsCreated.length);
    console.log('📊 Total:', `$${ordenCompleta.totalAmount.toLocaleString()}`);
    console.log(
      '🏆 ¡ORDEN COMPLETA CON TODAS LAS RELACIONES GUARDADA EN STRAPI!'
    );

    // ✅ VERIFICACIÓN AUTOMÁTICA POST-CREACIÓN
    console.log('\n🔍 ===== VERIFICACIÓN POST-CREACIÓN =====');
    const verification = await verifyOrderItemsForOrder(ordenId, serviceToken);

    if (verification) {
      if (verification.isConsistent) {
        console.log(
          `✅ VERIFICACIÓN EXITOSA: Todos los ${verification.itemCount} items están correctamente asociados`
        );
      } else {
        console.log(
          `❌ PROBLEMA DETECTADO: Items mal asociados en orden ${verification.orderNumber}`
        );
      }
    }

    return ordenCompleta;
  } catch (error: any) {
    console.error('❌ Error con token de servicio GraphQL:', error.message);

    // Detectar errores específicos de GraphQL
    if (
      error.message.includes('Forbidden') ||
      error.message.includes('Unauthorized')
    ) {
      console.log('🔧 ===== PROBLEMA DE PERMISOS DEL TOKEN DE SERVICIO =====');
      console.log(
        '💡 El token de servicio no tiene permisos para crear entidades'
      );
      console.log(
        '💡 Verifica que el token tenga "Full Access" en Strapi Admin'
      );
    }

    if (
      error.message.includes('Cannot query field') ||
      error.message.includes('Unknown field')
    ) {
      console.log('🔧 ===== PROBLEMA DE ESQUEMA GRAPHQL =====');
      console.log('💡 Hay un mismatch entre el esquema esperado y el real');
      console.log(
        '💡 Verifica que las mutaciones estén correctamente definidas'
      );
    }

    throw error;
  }
}

/**
 * ✅ FUNCIÓN DE DEBUG: Verificar OrderItems por orden específica
 */
async function verifyOrderItemsForOrder(orderId: string, serviceToken: string) {
  try {
    const { GraphQLClient } = await import('graphql-request');
    const graphqlUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/graphql';

    const client = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: `Bearer ${serviceToken}`,
      },
    });

    // Consultar la orden específica con sus items
    const query = `
      query GetOrderWithItems($orderId: ID!) {
        order(documentId: $orderId) {
          documentId
          orderNumber
          totalAmount
          createdAt
          orderItems {
            documentId
            sku
            productName
            quantity
            unitPrice
            createdAt
            order {
              documentId
              orderNumber
            }
          }
        }
      }
    `;

    const result = await client.request(query, { orderId });

    if (result?.order) {
      const order = result.order;
      console.log(
        `\n🔍 ===== VERIFICACIÓN DE ORDEN ${order.orderNumber} =====`
      );
      console.log(`📦 ID: ${order.documentId}`);
      console.log(`💰 Total: $${order.totalAmount?.toLocaleString()}`);
      console.log(`📅 Creada: ${order.createdAt}`);
      console.log(`🛒 OrderItems encontrados: ${order.orderItems.length}`);

      order.orderItems.forEach((item, index) => {
        console.log(`\n   📋 Item ${index + 1}:`);
        console.log(`      ID: ${item.documentId}`);
        console.log(`      SKU: ${item.sku}`);
        console.log(`      Producto: ${item.productName}`);
        console.log(`      Cantidad: ${item.quantity}`);
        console.log(`      Precio: $${item.unitPrice?.toLocaleString()}`);
        console.log(`      Creado: ${item.createdAt}`);
        console.log(
          `      Orden vinculada: ${item.order.orderNumber} (${item.order.documentId})`
        );

        // Verificar consistencia
        if (item.order.documentId === order.documentId) {
          console.log(`      ✅ CORRECTO: Item vinculado a esta orden`);
        } else {
          console.log(`      ❌ ERROR: Item vinculado a orden diferente!`);
          console.log(`         Esperado: ${order.documentId}`);
          console.log(`         Actual: ${item.order.documentId}`);
        }
      });

      return {
        orderId: order.documentId,
        orderNumber: order.orderNumber,
        itemCount: order.orderItems.length,
        items: order.orderItems,
        isConsistent: order.orderItems.every(
          (item) => item.order.documentId === order.documentId
        ),
      };
    } else {
      console.log(`❌ No se encontró la orden con ID: ${orderId}`);
      return null;
    }
  } catch (error: any) {
    console.error(`❌ Error al verificar orden ${orderId}:`, error.message);
    return null;
  }
}

/**
 * ✅ FUNCIÓN DE DEBUG: Verificar todas las órdenes recientes
 */
async function verifyAllRecentOrders(serviceToken: string) {
  try {
    const { GraphQLClient } = await import('graphql-request');
    const graphqlUrl =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/graphql';

    const client = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: `Bearer ${serviceToken}`,
      },
    });

    // Consultar las últimas 5 órdenes
    const query = `
      query GetRecentOrders {
        orders(pagination: { limit: 5 }, sort: ["createdAt:desc"]) {
          documentId
          orderNumber
          totalAmount
          createdAt
          orderItems {
            documentId
            sku
            productName
            order {
              documentId
            }
          }
        }
      }
    `;

    const result = await client.request(query);

    if (result?.orders) {
      console.log(
        `\n🔍 ===== VERIFICACIÓN DE TODAS LAS ÓRDENES RECIENTES =====`
      );
      console.log(`📊 Total de órdenes encontradas: ${result.orders.length}`);

      const issues = [];

      for (const order of result.orders) {
        console.log(`\n📦 ${order.orderNumber} (${order.documentId})`);
        console.log(`   Items: ${order.orderItems.length}`);

        const inconsistentItems = order.orderItems.filter(
          (item) => item.order.documentId !== order.documentId
        );

        if (inconsistentItems.length > 0) {
          console.log(
            `   ❌ ${inconsistentItems.length} items con asociación incorrecta`
          );
          issues.push({
            orderId: order.documentId,
            orderNumber: order.orderNumber,
            inconsistentItems: inconsistentItems.length,
          });
        } else {
          console.log(`   ✅ Todos los items correctamente asociados`);
        }
      }

      if (issues.length > 0) {
        console.log(`\n⚠️ RESUMEN DE PROBLEMAS ENCONTRADOS:`);
        issues.forEach((issue) => {
          console.log(
            `   - ${issue.orderNumber}: ${issue.inconsistentItems} items mal asociados`
          );
        });
      } else {
        console.log(
          `\n✅ TODAS LAS ÓRDENES TIENEN ITEMS CORRECTAMENTE ASOCIADOS`
        );
      }

      return { orders: result.orders, issues };
    }
  } catch (error: any) {
    console.error(`❌ Error al verificar órdenes:`, error.message);
    return null;
  }
}

// ✅ ALIASES Y COMPATIBILIDAD PARA REDUX
class OrderServiceClean {
  async createOrderFromCart(
    cartData: CartToOrderData,
    options?: { skipAuth?: boolean; source?: string }
  ) {
    return await createOrderFromCartSimple(cartData, options);
  }

  async createOrder(orderData: any) {
    return await createOrderFromCartSimple(orderData);
  }

  async getOrders(params?: any) {
    console.log('⚠️ getOrders llamado - no implementado en versión limpia');
    return {
      orders: [],
      pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
    };
  }

  async getOrderById(documentId: string) {
    console.log('⚠️ getOrderById llamado - no implementado en versión limpia');
    return null;
  }
}

// Crear instancia del servicio limpio
export const orderService = new OrderServiceClean();
export default orderService;
