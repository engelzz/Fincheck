import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { transactionsService } from '../../../../../app/services/TransactionsService/transactionsService';
import { useBankAccounts } from '../../../../../hooks/useBankAccounts';
import { useCategories } from '../../../../../hooks/useCategories';
import { currencyStringToNumber } from '../../../../../utils/currencyStringToNumber';
import { useDashboard } from '../../DashboardContext/useDashboard';

const schema = z.object({
  value: z.string().min(1, 'Informe o valor'),
  name: z.string().min(1, 'Informe o nome'),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a conta'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0,00',
      name: '',
      categoryId: '',
      bankAccountId: '',
      date: new Date(),
    },
  });

  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const categories = useMemo(
    () => categoriesList.filter((c) => c.type === newTransactionType),
    [categoriesList, newTransactionType],
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      Toast.show({
        type: 'success',
        text1: newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      });
      closeNewTransactionModal();
      reset();
    } catch {
      Toast.show({
        type: 'error',
        text1: newTransactionType === 'EXPENSE'
          ? 'Erro ao cadastrar a despesa!'
          : 'Erro ao cadastrar a receita!',
      });
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    control,
    errors,
    handleSubmit,
    isLoading,
    accounts,
    categories,
  };
}
