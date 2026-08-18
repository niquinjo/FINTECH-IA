const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function getApiUrl() {
  // Se a variável de ambiente estiver definida (como na Vercel apontando para o Render), usa ela diretamente.
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Se não houver variável (desenvolvimento local puro), cai no localhost
  return DEFAULT_API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;
}

// Função genérica para requisições
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<string, string>)
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  if (!(fetchOptions.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }

  // Aqui agora vai usar corretamente a URL do Render em produção
  const response = await fetch(`${getApiUrl()}${endpoint}`, {
    ...fetchOptions,
    headers
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Error HTTP: " + response.status
    }))
    throw new Error(error.error || "Erro na requisição");
  }

  return response.json()
}