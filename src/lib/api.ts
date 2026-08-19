const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3333";

console.log("ENV API URL:", API_URL);

export function getApiUrl(): string {
  return API_URL.replace(/\/$/, "");
}

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {

  const { token, ...fetchOptions } =
    options;

  const headers: Record<string, string> = {
    ...(fetchOptions.headers as Record<
      string,
      string
    >),
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  if (
    !(fetchOptions.body instanceof FormData)
  ) {
    headers["Content-Type"] =
      "application/json";
  }

  const url =
    `${getApiUrl()}${endpoint}`;

  console.log("API URL:", url);

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {

    const error =
      await response
        .json()
        .catch(() => ({
          error:
            "Erro HTTP: " +
            response.status,
        }));

    throw new Error(
      error.error ||
      "Erro na requisição"
    );
  }

  return response.json();
}