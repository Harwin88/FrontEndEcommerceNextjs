import React from "react";
import OrderSucces from "@/components/OrderSucces";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Order procesada con exito | NextCommerce Nextjs E-commerce template",
  description: "Order Procesada con exito",
  // other metadata
};

const OrderSuccessPage = () => {
  return (
    <main>
      <OrderSucces />
    </main>
  );
};

export default OrderSuccessPage;
