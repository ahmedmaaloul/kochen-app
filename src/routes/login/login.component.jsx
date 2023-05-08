import React, { useState, useContext } from "react";
import "./login.component.scss";
import { Grid, TextField, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import WarningIcon from '@mui/icons-material/Warning';
export default function Login() {
  const { loginUser } = useContext(AppContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackPassword, setFeedbackPassword] = useState("");
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const validateOnSubmit = () => {
    const regexEmail = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    const emailIsMatch = regexEmail.test(values.email);
    if (emailIsMatch) setFeedbackEmail("");
    else {
      setFeedbackEmail("is-invalid");
    }
    const regexPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const passwordIsMatch = regexPassword.test(values.password);
    if (passwordIsMatch) setFeedbackPassword("");
    else {
      setFeedbackPassword("is-invalid");
    }
  };
  const handleChange = (e) => {
    let valide = true;
    if (e.target.name === "email") {
      setValues({ ...values, email: e.target.value });
      const regexObject = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      const isMatch = regexObject.test(e.target.value);
      if (isMatch) setFeedbackEmail("");
      else {
        setFeedbackEmail("is-invalid");
        if (valide) valide = false;
      }
    } else if (e.target.name === "password") {
      setValues({ ...values, password: e.target.value });
      const regexObject = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      );
      const isMatch = regexObject.test(e.target.value);
      console.log(isMatch);
      if (isMatch) setFeedbackPassword("");
      else {
        setFeedbackPassword("is-invalid");
        if (valide) valide = false;
      }
    }
    setFeedbackForm(valide);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackForm === false) validateOnSubmit();
    else {
      loginUser(values, setErrorSubmit);
    }
  };
  return (
    <div className="login-page">
      <div className="login-welcome-container">
        <h3 className="login-logo-title">Kochen.</h3>
        <h6 className="login-welcome-text">Show Your Art</h6>
        <h6 className="login-welcome-text">Find your next Dbara</h6>
      </div>
      <div className="login-container">
        <form className="row login-form" onSubmit={handleSubmit}>
          {errorSubmit != "" ? (
            <div className="col-12 mb-3 d-flex align-items-center alert-login alert alert-danger">
              <WarningIcon className="pe-1"/>
              {`${errorSubmit}`}
            </div>
          ) : (
            ""
          )}
          <div className="col-12 mb-3 d-flex flex-column">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Adresse email"
              className={`form-control ${feedbackEmail}`}
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">email invalide</div>
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              className={`form-control ${feedbackPassword}`}
              onChange={handleChange}
            />
            <Tooltip
              title={`Le mot de passe doit comporter au moins une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial et au moins huit caractères.`}
            >
              <div className="invalid-feedback ps-2">mot de passe invalide</div>
            </Tooltip>
          </div>
          <div className="col-12 d-flex flex-column">
            <button className="btn btn-primary mb-1" type="submit">
              Se connecter
            </button>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Link to="/forget-password" className="login-forget-password-link">
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="col-12">
            <hr />
          </div>
          <div className="col-12 my-3 d-flex flex-column link-siginup-container">
            <Link to="/signup" className="btn btn-secondary">
              Créer un nouveau compte
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
