import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { isAuth } from "./helpers";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest}></Route>;
};
