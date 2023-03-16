import React from "react";
import baseURL from "../Config";
import { Link } from "react-router-dom";
import { emailcheck } from "../utils/emailcheck";
import { useNavigate } from "react-router-dom";

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

    const res = await fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();

    // check for error
    if (data.error) {
      alert(data.error);
      return;
    } else {
      if (data.isadmin === 1) {
        navigate("/admin");
      } else {
        navigate("/user");
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
