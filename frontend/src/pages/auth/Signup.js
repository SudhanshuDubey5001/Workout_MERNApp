import { Form, Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="login">
        <h2>Signup</h2>  
      <Form method="POST" action="/signup" replace={true}>
        <label>
          <span>Email ID</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" required></input>
        </label>
        <label>
          <span>Confirm password</span>
          <input type="password" name="retypePassword" required></input>
        </label>
        <button>Submit</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </Form>
    </div>
  );
};
