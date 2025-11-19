/**
 * Centralized HTTP client that wraps base URL + fetch defaults.
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig {
  endpoint: string;
  method?: HttpMethod;
  payload?: unknown;
}

const API_BASE_URL = "https://redaktionen.innovationsarenan.dev/api";

export const apiClient = async <T>({
  endpoint,
  method = "GET",
  payload,
}: ApiRequestConfig): Promise<T> => {
  const url =
    endpoint.startsWith("http://") || endpoint.startsWith("https://")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers: HeadersInit = {};

  const options: RequestInit = {
    method,
    cache: "no-store",
  };

  if (payload && method !== "GET") {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(payload);
  }

  if (Object.keys(headers).length > 0) {
    options.headers = headers;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
};
