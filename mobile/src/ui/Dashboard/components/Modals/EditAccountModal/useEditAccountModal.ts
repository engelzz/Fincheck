import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { showToast } from '../../../../components/Toasts/toastConfig';
import { z } from 'zod';
import { bankAccountsService } from '../../../../../app/services/BankAccountsService/bankAccountsService';
import { currencyStringToNumber } from '../../../../../utils/currencyStringToNumber';
import { useDashboard } from '../../DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, 'Saldo inicial é obrigatório'),
    z.number(),
  ]),
  name: z.string().min(1, 'Nome da conta é obrigatório'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModal() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { control, handleSubmit: hookFormSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      color: accountBeingEdited?.color ?? '',
      name: accountBeingEdited?.name ?? '',
      type: accountBeingEdited?.type ?? 'CHECKING',
      initialBalance: accountBeingEdited?.initialBalance ?? 0,
    },
  });

  useEffect(() => {
    if (accountBeingEdited) {
      reset({
        color: accountBeingEdited.color,
        name: accountBeingEdited.name,
        type: accountBeingEdited.type,
        initialBalance: accountBeingEdited.initialBalance,
      });
    }
  }, [accountBeingEdited, reset]);

  const queryClient = useQueryClient();

  const { isPending: isLoading, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update,
  });

  const { isPending: isLoadingDelete, mutateAsync: removeAccount } = useMutation({
    mutationFn: bankAccountsService.remove,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeEditAccountModal();
      showToast.success('Conta editada com sucesso!');
    } catch {
      showToast.error('Erro ao salvar as alterações!');
    }
  });

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      closeEditAccountModal();
      showToast.success('Conta deletada com sucesso!');
    } catch {
      showToast.error('Erro ao deletar a conta!');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    control,
    errors,
    handleSubmit,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal: () => setIsDeleteModalOpen(true),
    handleCloseDeleteModal: () => setIsDeleteModalOpen(false),
    handleDeleteAccount,
    isLoadingDelete,
  };
}
