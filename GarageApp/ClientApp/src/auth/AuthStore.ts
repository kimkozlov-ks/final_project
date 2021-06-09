import {Action, Reducer} from "redux";
import UserInfo from "../store/UserInfo";
import  AuthService from "./AuthService"
import {decodeToken} from "react-jwt";
import {AppThunkAction} from "../store";

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

export const actionCreators = {
    login: (username: string, password: string): AppThunkAction<KnownAction> => async (dispatch) => {
        const result = await AuthService.login(username, password);
        
        return result.success
            ? dispatch({type: 'LOGIN', user: decodeToken(result.body!)} as LoginAction)
            : dispatch({type: 'LOGIN_FAIL', errorMessage: result.err} as LoginFailAction);
    },
    register: (username: string, password: string): AppThunkAction<KnownAction> => async (dispatch) => {
        const result = await AuthService.register(username, password);
        debugger
        return result.success
            ? dispatch({type: 'LOGIN', user: decodeToken(result.body!)} as LoginAction)
            : dispatch({type: 'LOGIN_FAIL', errorMessage: result.err} as LoginFailAction);
    },
    logout: (): AppThunkAction<KnownAction> => async (dispatch) => {
        const result = await AuthService.logout();

        return result.success
            ? dispatch({type: 'LOGOUT'} as LogoutAction)
            : dispatch({type: 'LOGOUT_FAIL', errorMessage: result.err} as LogoutFailAction);
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