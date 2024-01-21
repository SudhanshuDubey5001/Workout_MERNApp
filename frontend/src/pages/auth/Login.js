import { Form, Link, redirect, useActionData } from "react-router-dom";
import { useAuthStore } from "../../hooks/authStore";

export default function Login() {
  const data = useActionData();

  useAuthStore((state) => {
    if (data) {
      state.setUser(data.email, data.token);
    }
  });

  return (
    <div className="login">
      <h2>Login</h2>
      <Form method="POST" action="/" replace={true}>
        <label>
          <span>Email ID</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" required></input>
        </label>
        <button>Submit</button>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </Form>
    </div>
  );
}
