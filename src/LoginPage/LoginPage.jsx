import React from "react";

import Layout from "../Layout/Layout";
import LogIn from "./LogIn";
import { Container } from "@material-ui/core";

export default function LoginPage() {
  return (
    <Layout>
      <Container maxWidth="sm" style={{ marginTop: "111px" }}>
        <LogIn />
      </Container>
    </Layout>
  );
}
