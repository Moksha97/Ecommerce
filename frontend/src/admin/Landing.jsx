import React from "react";
import { Link } from "react-router-dom";

function AdminLanding() {
  return (
    <div>
      <h1>Welcome to the admin landing page</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default AdminLanding;
