/**
 * Fetches newsroom agents from the API and strips server-only fields.
 */
import { apiClient } from "./client";
import type { Agent } from "../types";

type AgentApiResponse = Agent & {
  created_at?: string;
};

export const fetchAgents = async (): Promise<Agent[]> => {
  const data = await apiClient<AgentApiResponse[]>({ endpoint: "/agents" });

  return data.map((agentResponse) => {
    const { created_at, ...agent } = agentResponse;
    return agent;
  });
};
