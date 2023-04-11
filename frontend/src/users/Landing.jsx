import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/httpreq";

async function test() {
  await axios.get("/");
}

function UserLanding() {
  return (
    <div>
      <h1 onClick={test}>Welcome to the users landing page</h1>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default UserLanding;
