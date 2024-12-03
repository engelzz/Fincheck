import { useQuery } from "@tanstack/react-query";
import { TransactionsFilters } from "../app/services/TransactionsService/getAll";
import { transactionsService } from "../app/services/TransactionsService/transactionsService";

export function useTransactions(filters: TransactionsFilters) {
   const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  }
}
