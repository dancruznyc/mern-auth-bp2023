import React, { useState } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Signup = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [pwInput, setPWInput] = useState("");
  const [btnText, setBtnText] = useState("Submit");

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnText("Submitting");
    const values = {
      name: nameInput,
      email: emailInput,
      password: pwInput,
    };
    axios
      .post(`${process.env.REACT_APP_API}/signup`, values)
      .then((response) => {
        console.log("Signup Success", response);
        setNameInput("");
        setEmailInput("");
        setPWInput("");
        setBtnText("Submit");
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log("signup error", err.response.data);
        setBtnText("Submit");
        toast.error(err.response.data.error);
      });
  };
  const SignupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={(e) => setNameInput(e.target.value)}
          type="text"
          className="form-control"
          value={nameInput}
        />
      </div>
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
        <h1 className="p-5 text-center">Signup</h1>
        {SignupForm()}
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Signup;
