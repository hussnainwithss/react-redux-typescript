import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { PrivatePublicRouteProps } from 'routes/privateRoute';
import { State } from 'store/reducer';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}: PrivatePublicRouteProps) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    );
};

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
