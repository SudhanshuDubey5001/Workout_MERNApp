import { Link, NavLink, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <header>
        <nav className="container">
          <Link to="/">
            <h1>GetBetter</h1>
          </Link>
          <div className="nav-items">
            <NavLink to="/">Login</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
