import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { authService } from "../../../app/services/AuthService/auth.Service.ts";
import { SignupParams } from "../../../app/services/AuthService/signup.ts";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "E-mail é obrigatório").email('Informe um e-mail válido'),
  password: z.string().min(1, 'Senha é obrigatória').min(8, 'A senha precisa conter no mínimo 8 caracteres'),
});

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      toast.success('Conta criada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao criar sua conta')
    }
  })

  return { register, errors, handleSubmit, isPending }
}
