import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import { CookiesProvider } from "react-cookie";
import './custom.css'
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";
import Register from "./auth/RegisterForm";
import AdminArea from "./components/admin/AdminArea";
import GarageWrapper from "./components/garage/GarageWrapper";
import {useEffect} from "react";
import * as AuthStore from "./auth/AuthStore";
import * as TypesStore from "../src/store/adminAreaStore/TypesStore"
import * as BrandsStore from "../src/store/adminAreaStore/BrandsStore"
import {connect} from "react-redux";

type ReduxProps = {
    getTypes: () => void
    getBrands: () => void
    loginFromStorage: () => void
}

type AppProps =
    AuthStore.AuthState &
    ReduxProps

const App: React.FC<AppProps> = (props: AppProps) => {
    
    useEffect(() =>{
        props.loginFromStorage()
        props.getTypes();
        props.getBrands();
    })
    
    return (
        <CookiesProvider>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/adminArea' component={AdminArea} />
                <Route path='/garage' component={GarageWrapper} />
                <Route exact path='/login-form' component={LoginForm} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/register' component={Register} />
            </Layout>
        </CookiesProvider>
    )
}

const mapActionsToProps = {
    loginFromStorage: AuthStore.actionCreators.loginFromStorage,
    getTypes: TypesStore.actionCreators.getTypes,
    getBrands: BrandsStore.actionCreators.getBrands,
}

export default connect(
    state => {},
    mapActionsToProps
)(App as any)

