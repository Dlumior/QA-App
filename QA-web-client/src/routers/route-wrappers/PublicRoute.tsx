import React from "react";
import { Route } from "react-router-dom";

import { HOME } from "../routes";

type PublicRouteProps = {
  component: React.FC;
  path: string;
};

const PublicRoute = ({ component, path, ...rest }: PublicRouteProps) => (
  <Route component={component} path={path} exact {...rest} />
);

export default PublicRoute;
