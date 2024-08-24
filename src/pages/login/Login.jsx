import React, { useContext, useEffect, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // to prevent rerendering I am using useRef in place of useState.
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCLick = (e) => {
    e.preventDefault();
    // console.log(password.current.value);
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  useEffect(() => {
    if (error) {
      alert("Login failed: " + error.message || "An unknown error occurred");
    }
  }, [error]);
  // console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Moments</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Moments.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleCLick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Log In"
              )}
            </button>
            <div className="loginForgot">
              <span className="forgotInside">Forgot Password?</span>
            </div>
            <button
              className="loginRegisterButton"
              disabled={isFetching}
              onClick={() => navigate("/register")}
            >
              {isFetching ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Create New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
