import { Link} from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <h3>404 Error: The requested page not found</h3>
      <Link to="/">Back to Home page</Link>
    </div>
  );
}
