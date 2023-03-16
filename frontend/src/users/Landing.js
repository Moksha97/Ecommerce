import React from "react";
import { Link } from "react-router-dom";
import axios from "../httpreq";

async function test() {
  // axios with credentials
  var res = await axios.get("/");
  console.log(res.data);
}

function Landing() {
  test();
  return (
    <div>
      <h1>Welcome to the users landing page</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default Landing;
