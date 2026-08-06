import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Transaction } from "@/lib/types";
import TransactionPageView from "./_components/TransactionPageView";

interface TransactionPageProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export default async function TransactionPage({ searchParams }: TransactionPageProps) {
  const token = await getToken();

  const resolvedParams = await searchParams;
  
  const currentDate = new Date();
  const month = resolvedParams?.month || (currentDate.getMonth() + 1).toString();
  const year = resolvedParams?.year || currentDate.getFullYear().toString();

  const [transactions, categories, summary] = await Promise.all([
    apiClient<Transaction[]>(`/transactions/filter?month=${month}&year=${year}`, { token: token! }),
    apiClient<Category[]>("/category", { token: token! }),
    apiClient<any>(`/transaction/summary?month=${month}&year=${year}`, { token: token! })
  ]);

  return <TransactionPageView transactions={transactions} categories={categories} summary={summary} />;
}