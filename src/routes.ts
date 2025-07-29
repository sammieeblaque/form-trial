import React from "react";
import { createBrowserRouter, redirect } from "react-router";

const CompanyDetails = React.lazy(() =>
  import("./components/fileRoutes").then((module) => ({
    default: module.CompanyDirectors,
  }))
);
const CompanyDirectors = React.lazy(() =>
  import("./components/fileRoutes").then((module) => ({
    default: module.DirectorsShareholder,
  }))
);
const KycDocStuffNav = React.lazy(() => import("./components/sideNavigation"));

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/compliance/company-information"),
  },
  {
    path: "compliance/company-information",
    Component: CompanyDetails,
  },
  {
    path: "compliance/directors-owners",
    Component: CompanyDirectors,
  },
  {
    path: "compliance/kyc-documents",
    Component: KycDocStuffNav,
  },
]);
