'use client';

import { useAppSelector } from '@/redux/store';
import { selectTotalPrice } from '@/redux/features/cart-slice';
import Breadcrumb from '../Common/Breadcrumb';
import Login from './Login';
import Shipping from './Shipping';
import ShippingMethod from './ShippingMethod';
import PaymentBrick from './PaymentMethod';
import Coupon from './Coupon';
import Billing from './Billing';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Checkout = () => {
  const router = useRouter();
  const { protectRoute, isAuthenticated } = useAuthRedirect();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [shippingMethodCoste, setShippingMethodCoste] = useState(null);
  const [shippingMethodShow, setShippingMethodShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ AGREGADO: Protección de ruta - solo usuarios autenticados
  useEffect(() => {
    const checkAuth = () => {
      const isAllowed = protectRoute('/checkout');
      if (isAllowed) {
        setIsLoading(false);
      }
    };

    // Pequeño delay para permitir que el estado de auth se inicialice
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [protectRoute]);

  // ✅ AGREGADO: Limpiar parámetros de URL al cargar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.search) {
        // Si hay parámetros de query, limpiar la URL
        router.replace('/checkout', undefined);
      }
    }
  }, [router]);

  // En el state:
  const [dataForm, setDataForm] = useState({
    firstName: '',
    lastName: '',
    countryRegion: '',
    address: '',
    town: '',
    phone: '',
    email: '',
    documentType: '',
    documentNumber: '',
    companyName: '',
    addressTwo: '',
    country: '',
    createAccount: false,
  });

  const handleDataFormChange = (name, value) => {
    console.log('teste checkout', name, value);
    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormComplete = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'town',
      'phone',
      'email',
      'documentType',
      'documentNumber',
    ];

    const check = requiredFields.map((field) => ({
      field,
      value: dataForm[field],
      isValid:
        typeof dataForm[field] === 'string'
          ? dataForm[field].trim().length > 0
          : Boolean(dataForm[field]),
    }));

    console.table(check);

    return check.every((item) => item.isValid);
  };

  return (
    <>
      {/* ✅ AGREGADO: Pantalla de carga mientras se verifica autenticación */}
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-2">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando acceso...</p>
          </div>
        </div>
      ) : (
        <>
          <Breadcrumb title={'Checkout'} pages={['checkout']} />
          <section className="overflow-hidden py-20 bg-gray-2">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
                <div className="lg:max-w-[670px] w-full">
                  <Login />
                  <Billing
                    dataForm={dataForm}
                    onDataFormChange={handleDataFormChange}
                    setShippingMethodShow={setShippingMethodShow}
                  />
                  {shippingMethodShow || isFormComplete() ? (
                    <ShippingMethod
                      setShippingMethodCoste={setShippingMethodCoste}
                    />
                  ) : (
                    <p className="text-red-500">
                      Para poder selecionar un metodo de envio es necesario que
                      llene todo el formularo
                    </p>
                  )}
                  {isFormComplete() && shippingMethodCoste !== null ? (
                    <PaymentBrick
                      shippingCoste={shippingMethodCoste}
                      dataForm={dataForm}
                    />
                  ) : (
                    <p className="text-red-500">
                      Por favor completa todos los campos requeridos para
                      continuar el proceso de pago.
                    </p>
                  )}

                  <Shipping />
                </div>

                <div className="max-w-[455px] w-full">
                  <div className="border-t border-gray-3 pt-5">
                    <h3 className="text-lg font-medium">Resumen del Pedido</h3>
                    {cartItems.map((item, key) => (
                      <div key={key} className="flex justify-between py-2">
                        <span>{item.title}</span>
                        <span>${item.discountedPrice * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium text-lg mt-3">
                      <span>Total:</span>
                      <span>
                        ${Number(totalPrice) + Number(shippingMethodCoste)}
                      </span>
                    </div>
                  </div>
                  <Coupon />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Checkout;
