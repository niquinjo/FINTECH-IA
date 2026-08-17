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
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-primary/80 text-white px-4 py-2 rounded-xl font-medium transition shadow-lg cursor-pointer">
          + Nova Transação
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-brand-secondary to-brand-primary text-white border border-brand-primary/30 rounded-2xl shadow-2xl p-6 md:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold text-white">Cadastre uma nova transação</DialogTitle>
          <DialogDescription className="text-brand-accent">Preencha os campos abaixo para adicionar um registro ao seu financeiro.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Conta de Luz..." {...field} className="bg-brand-dark/60 border-brand-primary/40 text-white focus-visible:ring-brand-accent rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">Valor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="R$ 0,00"
                        value={priceValue}
                        className="bg-brand-dark/60 border-brand-primary/40 text-white focus-visible:ring-brand-accent rounded-xl h-12"
                        onChange={(e) => {
                          const formatted = formatToBrl(e.target.value);
                          setPriceValue(formatted);
                          const numericValue = parseFloat(e.target.value.replace(/\D/g, "")) / 100;
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
                    <FormLabel className="text-white font-medium">Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-brand-dark/60 border-brand-primary/40 text-white focus-visible:ring-brand-accent rounded-xl h-12 cursor-pointer [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
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
                    <FormLabel className="text-white font-medium">Tipo</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="bg-brand-dark/60 border-brand-primary/40 text-white focus:ring-brand-accent rounded-xl h-12">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-brand-dark border-brand-primary/40 text-white rounded-xl">
                        <SelectItem value="ENTRADA" className="cursor-pointer">Entrada</SelectItem>
                        <SelectItem value="SAIDA" className="cursor-pointer">Saída</SelectItem>
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
                    <FormLabel className="text-white font-medium">Categoria</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-12 w-full rounded-xl border border-brand-primary/40 bg-brand-dark/60 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent cursor-pointer"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="" disabled className="bg-brand-dark">Selecione...</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-brand-dark">{cat.name}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Breve descrição..." {...field} className="bg-brand-dark/60 border-brand-primary/40 text-white focus-visible:ring-brand-accent rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errorMessage && <p className="text-sm font-medium text-red-400">{errorMessage}</p>}

            <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-xl transition shadow-lg h-12 mt-4" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar Transação"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}