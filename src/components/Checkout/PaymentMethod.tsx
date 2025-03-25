"use client";
import React from "react";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";

// Inicializa Mercado Pago con tu Public Key de prueba
initMercadoPago("TEST-3f03751f-5689-4435-b898-d029d605de3f");

const PaymentBrickExample = () => {
  // Configuración de inicialización: monto y preferencia (reemplaza <PREFERENCE_ID> por el id real)
  const initialization = {
    amount: 10000, // Monto en la moneda que corresponda
    preferenceId: "bankTransfer",
  };

  // Configuración de personalización: define qué métodos de pago mostrar
  const customization = {
    paymentMethods: {
      ticket: "all",
   bankTransfer: "all",
   creditCard: "all",
   prepaidCard: "all",
   debitCard: "all",
   mercadoPago: "all",
    },
  };

  // Callback que se ejecuta al enviar el formulario del Brick
  const onSubmit = async ({ selectedPaymentMethod, formData }: { selectedPaymentMethod: any; formData: any }) => {
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Resultado del pago:", response);
          resolve(response);
        })
        .catch((error) => {
          console.error("Error al procesar el pago:", error);
          reject(error);
        });
    });
  };

  // Callback para manejar errores en el Brick
  const onError = async (error: any) => {
    console.error("Error en Payment Brick:", error);
  };

  // Callback que se ejecuta cuando el Brick está listo
  const onReady = async () => {
    console.log("Payment Brick listo");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Brick Example</h2>
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onError={onError}
        onReady={onReady}
      />
    </div>
  );
};

export default PaymentBrickExample;
