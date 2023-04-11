import React from "react";
import { Link } from "react-router-dom";

function ProductLanding() {
  return (
    <div>
      <h1>Welcome to the product landing page</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
}

export default ProductLanding;