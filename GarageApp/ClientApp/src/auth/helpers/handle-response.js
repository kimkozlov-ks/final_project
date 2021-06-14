import {actionCreators} from '../AuthStore'
import AuthService from "../AuthService";
import {useDispatch} from 'react-redux'

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1) {
                const result = AuthService.refresh()
                if(!result.success){
                    const dispatch = useDispatch()
                    const result = dispatch(actionCreators.logout())
                }
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}