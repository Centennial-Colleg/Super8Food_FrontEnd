// api-history.js

import { getToken } from "../components/auth/auth-helper";

let apiURL = import.meta.env.VITE_APP_APIURL;
let endpoint = "/api/history/";

const list = async () => {
    try {
        let response = await fetch(apiURL + endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export { list };