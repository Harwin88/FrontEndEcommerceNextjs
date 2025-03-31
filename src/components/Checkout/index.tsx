"use client";

import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import CardPaymentComponent from "./PaymentMethod";
import { useState } from "react";

const Checkout = () => {
  const [showCardPayment, setShowCardPayment] = useState(false);
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);

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
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShowCardPayment}
                  className="w-full flex justify-center font-medium text-white bg-green-500 py-3 px-6 rounded-md hover:bg-green-600 mt-4"
                >
                  Pagar con Tarjeta de Prueba
                </button>

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