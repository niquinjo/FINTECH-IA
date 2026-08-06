import Link from "next/link";
import { ArrowLeft, ArrowDownRight, ArrowUpRight, Plus, Wallet, Tag } from "lucide-react";
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
  const groupedByCategory = categories.map((category) => ({
    ...category,
    total: transactions
      .filter((transaction) => transaction.category_id === category.id)
      .reduce((sum, transaction) => sum + transaction.value, 0),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Financeiro</p>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
        </div>

        {/* Adicionando o filtro no cabeçalho */}
        <div className="flex-1 flex justify-center">
          <MonthFilter />
        </div>

        <Link href="/dashboard">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
      </div>


      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Balanceamento do mês</span>
            <Wallet className="h-4 w-4 text-blue-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-blue-600">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.saldo / 100)}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Entradas do mês</span>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-green-600">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.entradas / 100)}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Saídas do mês</span>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-red-600">
            {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.saidas / 100)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Resumo por categoria</h2>
          <TransactionModal categories={categories} />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {groupedByCategory.length > 0 ? (
            groupedByCategory.map((category) => (
              <div key={category.id} className="rounded-xl border bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span className="font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
                <p className="mt-3 text-lg font-bold text-slate-900">
                  {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(category.total / 100)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Nenhuma categoria cadastrada ainda.</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Últimas transações</h2>
        </div>

        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const isEntry = transaction.type === "ENTRADA";
              const categoryName = categories.find((category) => category.id === transaction.category_id)?.name ?? "Sem categoria";

              return (
                <div key={transaction.id} className="flex flex-col gap-2 rounded-xl border p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">{transaction.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                      <span>{categoryName}</span>
                      <span>•</span>
                      <span>{transaction.description || "Sem descrição"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {transaction.type}
                    </span>
                    <span className={`text-lg font-bold ${isEntry ? "text-green-600" : "text-red-600"}`}>
                      {isEntry ? "+" : "-"}
                      {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(transaction.value / 100)}
                    </span>
                    <DeleteButtonTransaction transactionId={transaction.id} />

                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500">Nenhuma transação cadastrada até o momento.</p>
          )}
        </div>
      </div>
    </div>
  );
}
