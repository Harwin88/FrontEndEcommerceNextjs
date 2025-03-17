import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import client from "@/graphql/client";
import { GetProductsByCategoryDocument } from "@/graphql/generated/graphql";
import { setProducts } from "@/redux/features/productsSlice";

export const useFetchProductsByCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const fetchProducts = async (slug: string, page: number, pageSize: number) => {
    const cachedProducts = products[slug]?.[page];

    if (cachedProducts) {
      return cachedProducts; // Evita consultas innecesarias si ya están en Redux
    }

    const result = await client
      .query(
        GetProductsByCategoryDocument,
        { slug, page, pageSize },
        { requestPolicy: "network-only" }
      )
      .toPromise();

    if (result.error) {
      throw new Error(`Error fetching products: ${result.error.message}`);
    }

    const newProducts = result.data?.products?.map((product: any) => ({
      name: product.Name,
      images: product.Url_imagen.map((img: any) => img.Imagen),
      description: product.Description.map((desc: any) =>
        desc.children.map((child: any) => child.text).join(" ")
      ),
      variants: product.variants.map((variant: any) => ({
        sku: variant.Sku,
        name: variant.product,
        price: variant.price,
        stock: variant.stock,
        attributes: variant.attributes.map((attr: any) => ({
          name: attr.Name,
          value: attr.value,
        })),
      })),
    }));

    dispatch(setProducts({ slug, page, products: newProducts }));
    return newProducts;
  };

  return fetchProducts;
};
