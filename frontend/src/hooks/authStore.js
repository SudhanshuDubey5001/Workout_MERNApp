import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  loading: null,
  error: null,
  getUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
  },
  logout: () => {
    localStorage.clear();
    set(state => ({user:null}))
  },

  login: async (email, password) => {
    if (!email || !password) return;
    console.log("Loggin in....");
    set((state) => ({ loading: true }));
    const user = { email, password };
    console.log("Calling login API...");
    const response = await fetch("/api/user/login", {
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
        error: json.error,
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
        error: json.error,
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
      }));
      return true;
    }
  },
}));
