import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../app/services/CategoriesService/categoriesService";

export function useCategories() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll
  });

  return { categories: data ?? [] , isFetching }
}
