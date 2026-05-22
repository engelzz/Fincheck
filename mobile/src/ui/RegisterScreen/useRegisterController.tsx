import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
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

      Toast.show({
        type: "success",
        text1: "Conta criada com sucesso!",
        text2: "Bem-vindo ao Fincheck.",
      });

      signin(accessToken);
    } catch {
      Toast.show({
        type: "error",
        text1: "Erro ao criar conta",
        text2: "Ocorreu um erro ao criar a sua conta!",
      });
    }
  });

  return { register, errors, handleSubmit, isLoading, control };
}
