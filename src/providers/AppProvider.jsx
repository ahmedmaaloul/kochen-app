import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import AppContext from "../context/AppContext";
import axios from "axios";

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (!user) {
      if (window.location.pathname != "/signup") navigate("/login");
      setLoading(false);
      return;
    }
    user = JSON.parse(user);
    user = user.data
    const decodedToken = jwt(user.token);
    if (decodedToken.exp < Date.now() / 1000) {
      localStorage.removeItem("user");
      navigate("/login");
      setLoading(false);
      return;
    }
    setUser(user);
    if (
      window.location.pathname == "/signup" ||
      window.location.pathname == "/login"
    )
      navigate("/");
    if(user.data === undefined)
      setLoading(false);
  }, [user]);
  const loginUser = ({ email, password }, setError) => {
    axios
      .post("http://localhost:5000/api/v1/users/login", {
        email,
        password,
      })
      .then((res) => {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  const signupUser = (values, setError) => {
    axios
      .post("http://localhost:5000/api/v1/users/create", values)
      .then((res) => {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.error);
      });
  };
  const updateUser=(user)=>{
    setLoading(true)
    localStorage.removeItem("user");
    localStorage.setItem("user",JSON.stringify(user));
    setUser(user)
    setLoading(false)
  }
  const logoutUser =()=>{
    setLoading(true)
    localStorage.removeItem("user");
    navigate("/login");
    setLoading(false);
  }
  const services = {
    user,
    setUser,
    loginUser,
    signupUser,
    updateUser,
    logoutUser,
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return <AppContext.Provider value={services}>{children}</AppContext.Provider>;
}
