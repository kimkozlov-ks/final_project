

interface Response {
    success: boolean,
    err?: string,
    body?: any
}

export async function get(url: string) : Promise<Response> {
    try {  
        const res = await fetch(url, {
            method: 'GET',
        }) ;

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

export async function post(url: string, body: string, headers: any) {
    try {  
        const res = await fetch(url, {
            method: 'POST',
            headers: headers,
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

export async function put(url: string, body: string, headers: any) {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: headers,
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