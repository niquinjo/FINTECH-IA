import Categories from "./CategoryModal";
import TransactionModal from "./TransactionModal";
import { Category } from "@/lib/types";
import { Transaction } from "@/lib/types";

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
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 flex flex-col">

      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 w-full shadow-sm">
        <h2 className="text-lg font-semibold">Olá, bem-vindo de volta! 👋</h2>

        <TransactionModal categories={categories} />
        <Categories categories={categories} />
      </header>

      <main className="flex-1 w-full p-8 space-y-8 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-500">Saldo Total</span>
            
            <h3 className="text-2xl font-bold mt-1 text-blue-600"> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.saldo / 100)}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-500">Entradas</span>
            <h3 className="text-2xl font-bold mt-1 text-green-600"> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.entradas / 100)}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-sm text-gray-500">Saídas</span>
            <h3 className="text-2xl font-bold mt-1 text-red-500"> {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.saidas / 100)}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Últimas Transações</h3>
            <a href="#" className="text-sm text-blue-600 hover:underline">Ver todas</a>
          </div>

          {transactions.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma transação encontrada.</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition" key={tx.id}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      {tx.type === "ENTRADA" ? "💰" : "💳"}
                    </div>
                    <div>
                      <p className="font-medium">{tx.name}</p>
                      <span className="text-xs text-gray-400">{tx.date}</span>
                    </div>
                  </div>
                  <span className={`font-semibold ${tx.type === "ENTRADA" ? "text-green-600" : "text-red-500"}`}>
                    {tx.type === "ENTRADA" ? "+" : "-"} R$ {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(tx.value / 100)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}