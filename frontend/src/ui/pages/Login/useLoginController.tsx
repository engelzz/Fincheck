import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { authService } from "../../../app/services/AuthService/auth.Service.ts";
import { SigninParams } from "../../../app/services/AuthService/signin.ts";
import { useAuth } from "../../../hooks/useAuth.ts";

type FormData = z.infer<typeof schema>

const schema = z.object({
  email: z.string().min(1, "O e-mail é obrigatório").email('Informe um e-mail válido'),
  password: z.string().min(1, 'A senha é obrigatória').min(8, 'A senha precisa conter no mínimo 8 caracteres'),
})

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      authService.signin(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error('Credenciais inválida')
    }
  })

  return { handleSubmit, register, errors, isPending };
}
