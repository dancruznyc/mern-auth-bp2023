import React, { useState } from "react";
import { Form, Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signin = () => {
  const [emailInput, setEmailInput] = useState("");
  const [pwInput, setPWInput] = useState("");
  const [btnText, setBtnText] = useState("Submit");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnText("Submitting");
    const values = {
      email: emailInput,
      password: pwInput,
    };
    axios
      .post(`${process.env.REACT_APP_API}/signin`, values)
      .then((response) => {
        console.log("Signin Success", response);
        //save res to localstorage and cookies

        setEmailInput("");
        setPWInput("");
        setBtnText("Submit");
        toast.success(`Hey ${response.data.user.name}, Welcome Back`);
      })
      .catch((err) => {
        console.log("Signin error", err.response.data);
        setBtnText("Submit");
        toast.error(err.response.data.error);
      });
  };
  const SigninForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={(e) => setEmailInput(e.target.value)}
          type="email"
          className="form-control"
          value={emailInput}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={(e) => setPWInput(e.target.value)}
          type="password"
          className="form-control"
          value={pwInput}
        />
      </div>
      <div className="">
        <button className="btn btn-primary" onClick={handleSubmit}>
          {btnText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5 text-center">Signin</h1>
        {SigninForm()}
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Signin;
