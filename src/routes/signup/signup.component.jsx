import React, { useState,useContext } from "react";
import welcomeImage from "../../assets/welcome/pizza.jpg";
import "./signup.component.scss";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import AppContext from "../../context/AppContext";
export default function Signup() {
  const { signupUser } = useContext(AppContext);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "Male",
  });
  const [feedbackPrenom, setFeedbackPrenom] = useState("");
  const [feedbackNom, setFeedbackNom] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackPassword, setFeedbackPassword] = useState("");
  const [feedbackBirthdate, setFeedbackBirthdate] = useState("");
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const getDateNow = () => {
    const d = new Date();
    return `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate() + 1}`;
  };
  const validateOnSubmit = () => {
    let valide = true;
    if (values.firstName === "") {
      setFeedbackPrenom("is-invalid");
      valide = false;
    } else {
      setFeedbackPrenom("");
    }
    if (values.lastName === "") {
      setFeedbackNom("is-invalid");
      if (valide) valide = false;
    } else {
      setFeedbackNom("");
    }
    const regexEmail = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    const emailIsMatch = regexEmail.test(values.email);
    if (emailIsMatch) setFeedbackEmail("");
    else {
      setFeedbackEmail("is-invalid");
      if (valide) valide = false;
    }
    const regexPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const passwordIsMatch = regexPassword.test(values.password);
    if (passwordIsMatch) setFeedbackPassword("");
    else {
      setFeedbackPassword("is-invalid");
      if (valide) valide = false;
    }
    const dateParts = values.birthdate.split("-");
    const d = new Date(dateParts[0], dateParts[1], dateParts[2]);
    const now = new Date();
    const dateBefore13Years = new Date(
      now.getFullYear() - 13,
      now.getMonth(),
      now.getDate()
    );
    if (d > dateBefore13Years || values.birthdate === "") {
      setFeedbackBirthdate("is-invalid");
      if (valide) valide = false;
    } else setFeedbackBirthdate("");
    setFeedbackForm(valide);
  };
  const handleChange = (e) => {
    let valide = true;
    if (e.target.name === "prenom") {
      setValues({ ...values, firstName: e.target.value });
      if (e.target.value === "") {
        setFeedbackPrenom("is-invalid");
        valide = false;
      } else {
        setFeedbackPrenom("");
      }
    } else if (e.target.name === "nom") {
      setValues({ ...values, lastName: e.target.name });
      if (e.target.value === "") {
        setFeedbackNom("is-invalid");
        if (valide) valide = false;
      } else {
        setFeedbackNom("");
      }
    } else if (e.target.name === "email") {
      setValues({ ...values, email: e.target.value });
      const regexEmail = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
      );
      const emailIsMatch = regexEmail.test(e.target.value);
      if (emailIsMatch) setFeedbackEmail("");
      else {
        setFeedbackEmail("is-invalid");
        if (valide) valide = false;
      }
    } else if (e.target.name === "password") {
      setValues({ ...values, password: e.target.value });
      const regexPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      );
      const passwordIsMatch = regexPassword.test(e.target.value);
      if (passwordIsMatch) setFeedbackPassword("");
      else {
        setFeedbackPassword("is-invalid");
        if (valide) valide = false;
      }
    } else if (e.target.name === "birthdate") {
      setValues({ ...values, birthdate: e.target.value });
      const dateParts = e.target.value.split("-");
      const d = new Date(dateParts[0], dateParts[1], dateParts[2]);
      const now = new Date();
      const dateBefore13Years = new Date(
        now.getFullYear() - 13,
        now.getMonth(),
        now.getDate()
      );
      if (d > dateBefore13Years) {
        setFeedbackBirthdate("is-invalid");
        if (valide) valide = false;
      } else setFeedbackBirthdate("");
    } else if (e.target.name === "genre") {
      setValues({ ...values, gender: e.target.value });
    }
    setFeedbackForm(valide);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedbackForm === false) validateOnSubmit();
    else {
      console.log(values)
      signupUser(values, setErrorSubmit);
    }
  };
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h6 className="signup-welcome-text">Show Your Art</h6>
          <h6 className="signup-welcome-text">Find your next Dbara</h6>
        </div>
        <form className="signup-form row" action="" onSubmit={handleSubmit}>
          <div className="col-12 mb-3">
            <h3>S'inscrire</h3>
          </div>
          {errorSubmit != "" ? (
            <div className="col-12 mb-3 d-flex align-items-center alert-login alert alert-danger">
              <WarningIcon className="pe-1"/>
              {`${errorSubmit}`}
            </div>
          ) : (
            ""
          )}
          <div className="col-6 mb-3">
            <input
              className={`form-control ${feedbackPrenom}`}
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Prénom"
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">
              vous devez donner votre prénom
            </div>
          </div>
          <div className="col-6 mb-3">
            <input
              className={`form-control ${feedbackNom}`}
              type="text"
              name="nom"
              id="nom"
              placeholder="Nom de famille"
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">
              vous devez donner votre nom
            </div>
          </div>
          <div className="col-12 mb-3">
            <input
              className={`form-control ${feedbackEmail}`}
              type="text"
              name="email"
              id="email"
              placeholder="Adresse email"
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">email invalide</div>
          </div>
          <div className="col-12 mb-3">
            <input
              className={`form-control ${feedbackPassword}`}
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              onChange={handleChange}
            />
            <Tooltip
              title={`Le mot de passe doit comporter au moins une lettre minuscule, une lettre majuscule, un chiffre, un caractère spécial et au moins huit caractères.`}
            >
              <div className="invalid-feedback ps-2">mot de passe invalide</div>
            </Tooltip>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="birthdate">
              Date de Naissance
            </label>
            <input
              className={`form-control ${feedbackBirthdate}`}
              type="date"
              max={getDateNow()}
              name="birthdate"
              id="birthdate"
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">
              Vous devez avoir au moins 13 ans
            </div>
          </div>
          <div className="col-12">
            <label className="form-label me-2">Genre</label>
          </div>
          <div className="col-12 mb-3 d-flex gap-2">
            <label className="btn btn-outline-secondary text-start flex-fill">
              <input
                type="radio"
                name="genre"
                id="homme"
                className="form-check-input"
                value="Male"
                autoComplete="off"
                checked
                onChange={handleChange}
              />{" "}
              Homme
            </label>
            <label className="btn btn-outline-secondary text-start  flex-fill">
              <input
                type="radio"
                name="genre"
                id="femme"
                value="Female"
                className="form-check-input"
                autoComplete="off"
                onChange={handleChange}
              />{" "}
              Femme
            </label>
          </div>
          <div className="col-12 d-grid">
            <button className="btn btn-primary mb-1" type="submit">
              S'inscrire
            </button>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <Link to="/login" className="login-forget-password-link">
              Vous avez déja un compte ?
            </Link>
          </div>
        </form>
      </div>
      <div className="signup-welcome-container">
        <h3 className="signup-logo-title">Kochen.</h3>
      </div>
    </div>
  );
}
