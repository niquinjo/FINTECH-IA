import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import DashboardView from "./_components/DashboardView";
import { Category } from "@/lib/types";


export default async function Dashboard() {
  const token = await getToken();
  
  const categories = await apiClient<Category[]>("/category", { token: token! }) as Category[];

  return (
    // Passa os dados como prop para a sua View
    <DashboardView categories={categories} />
  )
}