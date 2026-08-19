"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { AskAiResponse } from "@/lib/types";

export async function sendMessageAction(message: string): Promise<AskAiResponse> {
  try {
    // 1. Pega o token com segurança no lado do SERVIDOR
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Sessão expirada. Faça login novamente.",
      };
    }

    // 2. Faz a chamada para a sua API Node.js enviando o token
    const response = await apiClient<AskAiResponse>("/ia/ask", {
      method: "POST",
      token: token,
      body: JSON.stringify({ message }),
    });
    console.log(
      "Resposta final da IA:",
      JSON.stringify(response, null, 2)
    );
    return response;
  } catch (error) {
    console.error("Erro na Server Action da IA:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao se comunicar com a IA.",
    };
  }
}