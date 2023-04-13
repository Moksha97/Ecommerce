import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLanding from "./pages/UserLanding";
import AdminLanding from "./pages/AdminLanding";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<UserLanding />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/admin" element={<AdminLanding />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
