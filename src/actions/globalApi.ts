"use server";

import { cookies } from "next/headers";

const BASE_URL =
  process.env.SPARTAN_BACKEND_URL || "https://spartanlms.tgastaging.com/api/";

interface ApiOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: any;
  isFormData?: boolean;
}

export async function globalServerRequest({
  endpoint,
  method = "GET",
  payload = null,
  isFormData = false,
}: ApiOptions) {
  try {
    const targetUrl = `${BASE_URL}${endpoint}`;
    const headers = new Headers();

    // 1. Automatically grab Bearer Token from server-side cookies if it exists
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    // 2. Adjust headers depending on data type
    if (!isFormData) {
      headers.append("Content-Type", "application/json");
    }

    // 3. Configure the HTTP execution options
    const fetchOptions: RequestInit = {
      method,
      headers,
      cache: "no-store", // Ensures no stale client data
    };

    if (payload && method !== "GET") {
      fetchOptions.body = isFormData ? payload : JSON.stringify(payload);
    }

    // 4. Secure server-to-server fetch execution
    const response = await fetch(targetUrl, fetchOptions);
    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error:
          responseData?.message ||
          responseData?.data?.message ||
          "An API error occurred.",
      };
    }

    return { success: true, status: response.status, data: responseData };
  } catch (error) {
    console.error(`Global API Error on [${endpoint}]:`, error);
    return { success: false, error: "Network connection to backend failed." };
  }
}
