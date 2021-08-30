import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { State } from 'store/reducer';
import { PrivatePublicRouteProps } from 'routes/types';

const PublicRoute: React.FC<PrivatePublicRouteProps> = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props: any) =>
                isAuthenticated ? <Redirect to='/' /> : <Component {...props} />
            }
        />
    );
};

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
