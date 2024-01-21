import { useAuthStore } from "../hooks/authStore";

export const LoginAction = async ({ request }) => {
  console.log("Login Action triggered");

  const data = await request.formData();
  const user = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw Error("Check your internet connection");
  }

  const userCredentials = {
    email: json.email,
    token: json.token
  }

  console.log("User successfully logged in");
  return userCredentials;
};
