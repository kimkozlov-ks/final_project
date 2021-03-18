import * as React from 'react';
import {Component, ComponentProps} from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../store";
import {Redirect} from "react-router";
import * as AuthStore from "../store/AuthStore";

type AuthRedirectProps =
    AuthStore.AuthState;

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<AuthRedirectProps>{
        render() {

            if(!this.props.loggedIn) return <Redirect to={'/login-form'}/>
            
            return <Component {...this.props}/>;
        }
    }
    
    return connect(
        (state: ApplicationState) => {
            return {
                loggedIn: state.authStore.loggedIn,
                userInfo: state.authStore.userInfo
            }
        }
    )(RedirectComponent as any);
}

