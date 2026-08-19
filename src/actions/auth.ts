"use server"
import { apiClient } from "@/lib/api";
import { User } from "@/lib/types"
import { setToken, removeToken } from "@/lib/auth"
import { redirect } from "next/navigation";

// A assinatura agora é simples e limpa
export async function registerUser(data: { name: string, email: string, password: string }) {
  try {
    await apiClient<User>("/users", {
      method: "POST",
      body: JSON.stringify(data)
    });

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao criar conta" };
  }
}

export async function loginUser(data: { email: string, password: string }) {

  try {
    const response = await apiClient<User>("/session", {
      method: "POST",
      body: JSON.stringify(data)
    });

    await setToken(response.token)

    return { success: true, error: "" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro ao entrar na conta" };
  }
}

export async function logoutUser() {
  console.log("LOGOUT INICIADO");

  await removeToken();

  console.log("TOKEN REMOVIDO");

  redirect("/home");
}

export async function loginGoogleUser(
  token: string
) {
  await setToken(token);

  return {
    success: true
  };
}