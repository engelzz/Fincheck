import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { transactionsService } from "../../../../../app/services/TransactionsService/transactionsService";
import { useBankAccounts } from "../../../../../hooks/useBankAccounts";
import { useCategories } from "../../../../../hooks/useCategories";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  value: z.union([
    z.string().min(1, 'Informe o valor'),
    z.number(),
  ]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta '),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useNewTransactionController() {
  const {
     closeNewTransactionModal,
     isNewTransactionModalOpen,
     newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});

      toast.success(
        newTransactionType === 'EXPENSE'
        ? "Despesa cadastrada com sucesso!"
        : "Receita Cadastrada com sucesso!"
      );

      closeNewTransactionModal();
      reset();
    } catch {
       toast.error(
        newTransactionType === 'EXPENSE'
        ? "Erro ao cadastrar a despesa!"
        : "Erro ao cadastrar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType]);

  return {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
  }
}
