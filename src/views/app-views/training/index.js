import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Training = ({ match }) => {
  return(
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/training_list`} component={lazy(() => import(`./training_list`))} />
      <Route path={`${match.url}/reporting_training`} component={lazy(() => import(`./reporting_training`))} />	
		<Route path={`${match.url}/training_to_confirm`} component={lazy(() => import(`./training_to_confirm`))} />	
      <Redirect from={`${match.url}`} to={`${match.url}/training_list`} />
    </Switch>
  </Suspense>
)};

export default Training;