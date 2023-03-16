import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductLanding from "./product/Landing";
import Landing from "./users/Landing";
import AdminLanding from "./admin/Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<ProductLanding />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user" element={<Landing />} />
          <Route exact path="/admin" element={<AdminLanding />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
