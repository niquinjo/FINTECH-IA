import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export const categorySchema = z.object({
  name: z.string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export function useCategoryForm() {
  return useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });
}