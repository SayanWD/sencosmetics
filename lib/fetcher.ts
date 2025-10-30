/**
 * Generic fetcher for TanStack Query
 * Throws error on non-ok responses for proper error handling
 */
export async function fetcher<T = any>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(url, init)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      errorData.message || `Fetch error: ${response.status} ${response.statusText}`
    )
  }

  return response.json() as Promise<T>
}

/**
 * Type-safe GET request
 */
export async function get<T = any>(
  url: string,
  init?: Omit<RequestInit, 'method' | 'body'>
): Promise<T> {
  return fetcher<T>(url, { ...init, method: 'GET' })
}

/**
 * Type-safe POST request
 */
export async function post<T = any>(
  url: string,
  data?: any,
  init?: Omit<RequestInit, 'method' | 'body'>
): Promise<T> {
  return fetcher<T>(url, {
    ...init,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    body: JSON.stringify(data),
  })
}

