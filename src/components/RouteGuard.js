import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminWrapper from './AdminWrapper';

const RouteGuard = ({ component: Component, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag=true : flag=false
        
        return flag
    }

    return (
        <Route {...rest}
            render={props => (
                hasJWT() ?

                    <AdminWrapper component={Component} {...rest} / >
                    :
                    <Redirect to={{ pathname: '/login' }} />
            )}
        />
    );
};

export default RouteGuard;