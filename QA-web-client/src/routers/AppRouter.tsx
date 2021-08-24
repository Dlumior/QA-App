import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./route-wrappers/PrivateRoute";
import PublicRoute from "./route-wrappers/PublicRoute";

import HomePage from "../pages/HomePage";

import * as ROUTES from "./routes";
import { ProvideAuth } from "../hooks/useAuth";
import QuestionPage from "../pages/QuestionPage";

const AppRouter = () => (
  <ProvideAuth>
    <Router basename={import.meta.env.PROD ? import.meta.env.BASE_URL : ""}>
      <Switch>
        <PublicRoute component={QuestionPage} path={ROUTES.QUESTION} />
        <PublicRoute component={HomePage} path={ROUTES.HOME} />
      </Switch>
    </Router>
  </ProvideAuth>
);

export default AppRouter;
