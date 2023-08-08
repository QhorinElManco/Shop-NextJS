export async function fetcher<TResponse>(url: string, config: RequestInit): Promise<TResponse> {
  const response = await fetch(url, config);
  return response.json();
}
