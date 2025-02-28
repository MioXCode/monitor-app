import Cookies from "js-cookie";

type FetcherOptions<TBody = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: TBody;
  requireAuth?: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<TResponse, TBody = unknown>(
  endpoint: string,
  options: FetcherOptions<TBody> = {}
): Promise<TResponse> {
  const { method = "GET", headers = {}, body, requireAuth = false } = options;

  let requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  if (requireAuth) {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Unauthorized: Token tidak ditemukan");
    }

    requestHeaders = {
      ...requestHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    credentials: "include",
  };

  if (body && method !== "GET") {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Terjadi kesalahan pada server",
      }));
      throw new Error(error.message || "Terjadi kesalahan pada server");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError && error.message.includes("NetworkError")) {
      throw new Error("Koneksi gagal: Periksa koneksi internet Anda");
    }
    throw error;
  }
}
