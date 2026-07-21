// aqui para pegar, salvar e deletar o token.
import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "token_fintech"


export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, //expira em 30 dias
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  })
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME)
}