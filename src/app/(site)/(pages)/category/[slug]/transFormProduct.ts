// utils/transformProduct.ts
import { Product } from "@/types/product";

export const transformProducts = (externalData: any[]): Product[] => {
 if (externalData.length === 0) {
    return []; // Retorna un array vacío si no hay datos
  }
  return externalData.map((prod, index) => {
    // Suponemos que se usa la primera variante para extraer el precio.
    const variant = prod.variants && prod.variants.length > 0 ? prod.variants[0] : null;
     console.log("protrass000000000222", prod);
    return {
      title: prod.title, // De "name" a "title"
      reviews: 0, // Si no existe, se puede asignar 0 o algún valor por defecto
      price: variant?.price || 0,
      // Aquí puedes definir la lógica de precio con descuento. Por ejemplo, un 10% de descuento:
      discountedPrice: variant?.price ? variant.price * 0.9 : 0,
      id: index, // Si no cuentas con un id, puedes usar el índice o algún otro valor único
      imgs: {
        thumbnails: prod.images || [],
        previews: prod.images || [],
      },
      description: prod.Description, // Suponiendo que la descripción está en el segundo bloque de texto
    };
  });
};
