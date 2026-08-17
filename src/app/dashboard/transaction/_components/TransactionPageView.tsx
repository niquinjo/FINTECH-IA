"use client"

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDownRight, ArrowUpRight, Wallet, Tag, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, Transaction } from "@/lib/types";
import TransactionModal from "../../_components/TransactionModal";
import { DeleteButtonTransaction } from "./delete-button";
import MonthFilter from "./MonthFilter";

interface TransactionPageViewProps {
  transactions: Transaction[];
  categories: Category[];
  summary: {
    entradas: number;
    saidas: number;
    saldo: number;
  };
}

export default function TransactionPageView({ transactions, categories, summary }: TransactionPageViewProps) {
  // Estado para alternar a visibilidade dos valores
  const [showValues, setShowValues] = useState(true);

  const formatCurrency = (val: number) => {
    if (!showValues) return "••••••";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val / 100);
  };

  const groupedByCategory = categories.map((category) => ({
    ...category,
    total: transactions
      .filter((transaction) => transaction.category_id === category.id)
      .reduce((sum, transaction) => sum + transaction.value, 0),
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-brand-secondary to-brand-primary text-white p-6 lg:p-8 space-y-6">

      {/* CABEÇALHO COM ESTRUTURA EM GRID (3 COLUNAS NO DESKTOP) */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">

        {/* COLUNA 1 (ESQUERDA): Título + Olho + Botão Voltar (Apenas no Mobile) */}
        <div className="flex items-start justify-between w-full gap-4">
          <div>
            <p className="text-2xl font-semibold uppercase tracking-wider text-brand-muted">Financeiro</p>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">Transações</h1>
              <button
                type="button"
                onClick={() => setShowValues(!showValues)}
                className="p-1.5 sm:p-2 rounded-xl bg-brand-secondary/50 hover:bg-brand-secondary text-brand-accent transition-all cursor-pointer border border-brand-primary/20"
                title={showValues ? "Ocultar valores" : "Mostrar valores"}
              >
                {showValues ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                ) : (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-brand-muted" />
                )}
              </button>
            </div>
          </div>

          {/* BOTÃO VOLTAR MOBILE (Alinhado à direita na mesma linha do título, com área de clique estritamente limitada) */}
          <Link href="/dashboard" className="md:hidden inline-block w-fit shrink-0">
            <Button variant="outline" className="gap-2 rounded-xl border-brand-primary/30 bg-brand-secondary/40 text-white hover:bg-brand-primary hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

        {/* COLUNA 2 (CENTRO): Filtro de Mês perfeitamente centralizado */}
        <div className="flex justify-center w-full">
          <MonthFilter />
        </div>

        {/* COLUNA 3 (DIREITA): Botão Voltar Desktop (Alinhado à extrema direita) */}
        <div className="hidden md:flex justify-end">
          <Link href="/dashboard" className="inline-block w-fit">
            <Button variant="outline" className="gap-2 rounded-xl border-brand-primary/30 bg-brand-secondary/40 text-white hover:bg-brand-primary hover:text-white transition-all">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
        </div>

      </div>

      {/* CARDS DE RESUMO FINANCEIRO */}
      <div className="grid gap-4 md:grid-cols-3">

        {/* BALANCEAMENTO */}
        <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Balanceamento do mês</span>
            <span className="p-2 bg-emerald-500/20 rounded-xl text-emerald-600 text-sm sm:text-base shadow-xs">💲</span>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
            {formatCurrency(summary.saldo)}
          </p>
        </div>

        {/* ENTRADAS */}
        <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Entradas do mês</span>
            <span className="p-2 bg-emerald-500/20 rounded-xl text-emerald-600 text-sm sm:text-base shadow-xs">📈</span>
          </div>
          <p className="mt-3 text-2xl sm:text-3xl font-extrabold text-green-700 tracking-tight">
            {formatCurrency(summary.entradas)}
          </p>
        </div>

        {/* SAÍDAS */}
        <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Saídas</span>
            <span className="p-2 bg-rose-500/20 rounded-xl text-rose-600 text-sm sm:text-base shadow-xs">📉</span>
          </div>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-rose-700 tracking-tight">
            {formatCurrency(summary.saidas)}
          </h3>
        </div>
      </div>

      {/* RESUMO POR CATEGORIA */}
      <div className="bg-gradient-to-br from-brand-accent to-brand-muted rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 w-full text-brand-dark">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Resumo por categoria</h2>
          <TransactionModal categories={categories} />
        </div>

        <div className="max-h-64 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-accent/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-brand-accent">
          {groupedByCategory.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groupedByCategory.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 sm:p-3.5 bg-white/40 hover:bg-white/60 rounded-xl transition-all shadow-xs border border-white/30 gap-2">
                  <div className="flex items-center gap-2 text-sm text-brand-muted">
                    <Tag className="h-4 w-4 text-brand-dark" />
                    <span className="font-semibold text-brand-dark">
                      {category.name}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-extrabold text-brand-dark">
                    {formatCurrency(category.total)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-muted py-4">Nenhuma categoria cadastrada ainda.</p>
          )}
        </div>
      </div>

      {/* ÚLTIMAS TRANSAÇÕES */}
      <div className="bg-gradient-to-br from-brand-accent to-brand-muted rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 w-full text-brand-dark">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-white">Últimas transações</h2>
        </div>

        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const isEntry = transaction.type === "ENTRADA";
              const categoryName = categories.find((category) => category.id === transaction.category_id)?.name ?? "Sem categoria";

              return (
                <div
                  key={transaction.id}
                  className="flex flex-col gap-3 rounded-xl border border-brand-primary/20 bg-brand-dark/50 p-4 transition-all hover:bg-brand-secondary/60 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-bold text-white">{transaction.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-brand-muted font-medium">
                      <span className="px-2 py-0.5 rounded-md bg-brand-primary/30 text-brand-accent font-semibold">{categoryName}</span>
                      <span>•</span>
                      <span>{transaction.description || "Sem descrição"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isEntry
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                      }`}>
                      {transaction.type}
                    </span>

                    <span className={`text-base font-extrabold ${isEntry ? "text-emerald-400" : "text-rose-400"}`}>
                      {isEntry ? "+" : "-"} {formatCurrency(transaction.value)}
                    </span>

                    <DeleteButtonTransaction transactionId={transaction.id} />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-brand-muted py-4">Nenhuma transação cadastrada até o momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}