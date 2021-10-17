import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { MainPage } from "./pages/MainPage";
import "./styles/index.css";

export const App: React.FC = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html")!.style.scrollBehavior = "smooth";
    window.scroll({ top: 0 });
    document.querySelector("html")!.style.scrollBehavior = "auto";
  }, [location.pathname]); // triggered on route change

  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
    </Switch>
  );
};
