import React from "react";
import { HydraAdmin, ResourceGuesser } from "@api-platform/admin";
import parseHydraDocumentation from "@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation";
import { connect } from "react-redux";

import {
  dataProvider as baseDataProvider,
  fetchHydra as baseFetchHydra
} from "@api-platform/admin";

import { Redirect } from "react-router-dom";

function AdminPage() {
  const entrypoint = "http://localhost:8089/api";

  const fetchHeaders = {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
      ...options,
      headers: new Headers(fetchHeaders)
    });

  // const apiDocumentationParser = entrypoint =>
  //     parseHydraDocumentation(entrypoint, {
  //         headers: new Headers(fetchHeaders)
  //     }).then(
  //         ({ api }) => ({ api }),

  //         result => {
  //             switch (result.status) {
  //                 case 401:
  //                     return Promise.resolve({
  //                         api: result.api,

  //                         customRoutes: [
  //                             {
  //                                 props: {
  //                                     path: "/",

  //                                     render: () => <Redirect to={`/login`} />
  //                                 }
  //                             }
  //                         ]
  //                     });

  //                 default:
  //                     return Promise.reject(result);
  //             }
  //         }
  //     );

  // const dataProvider = baseDataProvider(
  //     entrypoint,
  //     fetchHydra,
  //     apiDocumentationParser
  // );

  return (
    <HydraAdmin entrypoint={entrypoint}>
      <ResourceGuesser name="users" />
      <ResourceGuesser name="alerts" />
      <ResourceGuesser name="classrooms" />
    </HydraAdmin>
  );
}

export default AdminPage;
