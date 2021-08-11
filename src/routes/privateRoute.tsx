import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { State} from 'store/reducer';

export interface PrivatePublicRouteProps {
    isAuthenticated: boolean;
    component:React.FunctionComponent<any>;
}; 
const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }: PrivatePublicRouteProps) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state:State) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);