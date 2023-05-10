import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const navigate = useNavigate();

  function handleSignout() {
    signout(() => navigate("/"));
  }

  const nav = () => (
    <ul
      className={`nav nav-tabs bg-primary ${path == "/" ? "nav-active" : ""}`}
    >
      <li className="nav-item">
        <Link to="/" className="text-light nav-link">
          Home
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link
              to="/signup"
              className={`text-light nav-link ${
                path == "/signup" ? "nav-active" : ""
              }`}
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/signin"
              className={`text-light nav-link ${
                path == "/signin" ? "nav-active" : ""
              }`}
            >
              Signin
            </Link>
          </li>{" "}
        </>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            style={{ cursor: "pointer" }}
            className="nav-link"
            onClick={handleSignout}
          >
            {isAuth().name}
          </span>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            style={{ cursor: "pointer" }}
            className="nav-link"
            onClick={handleSignout}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
