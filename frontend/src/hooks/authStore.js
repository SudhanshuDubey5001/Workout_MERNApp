import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loading: null,
  errorLogin: null,
  errorSignup: null,
  resetAll: false,
  getUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  },
  logout: () => {
    set((state) => ({ user: null, resetAll: true }));
    localStorage.clear();
  },

  login: async (email, password) => {
    if (!email || !password) return;
    console.log("Loggin in....");
    set((state) => ({ loading: true, resetAll: false }));
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
      console.log("Some error occurred: " + json.error);
      set((state) => ({
        loading: false,
        errorLogin: json.error,
      }));
      return false;
    } else {
      const userCredentials = {
        email: json.email,
        token: json.token,
      };

      localStorage.setItem("user", JSON.stringify(userCredentials));

      set((state) => ({
        user: userCredentials,
        loading: false,
        errorLogin: null,
      }));
      return true;
    }
  },
  signup: async (email, password) => {
    if (!email || !password) return;
    console.log("Signing up....");
    set((state) => ({ loading: true }));
    const user = { email, password };
    console.log("Calling signup API...");
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    console.log("Got the response...");
    if (!response.ok) {
      console.log("Some error occurred: " + json.error);
      set((state) => ({
        loading: false,
        errorSignup: json.error,
      }));
      return false;
    } else {
      const userCredentials = {
        email: json.email,
        token: json.token,
      };
      //setting states to logged in --
      console.log("Everything okay: setting up user credentials");
      localStorage.setItem("user", JSON.stringify(userCredentials));
      set((state) => ({
        user: userCredentials,
        loading: false,
        errorSignup: null,
      }));
      return true;
    }
  },
}));
