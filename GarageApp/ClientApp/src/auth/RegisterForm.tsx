import * as React from 'react';
import {PureComponent} from "react";
import {connect} from "react-redux";
import * as AuthStore from "./AuthStore";
import {ApplicationState} from "../store";
import {Redirect, RouteComponentProps} from "react-router";

type RegisterFormProps =
    AuthStore.AuthState &
    typeof AuthStore.actionCreators &
    RouteComponentProps<{}>;

interface IState {
    name: string;
    password: string;
}

class RegisterForm extends PureComponent<RegisterFormProps, IState>{
    constructor(props: RegisterFormProps) {
        super(props);

        this.state = {
            name: "",
            password: ""
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(e: any) {
        let val = e.target.value;
        this.setState({name: val});
    }

    onPasswordChange(e: any) {
        let val = e.target.value;
        this.setState({password: val});
    }

    onSubmit(event: any){
        event.preventDefault();
        this.props.register(this.state.name, this.state.password);
    }

    public render() {
        if(this.props.loggedIn) return (<Redirect to={"/"}/>)
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>{this.props.errorMessage}</label>
                </div>
                <p>
                    <label>Username:</label><br />
                    <input type="text" value={this.state.name} onChange={this.onUsernameChange} minLength={8} maxLength={255}/>
                </p>
                <p>
                    <label>Password:</label><br />
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} minLength={8} maxLength={255}/>
                </p>
                <input type="submit" value="Register" />
            </form>
        );
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            loggedIn: state.authStore.loggedIn,
            userInfo: state.authStore.userInfo,
            errorMessage: state.authStore.errorMessage }
    },
    AuthStore.actionCreators
)(RegisterForm as any);