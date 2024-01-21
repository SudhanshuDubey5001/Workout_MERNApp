import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/authStore";

export default function RootLayout() {
  const state = useAuthStore();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    state.removeUser();
    window.location.reload();
  };

  return (
    <div>
      <header>
        <nav className="container">
          <Link to="/">
            <h1>GetBetter</h1>
          </Link>
          <div className="nav-items">
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
