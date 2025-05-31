'use client';

import CheckoutWithOrders from '@/components/Checkout/CheckoutWithOrders';
import { useRouter } from 'next/navigation';

const NewCheckoutPage = () => {
  const router = useRouter();

  return (
    <main>
      <CheckoutWithOrders
        onSuccess={(orderId) => {
          console.log('✅ Orden completa creada exitosamente:', orderId);
          alert(`¡Orden creada exitosamente! ID: ${orderId}`);
          // Opcional: redirigir a página de confirmación
          // router.push(`/order-success?orderId=${orderId}`);
        }}
        onCancel={() => {
          console.log('❌ Checkout cancelado por el usuario');
          router.push('/');
        }}
      />
    </main>
  );
};

export default NewCheckoutPage;
