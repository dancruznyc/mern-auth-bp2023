import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { Link, redirect, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import * as jose from "jose";

const Activate = () => {
  const [userName, setUserName] = useState("");
  //const [token, setToken] = useState("");
  const [show, setShow] = useState(true);
  const [pwInput, setPWInput] = useState("");
  const { token, secret } = useParams();

  useEffect(() => {
    const decoded = jose.decodeJwt(token);
    setUserName(decoded.name);
  }, []);

  const handleActivation = (e) => {
    e.preventDefault();
    console.log(token);
    axios
      .post(`${process.env.REACT_APP_API}/account-activation`, { token })
      .then((response) => {
        console.log("Account Activated", response);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log("Activation error", err.response.data);

        toast.error(err.response.data.error);
      });
  };
  const ActivationLink = () => {
    return (
      <div className="">
        <h1 className="p-5 text-center">
          <button
            className="btn btn-outline-primary"
            onClick={handleActivation}
          >
            Activate Account
          </button>
        </h1>
      </div>
    );
  };

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {`Hey, ${userName} Ready to activate your account!`}
        {ActivationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
