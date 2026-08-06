"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { createTransactionAction } from "@/actions/transactions";
import { useTransactionForm, TransactionFormData } from "../hooks/transaction-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransactionModalProps {
  categories: Category[];
}

export default function TransactionModal({ categories }: TransactionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const form = useTransactionForm();
  const [priceValue, setPriceValue] = useState("");

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open) {
      form.reset();
      setPriceValue("");
      setErrorMessage("");
    }
  }

  const onSubmit = async (data: TransactionFormData) => {
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("value", String(data.value));
    formData.append("type", data.type);
    formData.append("category_id", data.categoryId);
    formData.append("description", data.description ?? "");
    formData.append("date", data.date);

    const result = await createTransactionAction(formData);

    setIsLoading(false);

    if (result.success) {
      form.reset();
      setPriceValue("");
      setErrorMessage("");
      setIsOpen(false);
      router.refresh();
      return;
    }

    setErrorMessage(result.error);
  };

  function formatToBrl(value: string) {
    //remover tudo q n eh numero
    const numbers = value.replace(/\D/g, "")

    if (!numbers) return "";
    //converter para numero e dividir por 100 para ter os centavos

    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })

  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          + Nova Transação
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Cadastre uma nova transação</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar um registro.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome*</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Conta de Luz..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor em reais*</FormLabel>
                  <FormControl>
                    <Input
                      id="value"
                      required
                      placeholder="Ex: 35,00"
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={priceValue}

                      onChange={(e) => {
                        const formatted = formatToBrl(e.target.value);
                        setPriceValue(formatted);
                        const numbers = e.target.value.replace(/\D/g, "");
                        const numericValue = parseFloat(numbers) / 100;

                        field.onChange(numericValue || 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data*</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>

                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="ENTRADA">
                        Entrada
                      </SelectItem>

                      <SelectItem value="SAIDA">
                        Saída
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria*</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    >
                      <option value="" disabled>
                        Selecione uma categoria...
                      </option>
                      {categories.map((category) => (
                        <option className="cursor-pointer" key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite uma breve descrição (opcional)..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errorMessage && <p className="text-sm font-medium text-red-500">{errorMessage}</p>}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
