import { LoginUserData } from "@/types";

export async function loginUser(userData: LoginUserData) {
  const response = await fetch("/api/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to login");
  }

  return response.json();
}
