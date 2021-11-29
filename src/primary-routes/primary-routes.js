import React from "react";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import { Route, Switch } from "react-router-dom";
import Order from "../pages/order/Order";
import Wishlist from "../pages/wishlist/Wishlist";
import AdminHome from "../pages/admin-home/Admin-home";

import Profile from "../pages/profile/Profile";

const PrimaryRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/orders" component={Order} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/admin/home" component={AdminHome} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
};

export default PrimaryRoutes;
