import { gql } from 'graphql-request';

// ===== MUTATIONS =====
export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      orderDate
      createdAt
      updatedAt
      cliente {
        documentId
        firstName
        lastName
        email
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($documentId: ID!, $data: OrderInput!) {
    updateOrder(documentId: $documentId, data: $data) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      taxAmount
      shippingCost
      discountAmount
      updatedAt
    }
  }
`;

export const UPDATE_ORDER_STATUS = 'UpdateOrderStatus';

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem($data: OrderItemInput!) {
    createOrderItem(data: $data) {
      documentId
      quantity
      unitPrice
      subtotal
      product {
        documentId
        Name
      }
      order {
        documentId
        orderNumber
      }
    }
  }
`;

export const UPDATE_ORDER_ITEM = gql`
  mutation UpdateOrderItem($documentId: ID!, $data: OrderItemInput!) {
    updateOrderItem(documentId: $documentId, data: $data) {
      documentId
      quantity
      unitPrice
      subtotal
    }
  }
`;

export const DELETE_ORDER_ITEM = gql`
  mutation DeleteOrderItem($documentId: ID!) {
    deleteOrderItem(documentId: $documentId) {
      documentId
    }
  }
`;

export const CREATE_CLIENTE = gql`
  mutation CreateCliente($data: ClienteInput!) {
    createCliente(data: $data) {
      documentId
      firstName
      lastName
      email
      phone
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CLIENTE = gql`
  mutation UpdateCliente($documentId: ID!, $data: ClienteInput!) {
    updateCliente(documentId: $documentId, data: $data) {
      documentId
      firstName
      lastName
      email
      phone
      isActive
      updatedAt
    }
  }
`;

export const CREATE_DIRECCION_ENVIO = gql`
  mutation CreateDireccionEnvio($data: DireccionEnvioInput!) {
    createDireccionEnvio(data: $data) {
      documentId
      firstName
      lastName
      addressLine1
      addressLine2
      city
      state
      postalCode
      country
      phone
      email
      isDefault
      cliente {
        documentId
        firstName
        lastName
      }
    }
  }
`;

export const UPDATE_DIRECCION_ENVIO = gql`
  mutation UpdateDireccionEnvio($documentId: ID!, $data: DireccionEnvioInput!) {
    updateDireccionEnvio(documentId: $documentId, data: $data) {
      documentId
      firstName
      lastName
      addressLine1
      addressLine2
      city
      state
      postalCode
      country
      phone
      email
      isDefault
    }
  }
`;

export const UPDATE_SHIPPING_INFO = gql`
  mutation UpdateShippingInfo(
    $orderId: ID!
    $methodId: ID!
    $trackingNumber: String!
    $cost: Float!
  ) {
    updateOrder(
      id: $orderId
      data: {
        shippingMethod: $methodId
        trackingNumber: $trackingNumber
        shippingCost: $cost
      }
    ) {
      data {
        id
        attributes {
          trackingNumber
          shippingCost
          shippingMethod {
            data {
              attributes {
                name
                estimatedDays
              }
            }
          }
        }
      }
    }
  }
