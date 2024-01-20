import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home, { homeLoader } from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import About from "./pages/About";
import RouterError from "./pages/RouterError";
import ErrorPage from "./pages/ErrorPage";
import { homeActions } from "./actions/homeActions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<RouterError />}>
      <Route
        path="/" //don't use "index" as action method does not work
        element={<Home />}
        loader={homeLoader}
        action={homeActions}
      />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
