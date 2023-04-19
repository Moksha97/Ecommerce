import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../utils/httpreq";
// import { passwordcheck } from "../utils/passwordcheck";

// signup page with a error handling
function Signup() {
  const navigate = useNavigate();

  async function signupapi(username, password, fname, lname, phone) {
    // check if all fields are filled
    if (username === "" || password === "" || fname === "" || lname === "" || phone === "") {
      alert("Please fill in all fields");
      return;
    }

    const data = await axios.post("/signup", {
      username: username,
      password: password,
      fname: fname,
      lname: lname,
      phone: phone,
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
        <input type="phone" id="phone" placeholder="phone number" />
        <button
          type="button"
          onClick={() =>
            signupapi(
              document.getElementById("username").value,
              document.getElementById("password").value,
              document.getElementById("fname").value,
              document.getElementById("lname").value,
              document.getElementById("phone").value
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
