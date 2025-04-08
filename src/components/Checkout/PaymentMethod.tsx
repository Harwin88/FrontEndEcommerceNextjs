"use client";

import React, { useState, useEffect } from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import { useAppSelector } from "@/redux/store";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import Checkout from ".";
import {FormData} from "./types/formbilling"

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!, { locale: "es-CO" });

const PaymentBrick = ({shippingCoste, dataForm }) => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  useEffect(() => {
    const createPreference = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/create_preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataForm,
            items: cartItems.map((item) => ({
              id: item.id,
              title: item.title,
              price: Number(item.price) + Number(shippingCoste),
              quantity: item.quantity,
            })),
            successUrl: "https://qrzq2bsn-3000.use.devtunnels.ms/mail-success",
            failureUrl: "https://qrzq2bsn-3000.use.devtunnels.ms/failure",
            pendingUrl: "https://qrzq2bsn-3000.use.devtunnels.ms/pending",
            notificationUrl: "https://qrzq2bsn-3000.use.devtunnels.ms/api/mercadopago/webhook",
          }),
        });

        const data = await response.json();
        if (data.preference_id) {
          setPreferenceId(data.preference_id);
        } else {
          setError("No se pudo obtener el preference_id");
        }
      } catch (error) {
        console.error("Error al obtener el preference_id:", error);
        setError("Error al comunicarse con Mercado Pago.");
      } finally {
        setLoading(false);
      }
    };

    if (cartItems.length > 0 && totalPrice > 0) {
      createPreference();
    } else {
      setLoading(false);
    }
  }, [cartItems, totalPrice]);

  const initialization = {
    amount: Number(totalPrice) > 0 ? Number(totalPrice) : 1,
    preferenceId,
  };

  const customization = {
    paymentMethods: {
      wallet_purchase: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      atm: "all",
      maxInstallments: 12,
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: any; formData: any }) => {
    return new Promise((resolve, reject) => {
      fetch("/api/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Resultado del pago:", response);
          
        if (response.transaction_details.external_resource_url) {
          // 🔁 Redireccionar al callback_url
          window.location.href = response.transaction_details.external_resource_url;
        }
          resolve(response);
        })
        .catch((error) => {
          console.error("Error al procesar el pago:", error);
          reject(error);
        });
    });
  };

  const onCashOnDelivery = () => {
    setCashOnDelivery(true);
    console.log("Pago contra entrega seleccionado");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bloque de pago</h2>
      {loading ? (
        <p>Cargando opciones de pago...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {preferenceId && (
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
            />
          )}
          <div className="mt-4">
            <button
              onClick={onCashOnDelivery}
              className="bg-blue-500  px-4 py-2 rounded w-full random border-2 border-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Pago contra entrega
            </button>
            {cashOnDelivery && <p className="text-green-500 mt-2">Pago contra entrega seleccionado</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentBrick;
