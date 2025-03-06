import { useQuery } from "urql";
import { GetCategoriesAllDocument } from "@/graphql/generated/graphql";

export const useCategories = () => {
  const [{ data, fetching, error }] = useQuery({ query: GetCategoriesAllDocument });
   console.log("data categorias", data);
  return { categories: data?.categorias ?? [], fetching, error };
};
