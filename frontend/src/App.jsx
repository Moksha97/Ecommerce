import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserLanding from "./pages/UserLanding";
import AdminLanding from "./pages/AdminLanding";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import Product from "./pages/Product";
import OrderHistory from "./pages/OrderHistory";
import Invoice from "./pages/Invoice";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { notification } from "antd";

function App() {
  const [api, contextHolder] = notification.useNotification();
  return (
    <div className="App">
      {contextHolder}
      <Router>
        <Routes>
          <Route exact path="/" element={<UserLanding notification={api} />} />
          <Route exact path="/login" element={<Login notification={api} />} />
          <Route
            exact
            path="/admin"
            element={<AdminLanding notification={api} />}
          />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup notification={api} />} />
          <Route
            exact
            path="/product/:id"
            element={<Product notification={api} />}
          />
          <Route exact path="/invoice/:id" element={<Invoice />} />
          <Route exact path="/orders" element={<OrderHistory />} />
          <Route exact path="/cart" element={<Cart notification={api} />} />
          <Route
            exact
            path="/profile"
            element={<Profile notification={api} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
