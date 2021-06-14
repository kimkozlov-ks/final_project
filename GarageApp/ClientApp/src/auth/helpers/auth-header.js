import {ACCESS_TOKEN_KEY} from "./constants";

export function authHeader() {
    // return authorization header with jwt token
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (accessToken) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {Authorization: ''};
    }
}