import client from "@/graphql/client";
import { GetCategoriesAllDocument } from "@/graphql/generated/graphql";
import { RootState, AppDispatch } from "@/redux/store";
import { setCategories } from "@/redux/features/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";

export const useFetchAllCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const fetchCategories = async () => {
    if (categories.length > 0) {
      return categories; // Si ya está en Redux, retorna directamente
    }

    let page = 1;
    let allCategories: any[] = [];
    let hasMore = true;

    while (hasMore) {
      const result = await client
        .query(GetCategoriesAllDocument, { page }, { requestPolicy: "network-only" })
        .toPromise();

      if (result.error) {
        throw new Error(`Error fetching categories: ${result.error.message}`);
      }

      const newCategories = result.data?.categories ?? [];
      allCategories.push(...newCategories);

      hasMore = newCategories.length > 0;
      page++;
    }

    dispatch(setCategories(allCategories)); // Guardar en Redux
    return allCategories;
  };

  return fetchCategories;
};
