
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import './index.css'

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import AuthRequired from "auths/AuthRequired";

const renderElement = document.getElementById("root");

const Index = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AuthRequired Render={() => (<AdminLayout redirectTo='/auth/login' {...props} />)} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="*" to="/admin/home" />
      </Switch>
    </BrowserRouter>
  )
}
ReactDOM.render(<Index/>,renderElement);
