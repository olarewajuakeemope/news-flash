import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePageContainer from './HomePageContainer';


export default function RootComponent() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
      </Switch>
    </BrowserRouter>
  );
}
