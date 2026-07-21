import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string({ message: "O nome precisa ser um texto" }).trim().min(3, { message: "O nome deve conter no mínimo 3 caracteres" }).max(50, { message: "O nome deve conter no máximo 50 caracteres" }),
  email: z.string({ message: "O e-mail é obrigatório" }).trim().email({ message: "Precisa ser um e-mail válido" }),
  password: z.string({ message: "A senha é obrigatória" }).min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),

  confirmPassword: z.string({ message: "A confirmação da senha é obrigatória" }).min(8, { message: "A confirmação da senha deve conter no mínimo 8 caracteres" })
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  }
);

export type RegisterFormData = z.infer<typeof registerSchema>

export function useRegisterForm() {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })
}