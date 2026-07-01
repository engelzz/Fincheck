import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import { showToast } from "../components/Toasts/toastConfig";
import { z } from "zod";
import { authService } from "../../app/services/AuthService/auth.Service.ts";
import { SignupParams } from "../../app/services/AuthService/signup";
import { useAuth } from "../../hooks/useAuth";



const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z.string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      showToast.success('Conta criada com sucesso!');

      signin(accessToken);
    } catch {
      showToast.error('Erro ao criar conta!');
    }
  });

  return { register, errors, handleSubmit, isLoading, control };
}
