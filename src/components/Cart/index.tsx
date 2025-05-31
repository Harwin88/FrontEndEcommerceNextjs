'use client';
import React from 'react';
import Discount from './Discount';
import OrderSummary from './OrderSummary';
import { useCartManager } from '@/hooks/useCartManager';
import SingleItem from './SingleItem';
import Breadcrumb from '../Common/Breadcrumb';
import Link from 'next/link';

const Cart = () => {
  const {
    cartItems,
    isEmpty,
    clearCart,
    getCartSummary,
    detectStaleCart,
    clearStaleData
  } = useCartManager();

  // Limpiar datos obsoletos al cargar el componente
  React.useEffect(() => {
    if (detectStaleCart()) {
      console.log('🧹 Detectado carrito obsoleto, limpiando datos antiguos...');
      clearStaleData();
    }
  }, [detectStaleCart, clearStaleData]);

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar tu carrito de compras?')) {
      clearCart();
      console.log('🧹 Carrito vaciado por el usuario');
    }
  };

  return (
    <>
      {/* <!-- ===== Breadcrumb Section Start ===== --> */}
      <section>
        <Breadcrumb title={'Cart'} pages={['Cart']} />
      </section>
      {/* <!-- ===== Breadcrumb Section End ===== --> */}
      {!isEmpty ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">
                Your Cart ({getCartSummary()})
              </h2>
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-800 hover:underline transition-colors"
              >
                Clear Shopping Cart
              </button>
            </div>
            <div className="flex flex-wrap justify-between gap-7.5">
              <div className="w-full lg:max-w-[608px]">
                <div className="rounded-lg border border-gray-3 bg-white p-4 sm:p-8">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <SingleItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full lg:max-w-[424px]">
                <OrderSummary />
                <Discount />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 text-center">
            <div className="bg-white rounded-lg p-12">
              <div className="mb-6">
                <svg
                  className="mx-auto w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5m0 0h4.4M15 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-gray-800 mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-600 mb-8">
                Agrega algunos productos a tu carrito para verlos aquí.
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
