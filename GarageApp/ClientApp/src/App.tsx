import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';

import './custom.css'
import LoginForm from "./components/LoginForm";
import Logout from "./components/auth/Logout";

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
        <Route exact path='/login-form' component={LoginForm} />
        <Route exact path='/login-form' component={Logout} />
    </Layout>
);
