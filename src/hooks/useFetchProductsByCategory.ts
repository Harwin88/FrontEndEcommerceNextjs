import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '@/redux/store';
import client from '@/graphql/client';
import { GetProductsByCategoryDocument } from '@/graphql/generated/graphql';
import { setProducts } from '@/redux/features/productsSlice';

// ✅ AGREGADO: Configuración de cache
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en millisegundos

// ✅ AGREGADO: Funciones de cache con TTL
const getCacheKey = (slug: string, page: number, pageSize: number) =>
  `products-${slug}-${page}-${pageSize}`;

const getCachedData = (cacheKey: string) => {
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
      // Cache expirado, eliminar
      localStorage.removeItem(cacheKey);
    }
  } catch (error) {
    console.warn('Error reading cache:', error);
  }
  return null;
};

const setCachedData = (cacheKey: string, data: any) => {
  try {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn('Error setting cache:', error);
  }
};

export const useFetchProductsByCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const fetchProducts = useCallback(
    async (slug: string, page: number, pageSize: number) => {
      const cacheKey = getCacheKey(slug, page, pageSize);

      // ✅ MEJORADO: Verificar cache de Redux primero
      const cachedProducts = products[slug]?.[page];
      if (cachedProducts) {
        return cachedProducts;
      }

      // ✅ AGREGADO: Verificar cache de localStorage con TTL
      const localCachedData = getCachedData(cacheKey);
      if (localCachedData) {
        // Actualizar Redux con datos del localStorage
        dispatch(setProducts({ slug, page, products: localCachedData }));
        return localCachedData;
      }

      try {
        // ✅ MEJORADO: Fetch con mejor manejo de errores
        const result = await client
          .query(
            GetProductsByCategoryDocument,
            { slug, page, pageSize },
            { requestPolicy: 'cache-first' } // Cambiado de "network-only" a "cache-first"
          )
          .toPromise();

        if (result.error) {
          throw new Error(`Error fetching products: ${result.error.message}`);
        }

        const newProducts =
          result.data?.products?.map((product: any) => ({
            name: product.Name,
            images: product.Url_imagen.map((img: any) => img.Imagen),
            description: product.Description.map((desc: any) =>
              desc.children.map((child: any) => child.text).join(' ')
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
          })) || [];

        // ✅ AGREGADO: Guardar en ambos caches
        dispatch(setProducts({ slug, page, products: newProducts }));
        setCachedData(cacheKey, newProducts);

        return newProducts;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },
    [dispatch, products]
  );

  return fetchProducts;
};
