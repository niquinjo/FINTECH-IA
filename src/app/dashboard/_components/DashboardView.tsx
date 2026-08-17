"use client"

import { useState } from "react";
import Categories from "./CategoryModal";
import TransactionModal from "./TransactionModal";
import { Category, Transaction } from "@/lib/types";
import { Eye, EyeOff } from "lucide-react";

interface DashboardViewProps {
  categories: Category[];
  transactions: Transaction[];
  summary: {
    entradas: number;
    saidas: number;
    saldo: number;
  };
}

export default function DashboardView({ categories, transactions, summary }: DashboardViewProps) {
  const [showValues, setShowValues] = useState<boolean>(true);

  // Formatação de Moeda em R$
  const formatValue = (valueInCents: number) => {
    if (!showValues) return "R$ •••••";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInCents / 100);
  };

  // Formatação de Data
  const formatDate = (tx: any) => {
    const rawDate = tx.date || tx.createdAt || tx.created_at;
    if (!rawDate) return null;

    try {
      const date = new Date(rawDate);
      if (isNaN(date.getTime())) return String(rawDate);

      return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return null;
    }
  };

  const recentTransactions = transactions.slice(0, 10);

  return (
    /* [scrollbar-width:none] [&::-webkit-scrollbar]:hidden REMOVE O SCROLLBAR GERAL DO NAVEGADOR */
    <div className="min-h-screen w-full bg-linear-to-br from-brand-secondary to-brand-primary text-white flex flex-col overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* HEADER RESPONSIVO (Ajustado para mobile e desktop) */}
      <header className="min-h-[80px] py-4 sm:py-0 bg-brand-dark/20 backdrop-blur-md border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-10 w-full sticky top-0 z-20">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Visão Geral</h1>

              <button
                onClick={() => setShowValues(!showValues)}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-brand-accent transition-all cursor-pointer border border-white/10"
                title={showValues ? "Ocultar valores" : "Mostrar valores"}
              >
                {showValues ? (
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-brand-accent" />
                ) : (
                  <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                )}
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-brand-accent font-medium">Acompanhe suas finanças em tempo real</p>
          </div>
        </div>

        {/* Botões Ações */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-end">
          <Categories categories={categories} />
          <TransactionModal categories={categories} />
        </div>
      </header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-10 space-y-4 sm:space-y-6">

        {/* CARDS DE RESUMO (Sem sobreposição no mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">

          {/* Card: Saldo Total */}
          <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Saldo Total</span>
              <span className="p-2 bg-white/30 rounded-xl text-brand-dark text-sm sm:text-base shadow-xs">💳</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
              {formatValue(summary.saldo)}
            </h3>
          </div>

          {/* Card: Entradas */}
          <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Entradas</span>
              <span className="p-2 bg-emerald-500/20 rounded-xl text-emerald-600 text-sm sm:text-base shadow-xs">📈</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-green-400 tracking-tight">
              {formatValue(summary.entradas)}
            </h3>
          </div>

          {/* Card: Saídas */}
          <div className="bg-gradient-to-br from-brand-accent to-brand-muted p-5 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.01] transition-transform">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold text-brand-dark/80 uppercase tracking-wider">Saídas</span>
              <span className="p-2 bg-rose-500/20 rounded-xl text-rose-600 text-sm sm:text-base shadow-xs">📉</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
              {formatValue(summary.saidas)}
            </h3>
          </div>

        </div>

        {/* CONTAINER DE TRANSAÇÕES */}
        <div className="bg-gradient-to-br from-brand-accent to-brand-muted rounded-2xl p-4 sm:p-6 shadow-xl border border-white/20 w-full text-brand-dark">

          <div className="mb-4 sm:mb-6">
            <h3 className="font-bold text-lg sm:text-xl text-brand-dark">Últimas Transações</h3>
            <p className="text-[11px] sm:text-xs text-brand-dark/70 font-medium">Exibindo as 10 movimentações mais recentes</p>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-10 sm:py-12 border border-dashed border-brand-dark/20 rounded-xl">
              <p className="text-xs sm:text-sm font-medium text-brand-dark/70">Nenhuma transação registrada até o momento.</p>
            </div>
          ) : (
            /* SCROLL FININHO E DISCRETO MANTIDO INTEGRAMENTE */
            <div className="max-h-[420px] overflow-y-auto pr-1.5 sm:pr-2 space-y-2.5 sm:space-y-3 [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-dark/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {recentTransactions.map((tx) => {
                const formattedDate = formatDate(tx);

                return (
                  <div
                    className="flex items-center justify-between p-3 sm:p-3.5 bg-white/40 hover:bg-white/60 rounded-xl transition-all shadow-2xs border border-white/30 gap-2"
                    key={tx.id}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg shrink-0 shadow-2xs ${tx.type === "ENTRADA"
                        ? "bg-emerald-500/20 text-emerald-600"
                        : "bg-rose-500/20 text-rose-600"
                        }`}>
                        {tx.type === "ENTRADA" ? "💰" : "💳"}
                      </div>

                      {/* Nome e Data Lado a Lado */}
                      <div className="flex items-center gap-2 flex-wrap min-w-0">
                        <p className="font-bold text-brand-dark text-xs sm:text-sm truncate">{tx.name}</p>

                        {formattedDate && (
                          <span className="text-[10px] sm:text-[11px] font-semibold text-brand-dark/75 bg-white/60 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/40 shrink-0">
                            {formattedDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Valor destacado */}
                    <span className={`font-bold text-sm sm:text-base shrink-0 ${tx.type === "ENTRADA" ? "text-emerald-600" : "text-rose-600"
                      }`}>
                      {tx.type === "ENTRADA" ? "+" : "-"} {formatValue(tx.value)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}