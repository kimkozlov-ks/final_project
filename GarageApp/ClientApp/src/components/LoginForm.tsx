import * as React from 'react';
import {PureComponent} from "react";
import {connect} from "react-redux";
import * as AuthStore from "../store/AuthStore";
import {ApplicationState} from "../store";
import {RouteComponentProps} from "react-router";
import * as CounterStore from '../store/Counter';

type LoginFormProps =
    AuthStore.AuthState &
    typeof AuthStore.actionCreators &
    RouteComponentProps<{}>;

interface IState {
    name: string;
    password: string;
}

class LoginForm extends PureComponent<LoginFormProps, IState>{
    constructor(props: LoginFormProps) {
        super(props);

        this.state = {
            name: "", 
            password: ""
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }
    
    onUsernameChange(e: any) {
        let val = e.target.value;
        this.setState({name: val});
    }

    onPasswordChange(e: any) {
        let val = e.target.value;
        this.setState({password: val});
    }
    
    public render() {
        return (
            <form onSubmit={(event) => {
                event.preventDefault();
                this.props.login(this.state.name, this.state.password);
            }}>
                <p>
                    <label>Username:</label><br />
                    <input type="text" value={this.state.name} onChange={this.onUsernameChange} minLength={8} maxLength={255}/>
                </p>
                <p>
                    <label>Password:</label><br />
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} minLength={8} maxLength={255}/>
                </p>
                <input type="submit" value="Login" />
                <label>
                    <p>
                        {this.props.userInfo.username}
                    </p>
                    </label>
            </form>
        );
    }
}

export default connect(
     (state: ApplicationState) => {
         console.log(state);
         return { 
             isLoggedIn: state.authStore.loggedIn,
             userInfo: state.authStore.userInfo
         };
         },
    AuthStore.actionCreators
)(LoginForm as any);