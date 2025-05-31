import React from 'react';
import CheckoutWithRedux from '@/components/Checkout/CheckoutWithRedux';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout Redux + GraphQL | NextCommerce',
  description:
    'Checkout usando el sistema Redux + GraphQL siguiendo el patrón de registro de usuarios',
};

const CheckoutReduxPage: React.FC = () => {
  return (
    <main>
      <CheckoutWithRedux />
    </main>
  );
};

export default CheckoutReduxPage;
