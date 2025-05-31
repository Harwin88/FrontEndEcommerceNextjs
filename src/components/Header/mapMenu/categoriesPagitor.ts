import client from '@/graphql/client';
import { GetCategoriesAllDocument } from '@/graphql/generated/graphql';
import { setCategories } from '@/redux/features/categoriesSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export const useFetchAllCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const fetchCategories = async () => {
    if (categories.length > 0) {
      return categories; // Si ya está en Redux, retorna directamente
    }

    try {
      let page = 1;
      let allCategories: any[] = [];
      let hasMore = true;

      while (hasMore) {
        const result = await client
          .query(
            GetCategoriesAllDocument,
            { page },
            { requestPolicy: 'network-only' }
          )
          .toPromise();

        if (result.error) {
          console.warn(
            `⚠️ Error fetching categories (page ${page}):`,
            result.error.message
          );
          // Si es la primera página y hay error, retornar array vacío
          if (page === 1) {
            return [];
          }
          // Si hay error en páginas posteriores, retornar lo que se tiene
          break;
        }

        const newCategories = result.data?.categories ?? [];
        allCategories.push(...newCategories);

        hasMore = newCategories.length > 0;
        page++;
      }

      dispatch(setCategories(allCategories)); // Guardar en Redux
      return allCategories;
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      // Retornar array vacío en caso de error para no romper la UI
      return [];
    }
  };

  return fetchCategories;
};
