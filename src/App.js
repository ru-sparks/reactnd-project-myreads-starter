import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Search from "./Search";
import ListBooks from "./ListBooks";

const BooksApp = () => (
  <div className="app">
    <Switch>
      <Route path="/search" component={Search} />
      <Route path="/" component={ListBooks} />
    </Switch>
  </div>
);

export default BooksApp;
