import * as React from 'react'
import {connect} from "react-redux";
import {ApplicationState} from "../store";
import * as AuthStore from "../auth/AuthStore";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";

type LogoutProps =
    AuthStore.AuthState &
    typeof AuthStore.actionCreators;

function Logout(Props: LogoutProps) {
    if(Props.errorMessage) return (<h1>{Props.errorMessage}</h1>);
    
    Props.logout();
    
    return (<div></div>);
}

let withConnect = connect(
    (state: ApplicationState) => {
        return {
            errorMessage: state.authStore.errorMessage }
    },
    AuthStore.actionCreators
)(Logout as any)

export default compose(
    withAuthRedirect
)(withConnect, '/login-form');
