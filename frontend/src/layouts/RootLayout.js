import { Link, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/authStore";

export default function RootLayout() {
  const { logout, getUser } = useAuthStore();
  const user = getUser();

  const handleLogout = (e) => {
    e.preventDefault();    
    logout();
  };

  return (
    <div>
      <header>
        <nav className="container">
          <Link to="/">
            <h1>GetBetter</h1>
          </Link>
          <div className="nav-items">
            <p>{user.email} |</p>
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
