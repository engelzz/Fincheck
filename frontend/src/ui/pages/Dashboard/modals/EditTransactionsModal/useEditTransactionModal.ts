import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Transaction } from "../../../../../app/entities/Transasction";
import { transactionsService } from "../../../../../app/services/TransactionsService/transactionsService";
import { useBankAccounts } from "../../../../../hooks/useBankAccounts";
import { useCategories } from "../../../../../hooks/useCategories";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";

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

export function useEditTransactionController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      value: transaction?.value,
      name: transaction?.name,
      date: transaction ? new Date(transaction?.date) : new Date(),
    }
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateTransaction,
    isLoading,
  } = useMutation(transactionsService.update)

  const {
    isLoading: isLoadingDelete,
    mutateAsync: removeTransaction
  } = useMutation(transactionsService.remove);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});

      toast.success(
        transaction?.type === 'EXPENSE'
        ? "Despesa editada com sucesso!"
        : "Receita editada com sucesso!"
      );

      onClose();
    } catch {
       toast.error(
        transaction?.type === 'EXPENSE'
        ? "Erro ao editar a despesa!"
        : "Erro ao editar a receita!"
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction]);

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions']});
      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});

      toast.success('Transação deletada com sucesso!');
      onClose();
    } catch {
      toast.error('Erro ao deletar a transação!')
    }
  }


  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    handleDeleteTransaction,
    isLoadingDelete,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  }
}
