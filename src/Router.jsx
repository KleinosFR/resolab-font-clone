import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./LoginPage/LoginPage";
import UserPage from "./UserPage/UserPage";
import ModeratorPage from "./ModeratorPage/ModeratorPage";
import SettingsPage from "./SettingsPage/SettingsPage";
import WebcamComponent from "./UserPage/WebcamComponent";
import PostArticle from "./UserPage/PostArticle";

function AuthRouteUser({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

function AuthRouteModerator({ isAuth, role, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth & (role === "ROLE_MODERATOR") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}

function Router({ isAuth, roles }) {
  const userRole = roles[0];

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/test" component={WebcamComponent} />
        <AuthRouteUser isAuth={isAuth} path="/user" component={UserPage} />
        <AuthRouteModerator
          path="/moderator"
          isAuth={isAuth}
          role={userRole}
          component={ModeratorPage}
        />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth,
    roles: state.userReducer.roles
  };
};

export default connect(mapStateToProps)(Router);
