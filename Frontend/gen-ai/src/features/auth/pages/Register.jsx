import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Spinner from "../../ai/components/Spinner.jsx";


const Register = () => {
  const navigate = useNavigate();
  const { handleRegister,loading } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
      await handleRegister({ email, username, password });
      navigate('/')
    };
    if (loading) {
        return <Spinner/>
    }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
