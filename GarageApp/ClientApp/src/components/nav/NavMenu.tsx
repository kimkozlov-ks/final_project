import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {Link, RouteComponentProps} from 'react-router-dom';
import './NavMenu.css';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as AuthStore from "../../auth/AuthStore";
import {UserRole} from "../../helpers/interface";

type Props =
    AuthStore.AuthState &
    RouteComponentProps<{}>;

class NavMenu extends React.PureComponent<Props, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">GarageApp</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                {
                                    this.props.userInfo.role == UserRole.ADMIN
                                    ? <>
                                        <NavItem>
                                            <NavLink tag={Link} className="text-dark"
                                                     to="/adminArea">AdminArea</NavLink>
                                        </NavItem>
                                    </>
                                    : null
                                }
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/garage/">Garage</NavLink>
                                </NavItem>
                                {
                                    !this.props.loggedIn 
                                        ?  <>
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-dark" to={'/login-form'}>Login</NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-dark" to={'/register'}>Register</NavLink>
                                                </NavItem>                     
                                             </>
                                        :  
                                            <NavItem>
                                                <NavLink tag={Link} className="text-dark" to={'/logout'}>Logout</NavLink>
                                            </NavItem>
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => {
        return {
            loggedIn: state.authStore.loggedIn,
            userInfo: state.authStore.userInfo,
            errorMessage: state.authStore.errorMessage }
    }
)(NavMenu as any);