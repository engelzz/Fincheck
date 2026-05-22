import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { Transaction } from '../../../../../app/entities/Transasction';
import { transactionsService } from '../../../../../app/services/TransactionsService/transactionsService';
import { useBankAccounts } from '../../../../../hooks/useBankAccounts';
import { useCategories } from '../../../../../hooks/useCategories';
import { currencyStringToNumber } from '../../../../../utils/currencyStringToNumber';

const schema = z.object({
  value: z.union([z.string().min(1, 'Informe o valor'), z.number()]),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModal(transaction: Transaction | null, onClose: () => void) {
  const { control, handleSubmit: hookFormSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId ?? '',
      categoryId: transaction?.categoryId ?? '',
      value: transaction?.value ?? 0,
      name: transaction?.name ?? '',
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { isPending: isLoading, mutateAsync: updateTransaction } = useMutation({
    mutationFn: transactionsService.update,
  });

  const { isPending: isLoadingDelete, mutateAsync: removeTransaction } = useMutation({
    mutationFn: transactionsService.remove,
  });

  const categories = useMemo(
    () => categoriesList.filter((c) => c.type === transaction?.type),
    [categoriesList, transaction],
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      Toast.show({
        type: 'success',
        text1: transaction?.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!',
      });
      onClose();
    } catch {
      Toast.show({
        type: 'error',
        text1: transaction?.type === 'EXPENSE'
          ? 'Erro ao editar a despesa!'
          : 'Erro ao editar a receita!',
      });
    }
  });

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      Toast.show({ type: 'success', text1: 'Transação deletada com sucesso!' });
      onClose();
    } catch {
      Toast.show({ type: 'error', text1: 'Erro ao deletar a transação!' });
    }
  }

  return {
    control,
    errors,
    handleSubmit,
    isLoading,
    accounts,
    categories,
    isDeleteModalOpen,
    handleOpenDeleteModal: () => setIsDeleteModalOpen(true),
    handleCloseDeleteModal: () => setIsDeleteModalOpen(false),
    handleDeleteTransaction,
    isLoadingDelete,
  };
}
