import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { bankAccountsService } from "../../../../../app/services/BankAccountsService/bankAccountsService";
import { currencyStringToNumber } from "../../../../../utils/currencyStringToNumber";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.string().min(1, 'Saldo inicial é obrigatório'),
  name: z.string().min(1, 'Nome da Conta é obrigatória'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH']),
  color: z.string().min(1, 'Cor é obrigatória'),
})

type FormData = z.infer<typeof schema>;

export function useNewAccountController() {
  const {
     closeNewAccountModal,
     isNewAccountModalOpen,
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
  const { isLoading, mutateAsync } = useMutation(bankAccountsService.create);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts']});
      toast.success('Conta cadastrada com sucesso!');
      closeNewAccountModal();
      reset();
    } catch {
      toast.error('Erro ao criar a conta!')
    }
  });

  return {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  }
}
