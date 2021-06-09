interface Response {
    success: boolean,
    err?: string,
    body?: string
}

const ACCESS_TOKEN_KEY = 'accessToken';
const baseUrl = 'https://localhost:5001/api/auth/';

const AuthService = {
    login: async function (username: string, password: string) : Promise<Response> {
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
                return {success: false, err: "Incorrect input" }
            }
    
            const data = await res.json();
            localStorage.setItem(ACCESS_TOKEN_KEY, data.value);
            return {success: true, body: data.value };
    
        } catch (err) {
            return {success: false, err: "Login failed! Exception: " + err };
        }
    },
        
    register: async function (username: string, password: string) : Promise<Response> {
        try {
            debugger
            const url = baseUrl + 'register';
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
                return {success: false, err: "Incorrect input" }
            }

            const data = await res.json();
            localStorage.setItem(ACCESS_TOKEN_KEY, data.value);
            return {success: true, body: data.value };

        } catch (err) {
            return {success: false, err: "Register failed! Exception: " + err };
        }
    },

    logout: async function() : Promise<Response> {
        try {
            const url = baseUrl + 'logout';
            const res = await fetch(url, {
                method: 'GET',
            }) ;

            if(res.status != 200)
            {
                return {success: false};
            }

            localStorage.removeItem(ACCESS_TOKEN_KEY);
            return {success: true};
        } catch (err) {
            return {success: false, err: "Logout failed! Exception: " + err }
        }
    }
}

export default AuthService;