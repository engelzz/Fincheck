import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../app/services/BankAccountsService/bankAccountsService";

export function useBankAccounts() {
  const { data = [], isFetching } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  });

  return { accounts: data ?? [] , isFetching }
}
