import { Navigate } from "react-router-dom";
import React from "react";
import axios from "../httpreq";

function Logout() {
  async function logoutapi() {
    await axios.get("/logout");
  }

  logoutapi();
  return <Navigate to="/login" />;
}

export default Logout;
