import React from "react";
import { emailcheck } from "../utils/emailcheck";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../httpreq";
// import { passwordcheck } from "../utils/passwordcheck";

// signup page with a error handling
function Signup() {
  const navigate = useNavigate();

  async function signupapi(username, password, fname, lname) {
    // check if all fields are filled
    if (username === "" || password === "" || fname === "" || lname === "") {
      alert("Please fill in all fields");
      return;
    }

    // check if email is valid
    if (!emailcheck(username)) {
      alert("Invalid email");
      return;
    }

    const data = await axios.post("/signup", {
      username: username,
      password: password,
      fname: fname,
      lname: lname,
    });

    if (data.error) {
      alert(data.error);
    } else {
      navigate("/users");
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <input type="email" id="username" placeholder="username" />
        <input type="password" id="password" placeholder="password" />
        <input type="text" id="fname" placeholder="first name" />
        <input type="text" id="lname" placeholder="last name" />
        <button
          type="button"
          onClick={() =>
            signupapi(
              document.getElementById("username").value,
              document.getElementById("password").value,
              document.getElementById("fname").value,
              document.getElementById("lname").value
            )
          }
        >
          Signup
        </button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
