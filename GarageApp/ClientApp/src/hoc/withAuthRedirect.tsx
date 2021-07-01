import * as React from 'react';
import {Component} from 'react';
import {connect} from "react-redux";
import {ApplicationState} from "../store";
import {Redirect} from "react-router";
import * as AuthStore from "../auth/AuthStore";
import {AuthRedirectType, UserRole} from "../helpers/interface";

type AuthRedirectProps =
    AuthStore.AuthState;

export const withAuthRedirect = (Component: any, redirectPage: string, conditionType: AuthRedirectType = AuthRedirectType.LOGGED_IN) => {
    class RedirectComponent extends React.Component<AuthRedirectProps>{
        render() {
            switch (conditionType){
               case AuthRedirectType.ADMIN_ROLE:
                   if(!(this.props.userInfo.role === UserRole.ADMIN)) return <Redirect to={redirectPage}/>
                   break
               case AuthRedirectType.LOGGED_IN:
                   if(!this.props.loggedIn)  return <Redirect to={redirectPage}/>
                   break
               default:  break
            }

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

