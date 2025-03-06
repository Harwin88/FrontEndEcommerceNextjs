import React from "react";
import ProductDetail from "@/components/Common/ProductDetail";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Product detalle",
  description: "Detalle del producto",
  // other metadata
};
const product = {
  title: "Havit HV-G69 USB Gamepad",
  reviews: 15,
  price: 59.0,
  discountedPrice: 29.0,
  id: 1,
  imgs: {
    thumbnails: [
      "/images/products/product-1-sm-1.png",
      "/images/products/product-1-sm-2.png",
    ],
    previews: [
      "/images/products/product-1-bg-1.png",
      "/images/products/product-1-bg-2.png",
    ],
  },
  description: "Gamepad para PC Gamepad para PC Gamepad para PC Gamepad para PC",
};
const Product = () => {
 
  return (
    <main>
      <ProductDetail product={product} />
    </main>
  );
};

export default Product;
