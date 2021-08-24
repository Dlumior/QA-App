import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { HOME, PRIVATE } from "../routes";

type PrivateRouteProps = {
  Component: React.FC;
  path: string;
};

const PrivateRoute = ({
  Component,
  path = PRIVATE,
  ...rest
}: PrivateRouteProps) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      exact
      path={path}
      render={({ location }) =>
        auth?.user?.isAuthenticated ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: HOME,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
