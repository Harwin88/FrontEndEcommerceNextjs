import React, { useState } from "react";
import Image from "next/image";

const ShippingMethod = ({ setShippingMethodCoste }) => {
  const [shippingMethod, setShippingMethod] = useState(null);

  const handleSelect = (method, cost) => {
    setShippingMethod(method);
    setShippingMethodCoste(cost);
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px] mt-7.5">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Metodos de Envio</h3>
      </div>

      <div className="p-4 sm:p-8.5">
        <div className="flex flex-col gap-4">

          {/* Envío Gratis */}
          <label htmlFor="free" className="flex cursor-pointer items-center gap-3.5">
            <div className="relative">
              <input
                type="checkbox"
                name="free"
                id="free"
                className="sr-only"
                checked={shippingMethod === "free"}
                onChange={() => handleSelect("free", 0)}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "free"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>
            <span>Si compras más de $200.000 COP, el envío es gratis en Colombia.</span>
          </label>

          {/* FedEx */}
          <label htmlFor="fedex" className="flex cursor-pointer items-center gap-3.5">
            <div className="relative">
              <input
                type="checkbox"
                name="fedex"
                id="fedex"
                className="sr-only"
                checked={shippingMethod === "fedex"}
                onChange={() => handleSelect("fedex", 16000)}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "fedex"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div className="rounded-md border-[0.5px] py-3.5 px-5 hover:bg-gray-2">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image
                    src="/images/checkout/fedex.svg"
                    alt="fedex"
                    width={64}
                    height={18}
                  />
                </div>
                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">$16.000</p>
                  <p className="text-custom-xs">Por kg</p>
                </div>
              </div>
            </div>
          </label>

          {/* DHL */}
          <label htmlFor="dhl" className="flex cursor-pointer items-center gap-3.5">
            <div className="relative">
              <input
                type="checkbox"
                name="dhl"
                id="dhl"
                className="sr-only"
                checked={shippingMethod === "dhl"}
                onChange={() => handleSelect("dhl", 15000)}
              />
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                  shippingMethod === "dhl"
                    ? "border-4 border-blue"
                    : "border border-gray-4"
                }`}
              ></div>
            </div>

            <div className="rounded-md border-[0.5px] py-3.5 px-5 hover:bg-gray-2">
              <div className="flex items-center">
                <div className="pr-4">
                  <Image
                    src="/images/checkout/dhl.svg"
                    alt="dhl"
                    width={64}
                    height={20}
                  />
                </div>
                <div className="border-l border-gray-4 pl-4">
                  <p className="font-semibold text-dark">$15.000</p>
                  <p className="text-custom-xs">Por kg</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;