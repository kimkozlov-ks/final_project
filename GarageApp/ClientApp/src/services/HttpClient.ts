import {authHeader} from "../auth/helpers/auth-header";
import {handleResponse} from "../auth/helpers/handle-response";

interface Response {
    success: boolean,
    err?: string,
    body?: any,
    statusCode?: number
}

export async function get(url: string) : Promise<Response> {
    try {
        const header = {
            method: 'GET',
            headers: authHeader()
        }
        console.log(header);
        const res = await fetch(url, header) ;

        if(res.status != 200)
        {
            return {success: false};
        }

        const data = await res.json();
        
        return {success: true, body: data};
    } catch (err) {
        return {success: false, err: "Logout failed! Exception: " + err }
    }
}

export async function post(url: string, body: string | FormData, headers?: any) : Promise<Response> {
    try {  
        const res = await fetch(url, {
            method: 'POST',
            headers: {...headers, ...authHeader()},
            body: body,
        });
        if(res.status != 200)
        {
            return {success: false, err: `Status code ${res.status}`, statusCode: res.status};
        }
        debugger
        
        if(res.bodyUsed){
            const data = await res.json();
            return {success: true, body: data};
        }

        return {success: true} 
    } catch (err) {
        return {success: false, err: "Exception: " + err };
    }
}

export async function put(url: string, body: string, headers: any) {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {...headers, ...authHeader()},
            body: body
        });

        if(res.status != 200)
        {
            return {success: false, err: `Status code ${res.status}`};
        }

        return {success: true };

    } catch (err) {
        return {success: false, err: "Exception: " + err };
    }
}