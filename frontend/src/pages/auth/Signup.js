import { Form, Link } from "react-router-dom";
import { useAuthStore } from "../../hooks/authStore";
import { useState } from "react";

export const Signup = () => {
  const { signup, loading, errorSignup } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLocal, setErrorLocal] = useState(null);
  const [retypePassword, setRetypePassword] = useState("");

  const handleSubmit = async (e) => {
    setErrorLocal(null);
    e.preventDefault();
    console.log("Email = " + email);
    console.log("Password = " + password);
    if (password === retypePassword) {
      await signup(email, password);
    } else {
      setErrorLocal("The passwords do not match");
    }
  };

  return (
    <div className="login">
      <h2>Signup</h2>
      <Form>
        <label>
          <span>Email ID</span>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>
        </label>
        <label>
          <span>Confirm password</span>
          <input
            type="password"
            name="retypePassword"
            onChange={(e) => setRetypePassword(e.target.value)}
            value={retypePassword}
            required
          ></input>
        </label>
        <button disabled={loading} onClick={handleSubmit}>
          Submit
        </button>
        {errorSignup && <div className="error">{errorSignup}</div>}
        {errorLocal && <div className="error">{errorLocal}</div>}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </Form>
    </div>
  );
};
