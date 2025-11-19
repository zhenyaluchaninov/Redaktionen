/**
 * Centralized placeholder that will eventually wrap the HTTP client configuration.
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig {
  endpoint: string;
  method?: HttpMethod;
  payload?: unknown;
}

export const apiClient = async <T>(_config: ApiRequestConfig): Promise<T> => {
  throw new Error("API client is not implemented yet.");
};
