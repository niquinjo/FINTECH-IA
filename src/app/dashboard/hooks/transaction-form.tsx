import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const TRANSACTION_TYPES = ["ENTRADA", "SAIDA"] as const;

export const transactionSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),

  value: z.coerce
    .number({ message: "O valor deve ser um número" })
    .positive("O valor deve ser maior que zero"),

  type: z.enum(["ENTRADA", "SAIDA"], {
    message: "Selecione o tipo",
  }),

  categoryId: z.string().min(1, "Selecione uma categoria"),

  description: z
    .string()
    .trim()
    .max(500, "Máximo de 500 caracteres")
    .optional()
    .or(z.literal("")),
  date: z.string().min(1, "A data é obrigatória"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export function useTransactionForm() {
  return useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema) as any,
    defaultValues: {
      name: "",
      value: 0,
      type: "ENTRADA",
      categoryId: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });
}