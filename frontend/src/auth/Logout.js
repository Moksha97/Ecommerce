import baseURL from "../Config";
import { Navigate } from "react-router-dom";
import React from "react";

function Logout() {
  async function logoutapi() {
    await fetch(baseURL + "/logout");
  }

  logoutapi();
  return <Navigate to="/login" />;
}

export default Logout;
