import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { create } from "zustand";
//layouts
import AuthLayout from "./layouts/AuthLayout";
import RootLayout from "./layouts/RootLayout";
//pages
import Home, { homeLoader } from "./pages/Home";
import About from "./pages/About";
import RouterError from "./pages/RouterError";
import ErrorPage from "./pages/ErrorPage";
import { Signup } from "./pages/auth/Signup";
//actions
import { homeActions } from "./actions/homeActions";
import { LoginAction } from "./actions/loginAction";
import { signupAction as SignupAction } from "./actions/signupAction";
//hooks
import { useAuthStore } from "./hooks/authStore";
import Login from "./pages/auth/Login";

const routerMain = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />} errorElement={<RouterError />}>
        <Route
          path="/" //don't use "index" as action method does not work
          element={<Home />}
          loader={homeLoader}
          action={homeActions}
        />
        <Route path="/about" element={<About />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const routerAuth = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthLayout />} errorElement={<RouterError />}>
      <Route path="/" element={<Login />} action={LoginAction} />
      <Route path="signup" element={<Signup />} action={SignupAction} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  const token = useAuthStore((state) => state.token);
  const email = useAuthStore((state) => state.email);
  console.log("Token = " + token);
  console.log("Email = " + email);
  if(token && email){
    localStorage.setItem('token',token)
    localStorage.setItem('email',email)
  }
  if (localStorage.getItem("token")) {
    return <RouterProvider router={routerMain} />;
  }
  return <RouterProvider router={routerAuth} />;
}

export default App;
