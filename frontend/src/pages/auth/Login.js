import { Form, Link} from "react-router-dom";
import { useAuthStore } from "../../hooks/authStore";
import { useState } from "react";

export default function Login() {
  const { login, loading, errorLogin} = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email = " + email);
    console.log("Password = " + password);
    await login(email, password);
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <label>
          <span>Email ID</span>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required = {true}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required = {true}
          ></input>
        </label>
        <button disabled={loading} onClick={handleSubmit}>Submit</button>
        {errorLogin && <div className="error">{errorLogin}</div>}
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
