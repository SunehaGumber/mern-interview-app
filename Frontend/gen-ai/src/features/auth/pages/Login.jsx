import { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../../ai/components/Spinner";

export const Login = () => {
  const navigate = useNavigate();
  const { loading, handlelogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
        e.preventDefault();
      await handlelogin({ email, password })
      navigate('/');
      
    };
    if (loading) {
        return <Spinner/>
    }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
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
              
              onChange={(e) => {
                setEmail(e.target.value);
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
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};
