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
      requestOptions={() => ({
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1Nzg0MDc4MTMsImV4cCI6MTU3ODQxMTQxMywicm9sZXMiOlsiUk9MRV9TVFVERU5UIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoic3R1ZGVudF8yIn0.FN-Xa4NekKYVhmXlXK6erH_Rz6H-eQcA-LfKx275KOqNyHMuHH-62zYNeOdnR0un5T28NCEpimh3BlviyIp9woDNjPadP_UWYQTdkCtgZx2qIxH8WGvlVzeLyIvOQikK3HLhXQVik8Yy9ArWryqGcuRtQT_BGWLhOz0OD5cFt_Py3j0yBxDNVEN8EI7kw-ta6dkLrYtGBpguCuCyxdDKr8gQDVjwQOtqjaeK6earEWaBBYx9ztXwMjrxH_J2zJSf8g7XCuud3Ngt5Hx1dRudUKJdSwkFULw0gFhegq7d20QYZy6EGKMY5ipTfp_d1cFLMDego0iuzOAdKGT6Iwpb8Q`,
          "Content-Type": "application/json",
          Prefer: ""
        }
      })}
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
