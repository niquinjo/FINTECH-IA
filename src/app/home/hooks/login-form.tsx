import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string({ message: "O e-mail é obrigatório" }).trim().email({ message: "Precisa ser um e-mail válido" }),
  password: z.string({ message: "A senha é obrigatória" }).min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
})

export type LoginFormData = z.infer<typeof loginSchema>

export function useLoginForm() {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })
}