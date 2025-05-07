// src/components/LoginForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/custom-colors.css'; // Assuming this has .btn-sunrise-coral, etc.

const LoginForm = () => {
  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      <div className="row align-items-center g-lg-5 py-5">
        {/* Welcome Text Section */}
        <div className="col-lg-6 text-center text-lg-start">
          <h1 className="display-5 fw-bold lh-1 mb-3 text-body-emphasis">
            Welcome Back!
          </h1>
          <p className="lead fs-5 text-muted">
            Log in with your email and password to access your admin dashboard.
          </p>
        </div>

        {/* Login Form */}
        <div className="col-md-10 mx-auto col-lg-6">
          <form className="p-4 p-md-5 border rounded-4 bg-body-tertiary shadow-sm">
            {/* Email */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="name@example.com"
              />
              <label htmlFor="loginEmail">Email address</label>
            </div>

            {/* Password */}
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
              />
              <label htmlFor="loginPassword">Password</label>
            </div>

            {/* Remember Me */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button className="w-100 btn btn-lg btn-sunrise-coral" type="submit">
              Log In
            </button>

            <hr className="my-4" />

            {/* Footer Links */}
            <div className="small text-muted">
              <p className="mb-2">
                Forgot your password? <a href="#">Click here</a>.
              </p>
              <p className="mb-2">
                Don’t have an account? <Link to="/signup">Sign up</Link>.
              </p>
              <p className="mb-0">
                Admin? <Link to="/admin/login">Go to admin login</Link>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
