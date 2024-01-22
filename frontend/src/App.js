import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
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
//hooks
import { useAuthStore } from "./hooks/authStore";
import Login from "./pages/auth/Login";

const routerMain = (user) =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<RootLayout />} errorElement={<RouterError />}>
          <Route
            path="/" //don't use "index" as action method does not work
            element={<Home />}
            loader={homeLoader(user)}
            action={homeActions(user)}
          />
        </Route>
        {/* For all other routes, we will redirect the user to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );

const routerAuth = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthLayout />} errorElement={<RouterError />}>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace/>} />
    </Route>
  )
);

function App() {
  const { getUser } = useAuthStore();
  const user = getUser();
  // const isUserLogin = loggedIn();
  if (!user) {
    return <RouterProvider router={routerAuth} />;
  }
  return <RouterProvider router={routerMain(user)} />;
}

export default App;
