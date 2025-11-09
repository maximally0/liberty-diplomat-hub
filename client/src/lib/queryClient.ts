import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

async function throwResponseError(res: Response) {
  let message = `Request failed: ${res.status}`;
  let details;

  try {
    const data = await res.json();
    message = data.message || message;
    details = data.details || data.error;
  } catch {
    // Response might not be JSON
  }

  const error = new Error(message) as Error & { details?: any };
  if (details) {
    error.details = details;
  }

  throw error;
}

export async function apiRequest(
  method: string,
  path: string,
  data?: any,
): Promise<Response> {
  const res = await fetch(path, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    await throwResponseError(res);
  }

  return res;
}
