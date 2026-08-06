"use server"

import { apiClient } from "@/lib/api";
import { getToken, getUser } from "@/lib/auth";
import { Transaction } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createTransactionAction(formData: FormData) {
  try {
    const token = await getToken();
    const user = await getUser();

    // Validações de autenticação
    if (!token) {
      return { success: false, error: "Sessão expirada. Faça login novamente." };
    }
    if (!user) {
      return { success: false, error: "Usuário não encontrado." };
    }

    // Captura dos dados
    const name = String(formData.get("name") ?? "").trim();
    const value = Number(formData.get("value")) * 100; // Converte para centavos
    const description = String(formData.get("description") ?? "").trim() || "Sem descrição";
    const category_id = String(formData.get("category_id") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const date = String(formData.get("date") ?? "").trim();

    // Validação de campos vazios (apenas uma vez)
    if (!name || !category_id || !type || !date) {
      return { success: false, error: "Preencha todos os campos obrigatórios." };
    }

    // Validação do valor numérico
    if (!Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
      return { success: false, error: "O valor deve ser maior que zero." };
    }

    // Montagem do Payload
    const payload = {
      name,
      value: Math.round(value),
      description,
      category_id,
      type,
      date: new Date(date).toISOString(), // <-- Padrão universal de data
      user_id: user.id, // <-- Pegando com segurança do getUser()
    };

    // Chamada para a API
    await apiClient<Transaction>("/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
      token,
    });

    // Atualiza as rotas para refletir a nova transação
    revalidatePath("/dashboard/transaction");
    revalidatePath("/dashboard");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Erro ao criar transação." };
  }
}

export async function deleteTransactionAction(transactionId: string) {

  try {
    if (!transactionId) {
      return { success: false, error: "Erro ao deletar transação." }
    }

    const token = await getToken();

    if (!token) {
      return { success: false, error: "Erro ao deletar transação." }
    }
    await apiClient(`/transaction?transaction_id=${transactionId}`, {
      method: "DELETE",
      token: token
    })

    revalidatePath("/dashboard/transaction");
    revalidatePath("/dashboard");

    return { success: true, error: "" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Erro ao deletar transação." };
  }
}