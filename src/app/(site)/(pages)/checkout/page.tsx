import { Metadata } from 'next';
import CheckoutWrapper from './CheckoutWrapper';

export const metadata: Metadata = {
  title: 'Checkout Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Checkout Page for NextCommerce Template',
  // other metadata
};

const CheckoutPage = () => {
  return (
    <main>
      <CheckoutWrapper />
    </main>
  );
};

export default CheckoutPage;
