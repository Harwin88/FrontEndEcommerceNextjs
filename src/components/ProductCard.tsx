import React from "react";

interface ProductProps {
  name: string;
  images: string[];
  description: string[];
  variants: {
    sku: string;
    name: string;
    price: number;
    stock: number;
    attributes: { name: string; value: string }[];
  }[];
}

const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      {/* Imágenes */}
      <div className="flex gap-2 overflow-x-auto">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.name} className="h-32 w-32 object-cover rounded-md" />
        ))}
      </div>

      {/* Nombre */}
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>

      {/* Descripción */}
      <p className="text-gray-600 text-sm mt-1">
        {product.description.slice(0, 2).join(" ")}... {/* Mostrar solo 2 párrafos */}
      </p>

      {/* Variantes */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold">Variantes:</h3>
        {product.variants.map((variant) => (
          <div key={variant.sku} className="border rounded p-2 mt-2">
            <p><strong>{variant.name}</strong> - ${variant.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Stock: {variant.stock}</p>
            <ul className="text-sm mt-1">
              {variant.attributes.map((attr, index) => (
                <li key={index}>
                  <strong>{attr.name}:</strong> {attr.value}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
