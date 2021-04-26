import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Search from "./Search";
import MainPage from "./MainPage";

const BooksApp = () => (
  <div className="app">
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/" component={MainPage} />
    </Switch>
  </div>
);

export default BooksApp;
