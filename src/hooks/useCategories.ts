import { useQuery } from "urql";
import { GetCategoriesDocument } from "@/graphql/generated/graphql";

export const useCategories = () => {
  const [{ data, fetching, error }] = useQuery({ query: GetCategoriesDocument });

  return { categories: data?.categories ?? [], fetching, error };
};
