import { createBrowserRouter, redirect } from "react-router";
import React from "react";

const ComplianceFormLayout = React.lazy(
  () => import("./components/complainceFormLayout")
);

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/compliance/company-information"),
  },
  {
    path: "compliance/company-information",
    Component: ComplianceFormLayout,
  },
  {
    path: "compliance/directors-owners",
    Component: ComplianceFormLayout,
  },
  {
    path: "compliance/kyc-documents",
    Component: ComplianceFormLayout,
  },
]);
