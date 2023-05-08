import React, { useState,useContext } from 'react'
import { Navigate } from 'react-router-dom';
import AppContext from "../../context/AppContext"
export default function PrivateRoute({children}) {
  const {user} = useContext(AppContext)
    const [jwt,setJwt]= useState("");
  return jwt ? children : <Navigate to="/login"/>
}
