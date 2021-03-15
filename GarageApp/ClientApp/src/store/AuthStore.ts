import { Action, Reducer} from "redux";
import UserInfo from "./UserInfo";
import {AppThunkAction} from "./index";
import {decodeToken, isExpired} from "react-jwt";

export interface AuthState{
    loggedIn: boolean;
    userInfo: UserInfo;
}

export interface LoginAction { type: 'LOGIN', user: UserInfo }
export interface LogoutAction { type: 'LOGOUT' }

export type KnownAction = LoginAction | LogoutAction;

const emptyState: AuthState = { 
    loggedIn: false,  
    userInfo: new UserInfo(null)
};

const baseUrl = 'https://localhost:5001/api/auth/'

export const actionCreators = {
    login: (username: string, password: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        console.log("!!!");
        try {
            let url = baseUrl + 'login';
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            }) ;
            const  data  = await res.json()
            console.log(data);
            const decodedToken = decodeToken(data.value);
            console.log(decodedToken);        
            return dispatch({type: 'LOGIN', user: decodedToken} as LoginAction);

        } catch (err) {
            console.log(err)
        }
    },
    logout: () => ({ type: 'LOGOUT' } as LogoutAction)
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
        case 'LOGOUT':
            return state;
        default:
            return state;
    }
};