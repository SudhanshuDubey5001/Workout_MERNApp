import { useState } from "react";
import { useAuthStore } from "./authStore";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const state = useAuthStore();

  const login = async (email, password) => {
    console.log("Loggin in....");
    // setLoading(true);

    const user = { email, password };

    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(response.error);
    } else {
      const userCredentials = {
        email: json.email,
        token: json.token,
      };
      state.setUser(userCredentials);
      localStorage.setItem("user", JSON.stringify(userCredentials));
      setLoading(false);
    }
  };

  return { login, loading, error };
};
