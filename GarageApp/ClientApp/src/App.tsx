import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import './custom.css'
import LoginForm from "./auth/LoginForm";
import Logout from "./auth/Logout";
import AdminArea from "./components/admin/AdminArea";
import GarageWrapper from "./components/garage/GarageWrapper";

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/adminArea' component={AdminArea} />
        <Route path='/garage' component={GarageWrapper} />
        <Route exact path='/login-form' component={LoginForm} />
        <Route exact path='/logout' component={Logout} />
    </Layout>
);
