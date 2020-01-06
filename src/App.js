import React from "react";
import Router from "./Router";
import { RestfulProvider } from "restful-react";
import { connect } from "react-redux";

const makeAuth = token => {
  console.log(token);
  return { headers: { Authorization: "Bearer " + token } };
};

function App({ isAuth, authToken }) {
  return (
    <RestfulProvider
      base="http://localhost:8089/api"
      requestOptions={isAuth ? makeAuth(authToken) : null}
    >
      <Router />
    </RestfulProvider>
  );
}

const mapStateToProps = state => {
  return {
    authToken: state.authReducer.token,
    isAuth: state.authReducer.isAuth
  };
};
export default connect(mapStateToProps)(App);
