import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const TRANSACTION_TYPES = ["ENTRADA", "SAIDA"] as const;


export const transactionSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),

  value: z.coerce.number({
    message: "O valor deve ser um número"
  }).positive("O valor deve ser maior que zero"),

  type: z.enum(["ENTRADA", "SAIDA"], {
    message: "Selecione o tipo"
  }),

  categoryId: z.string()
    .min(1, "Selecione uma categoria"),

  date: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    "Data inválida"
  ),

  description: z.string()
    .trim()
    .max(500, "Máximo de 500 caracteres")
    .optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export function useTransactionForm() {
  return useForm<TransactionFormData>({
    // Forçamos o tipo do resolver para calar o TypeScript nesse conflito de inferência do coerce
    resolver: zodResolver(transactionSchema) as any,
    defaultValues: {
      name: "",
      value: undefined,
      type: "ENTRADA",
      categoryId: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });
}