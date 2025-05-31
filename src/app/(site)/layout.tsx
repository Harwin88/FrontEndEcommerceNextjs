'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '../css/euclid-circular-a-font.css';
import '../css/style.css';
import { Toaster } from '@/components/ui/toaster';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

import { ModalProvider } from '../context/QuickViewModalContext';
import { CartModalProvider } from '../context/CartSidebarModalContext';
import { ReduxProvider } from '@/redux/provider';
import { PreviewSliderProvider } from '../context/PreviewSliderContext';

import ScrollToTop from '@/components/Common/ScrollToTop';
import SkeletonLayout from '@/components/Common/layoutSkeletor';
import { Provider } from 'urql';
import client from '@/graphql/client';

// ✅ AGREGADO: Dynamic imports para componentes pesados
const QuickViewModal = dynamic(
  () => import('@/components/Common/QuickViewModal'),
  {
    ssr: false,
    loading: () => <div className="modal-loading">Cargando...</div>,
  }
);

const CartSidebarModal = dynamic(
  () => import('@/components/Common/CartSidebarModal'),
  {
    ssr: false,
    loading: () => <div className="modal-loading">Cargando carrito...</div>,
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ErrorBoundary>
          {loading ? (
            <SkeletonLayout />
          ) : (
            <>
              <ReduxProvider>
                <Provider value={client}>
                  <CartModalProvider>
                    <ModalProvider>
                      <PreviewSliderProvider>
                        <ErrorBoundary
                          fallback={
                            <div className="p-4 text-center">
                              <p>Error en el header. Recargando...</p>
                            </div>
                          }
                        >
                          <Header />
                        </ErrorBoundary>

                        <ErrorBoundary
                          fallback={
                            <div className="min-h-screen flex items-center justify-center">
                              <p>Error cargando el contenido principal.</p>
                            </div>
                          }
                        >
                          {children}
                        </ErrorBoundary>

                        <Toaster />

                        <QuickViewModal />
                        <CartSidebarModal />
                      </PreviewSliderProvider>
                    </ModalProvider>
                  </CartModalProvider>
                </Provider>
              </ReduxProvider>
              <ScrollToTop />
              <Footer />
            </>
          )}
        </ErrorBoundary>
      </body>
    </html>
  );
}
