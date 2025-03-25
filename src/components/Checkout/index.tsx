"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import CardPaymentComponent from "./PaymentMethod"; // Importa el componente de pago con tarjeta

const Checkout = () => {
  const [showCardPayment, setShowCardPayment] = useState(false);

  const handleShowCardPayment = () => {
    setShowCardPayment(true);
  };

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              <div className="lg:max-w-[670px] w-full">
                <Login />
                <Billing />
                <Shipping />
              </div>

              <div className="max-w-[455px] w-full">
                <Coupon />
                <ShippingMethod />
                <PaymentMethod />

                {/* Botón para redirigir al Checkout Pro de Mercado Pago */}
                <button
                  type="button"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark mt-7.5"
                  // Aquí se mantendría tu método de redirección
                >
                  Pagar con Mercado Pago
                </button>

                {/* Botón para activar el pago con tarjeta de prueba */}
                <button
                  type="button"
                  onClick={handleShowCardPayment}
                  className="w-full flex justify-center font-medium text-white bg-green-500 py-3 px-6 rounded-md hover:bg-green-600 mt-4"
                >
                  Pagar con Tarjeta de Prueba
                </button>

                {/* Renderizar el formulario de pago con tarjeta */}
                {showCardPayment && <CardPaymentComponent />}
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
