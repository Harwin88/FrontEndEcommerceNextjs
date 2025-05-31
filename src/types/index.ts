// ✅ User & Authentication Types
export interface User {
  id: string;
  email: string;
  username: string;
  confirmed: boolean;
  blocked: boolean;
  role: UserRole;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// ✅ Product Types
export interface Product {
  id: string;
  name: string;
  description: string[];
  images: string[];
  variants: ProductVariant[];
  category?: Category;
}

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  attributes: ProductAttribute[];
}

export interface ProductAttribute {
  name: string;
  value: string;
}

// ✅ Category Types
export interface Category {
  documentId: string;
  name: string;
  slug: string;
  urlImagen?: string;
  parent?: Category | null;
  children?: Category[];
}

// ✅ Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: Record<string, string>;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

// ✅ Payment Types
export interface PaymentData {
  token?: string;
  transaction_amount: number;
  installments?: number;
  payment_method_id: string;
  payer: PayerInfo;
  description?: string;
  external_reference?: string;
  transaction_details?: {
    financial_institution?: string;
  };
}

export interface PayerInfo {
  email: string;
  name?: string;
  surname?: string;
  phone?: {
    area_code?: string;
    number?: string;
  };
  identification?: {
    type: string;
    number: string;
  };
  entity_type?: string;
}

// ✅ AGREGADO: Payment Response Types
export interface PaymentResponse {
  id: string | null;
  status:
    | 'pending'
    | 'approved'
    | 'authorized'
    | 'in_process'
    | 'in_mediation'
    | 'rejected'
    | 'cancelled'
    | 'refunded'
    | 'charged_back'
    | null;
  status_detail: string | null;
  payment_type_id: string | null;
  payment_method_id: string | null;
  transaction_amount: number | null;
  external_reference: string | null;
  callback_url: string | null;
  payer: {
    id: string | null;
    email: string | null;
  };
  transaction_details: {
    external_resource_url: string | null;
    bank_transfer_id: string | null;
    financial_institution: string | null;
  };
  date_created: string | null;
  date_approved: string | null;
  money_release_date: string | null;
  operation_type: string | null;
  fee_details: any[];
}

export interface PaymentInfo {
  id: string | null;
  status: string | null;
  status_detail: string | null;
  payment_type_id: string | null;
  payment_method_id: string | null;
  transaction_amount: number | null;
  external_reference: string | null;
  callback_url: string | null;
  payer_id: string | null;
  transaction_details: {
    external_resource_url: string | null;
    bank_transfer_id: string | null;
  };
}

// ✅ API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ✅ Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BillingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// ✅ UI State Types
export interface ModalState {
  isOpen: boolean;
  content?: React.ReactNode;
}

export interface ToastState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// ✅ Redux State Types
export interface RootState {
  quickViewReducer: {
    isOpen: boolean;
    value: Product | null;
  };
  cartReducer: {
    items: CartItem[];
  };
  wishlistReducer: {
    items: Product[];
  };
  productDetailsReducer: {
    value: Product | null;
  };
  products: {
    products: Record<string, Record<number, Product[]>>;
    loading: boolean;
    error: string | null;
  };
  categories: {
    categories: Category[];
    loading: boolean;
    error: string | null;
  };
  auth: AuthState;
  billingForm: {
    formData: BillingFormData;
    isEditing: boolean;
  };
  payment: {
    data: PaymentInfo | null;
  };
  ordersReducer: {
    orders: any[];
    currentOrder: any | null;
    loading: boolean;
    submitting: boolean;
    deleting: boolean;
    error: string | null;
    validationErrors: any[];
    filters: any;
    searchTerm: string;
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
    checkoutData: any | null;
    checkoutStep: 'customer' | 'shipping' | 'payment' | 'review' | 'success';
    clientes: any[];
    direccionesEnvio: any[];
  };
}

// ✅ Utility Types
export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

// ✅ Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ProductCardProps extends BaseComponentProps {
  product: Product;
  onAddToCart?: (product: Product, variant: ProductVariant) => void;
  onAddToWishlist?: (product: Product) => void;
}

// ✅ Environment Variables Types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY: string;
      MERCADO_PAGO_ACCESS_TOKEN: string;
      MERCADOPAGO_ACCESS_TOKEN: string;
      MERCADO_PAGO_APP_ID: string;
      JWT_SECRET: string;
      API_KEY: string;
      API_URL: string;
    }
  }
}
