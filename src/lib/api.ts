
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;

}

//o <T> é um tipo genérico do TS, ou seja, assume o tipo que for atribuido para ele. neste caso retornamos uma promise.
export async function apiClient<T>(
  endpoint: string,  //aqui seria  a URL. ex: /user...
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

  const response = await fetch(`${API_URL}${endpoint}`, {
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

