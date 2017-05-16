import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePageContainer from './HomePageContainer';
import DashboardContainer from './DashboardContainer';
import NotFound from './NotFound';


export default function RootComponent() {
  let authenticate = () => {
  console.log('hello');
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/dashboard" onEnter={authenticate} component={DashboardContainer} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
