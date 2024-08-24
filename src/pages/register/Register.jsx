import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { BaseUrl } from "../../config";

const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();
  const BU = BaseUrl;

  const handleCLick = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(BU + "auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
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
              placeholder="Username"
              className="loginInput"
              type="text"
              required
              ref={username}
            />
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
              ref={password}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              className="loginInput"
              required
              ref={confirmPassword}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log Into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
