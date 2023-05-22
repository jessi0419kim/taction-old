import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
		<Route path={`${APP_PREFIX_PATH}/match`} component={lazy(() => import(`./match`))} />	
		<Route path={`${APP_PREFIX_PATH}/dashboard`} component={lazy(() => import(`./dashboard`))} />	
		<Route path={`${APP_PREFIX_PATH}/training`} component={lazy(() => import(`./training`))} />	
		 <Route path={`${APP_PREFIX_PATH}/event`} component={lazy(() => import(`./event`))} />	
		  <Route path={`${APP_PREFIX_PATH}/editProfile`} component={lazy(() => import(`./editProfile`))} />	
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/dashboard`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);