import React from "react";
import { Link } from "react-router-dom";
import { emailcheck } from "../utils/emailcheck";
import { useNavigate } from "react-router-dom";
import axios from "../httpreq";

function Login() {
  const navigate = useNavigate();

  async function loginapi(username, password) {
    // check if all fields are filled
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    // check if email is valid
    if (!emailcheck(username)) {
      alert("Invalid email");
      return;
    }

    const data = await axios.post("/login", {
      username: username,
      password: password,
    });

    // check for error
    if (data.error) {
      alert(data.error);
      return;
    } else {
      if (data.isadmin === 1) {
        navigate("/admin");
      } else {
        navigate("/users");
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" placeholder="password" />
        <button
          type="button"
          onClick={() =>
            loginapi(
              document.getElementById("username").value,
              document.getElementById("password").value
            )
          }
        >
          Login
        </button>
      </form>
      <Link to="/Signup">Signup</Link>
    </div>
  );
}

export default Login;
