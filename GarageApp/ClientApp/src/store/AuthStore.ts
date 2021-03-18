import { Action, Reducer} from "redux";
import UserInfo from "./UserInfo";
import {AppThunkAction} from "./index";
import {decodeToken, isExpired} from "react-jwt";
import Logout from "../components/auth/Logout";

export interface AuthState{
    loggedIn: boolean;
    userInfo: UserInfo;
    errorMessage: string;
}

export interface LoginAction { type: 'LOGIN', user: UserInfo }
export interface LoginFailAction { type: 'LOGIN_FAIL', errorMessage: string }
export interface LogoutAction { type: 'LOGOUT' }
export interface LogoutFailAction { type: 'LOGOUT_FAIL', errorMessage: string }

export type KnownAction = LoginAction | LogoutAction | LoginFailAction | LogoutFailAction;

const emptyState: AuthState = { 
    loggedIn: false,  
    userInfo: new UserInfo(null),
    errorMessage: ''
};

const baseUrl = 'https://localhost:5001/api/auth/'

export const actionCreators = {
    login: (username: string, password: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        console.log("!!!");
        try {
            const url = baseUrl + 'login';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            }) ;
            
            if(res.status != 200)
            {
                return dispatch({type: 'LOGIN_FAIL', errorMessage: 'Incorrect input'} as LoginFailAction);
            }
            
            const  data  = await res.json();
            const decodedToken = decodeToken(data.value);
            localStorage.setItem('accessToken', data.value);
            return dispatch({type: 'LOGIN', user: decodedToken} as LoginAction);

        } catch (err) {
            return dispatch({type: 'LOGIN_FAIL', errorMessage: 'Incorrect input'} as LoginFailAction);
        }
    },
    logout: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        try {
            const url = baseUrl + 'logout';
            const res = await fetch(url, {
                method: 'GET',
            }) ;

            if(res.status != 200)
            {
                return dispatch({type: 'LOGOUT_FAIL', errorMessage: 'Logout failed'} as LogoutFailAction);
            }
            localStorage.removeItem('accessToken');
            return dispatch({type: 'LOGOUT'} as LogoutAction);
        } catch (err) {
            return dispatch({type: 'LOGOUT_FAIL', errorMessage: 'Exception'} as LogoutFailAction);
        }
    }
};

export const reducer: Reducer<AuthState> = (state: AuthState = emptyState, incomingAction: Action): AuthState => {
    const action = incomingAction as KnownAction;
    
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                userInfo: new UserInfo(action.user)
            };
        case 'LOGIN_FAIL':
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
                userInfo: emptyState.userInfo,
                errorMessage: ''
            };
        case 'LOGOUT_FAIL':
            return {
                ...state,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};