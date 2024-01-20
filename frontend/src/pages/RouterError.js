import { Link, useRouteError } from "react-router-dom";

export default function RouterError() {
  const error = useRouteError();
  return (
    <div className="error-page">
      <h2>{error.message}</h2>
      <p>Some Error occurred</p>
      <Link to="/">Back to Home page</Link>
    </div>
  );
}