`;

export const APPLY_COUPON_TO_ORDER = 'ApplyCouponToOrder';
export const APPLY_DESCUENTO_TO_ORDER = 'ApplyDescuentoToOrder';
export const CREATE_ORDER_HISTORY = 'CreateOrderHistory';
export const PROCESS_CHECKOUT = 'ProcessCheckout';

// ===== QUERIES =====
export const GET_ORDERS = gql`
  query GetOrders(
    $filters: OrderFiltersInput
    $pagination: PaginationArg
    $sort: [String]
  ) {
    orders(filters: $filters, pagination: $pagination, sort: $sort) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      orderDate
      createdAt
      updatedAt
      cliente {
        documentId
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_ORDER_BY_ID = gql`
  query GetOrderById($documentId: ID!) {
    order(documentId: $documentId) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      taxAmount
      shippingCost
      discountAmount
      orderDate
      estimatedDeliveryDate
      notes
      trackingNumber
      createdAt
      updatedAt
      cliente {
        documentId
        firstName
        lastName
        email
        phone
      }
      shippingAddress {
        documentId
        firstName
        lastName
        addressLine1
        addressLine2
        city
        state
        postalCode
        country
        phone
        email
      }
    }
  }
`;

export const GET_ORDERS_BY_CLIENTE = gql`
  query GetOrdersByCliente(
    $clienteId: ID!
    $pagination: PaginationArg
    $sort: [String]
  ) {
    orders(
      filters: { cliente: { documentId: { eq: $clienteId } } }
      pagination: $pagination
      sort: $sort
    ) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      orderDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLIENTES = gql`
  query GetClientes($filters: ClienteFiltersInput, $pagination: PaginationArg) {
    clientes(filters: $filters, pagination: $pagination) {
      documentId
      firstName
      lastName
      email
      phone
      isActive
      totalOrders
      totalSpent
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLIENTE_BY_ID = gql`
  query GetClienteById($documentId: ID!) {
    cliente(documentId: $documentId) {
      documentId
      firstName
      lastName
      email
      phone
      birthDate
      customerType
      isActive
      totalOrders
      totalSpent
      createdAt
      updatedAt
      direccion_envios {
        documentId
        firstName
        lastName
        addressLine1
        addressLine2
        city
        state
        postalCode
        country
        phone
        email
        isDefault
      }
    }
  }
`;

export const GET_DIRECCIONES_ENVIO = gql`
  query GetDireccionesEnvio($filters: DireccionEnvioFiltersInput) {
    direccionEnvios(filters: $filters) {
      documentId
      firstName
      lastName
      addressLine1
      addressLine2
      city
      state
      postalCode
      country
      phone
      email
      isDefault
      cliente {
        documentId
        firstName
        lastName
      }
    }
  }
`;

export const GET_ORDER_ITEMS = gql`
  query GetOrderItems($filters: OrderItemFiltersInput) {
    orderItems(filters: $filters) {
      documentId
      quantity
      unitPrice
      subtotal
      product {
        documentId
        Name
        Description
        variants {
          documentId
          Title
          Sku
          price
          stock
        }
      }
      order {
        documentId
        orderNumber
        PrecioTotal
      }
    }
  }
`;

export const GET_COUPONS = 'GetCoupons';
export const VALIDATE_COUPON = 'ValidateCoupon';
export const GET_DESCUENTOS = 'GetDescuentos';
export const GET_PAYMENT_METHODS = 'GetPaymentMethods';
export const GET_SHIPPING_METHODS = 'GetShippingMethods';
export const GET_ORDER_HISTORY = 'GetOrderHistory';
export const SEARCH_ORDERS = gql`
  query SearchOrders($search: String!, $pagination: PaginationArg) {
    orders(
      filters: {
        or: [
          { orderNumber: { containsi: $search } }
          { cliente: { firstName: { containsi: $search } } }
          { cliente: { lastName: { containsi: $search } } }
          { cliente: { email: { containsi: $search } } }
        ]
      }
      pagination: $pagination
      sort: ["createdAt:desc"]
    ) {
      documentId
      orderNumber
      status
      subtotal
      totalAmount
      orderDate
      createdAt
      cliente {
        documentId
        firstName
        lastName
        email
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($filters: ProductFiltersInput) {
    products(filters: $filters) {
      documentId
      Name
      Description
      slug
      Url_imagen {
        Imagen
        Name
      }
      variants {
        documentId
        Title
        Sku
        price
        stock
        attributes {
          Name
          value
        }
      }
      categories {
        documentId
        Name
        slug
      }
    }
  }
`;

export const GET_VARIANTS = gql`
  query GetVariants($filters: VariantFiltersInput) {
    variants(filters: $filters) {
      documentId
      Title
      Sku
      price
      stock
      attributes {
        Name
        value
      }
      product_parent {
        documentId
        Name
      }
      empresa {
        documentId
        Nombre
      }
    }
  }
`;
