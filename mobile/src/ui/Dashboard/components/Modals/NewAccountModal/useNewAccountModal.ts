import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { z } from 'zod';
import { bankAccountsService } from '../../../../../app/services/BankAccountsService/bankAccountsService';
import { currencyStringToNumber } from '../../../../../utils/currencyStringToNumber';
import { useDashboard } from '../../DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const {
    control,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: '0,00',
      type: 'CHECKING',
      color: '',
      name: '',
    },
  });

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync } = useMutation({
    mutationFn: bankAccountsService.create,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      Toast.show({ type: 'success', text1: 'Conta cadastrada com sucesso!' });
      closeNewAccountModal();
      reset();
    } catch {
      Toast.show({ type: 'error', text1: 'Erro ao criar a conta!' });
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    control,
    errors,
    handleSubmit,
    isLoading,
  };
}
