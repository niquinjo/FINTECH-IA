import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import DashboardView from "./_components/DashboardView";
import { Category } from "@/lib/types";
import { Transaction } from "@/lib/types";

export default async function Dashboard() {
  const token = await getToken();

  const [transactions, categories, summary] = await Promise.all([
    apiClient<Transaction[]>("/transaction", { token: token! }) as Promise<Transaction[]>,
    apiClient<Category[]>("/category", { token: token! }) as Promise<Category[]>,
    apiClient<any>("/transaction/summary", { token: token! }) as Promise<any>
  ]);
  return (
    // Passa os dados como prop para a sua View
    <DashboardView categories={categories} transactions={transactions} summary={summary} />
  )
}