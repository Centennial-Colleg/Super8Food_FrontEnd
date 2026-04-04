
// api-orders.js reviewed by Mohd Javed Khan – logic verified, no modifications made

import { getToken } from "../components/auth/auth-helper";

let apiURL = import.meta.env.VITE_APP_APIURL;
let endpoint = "/api/order/";

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

const create = async (item) => {
    try {
        let response = await fetch(apiURL + endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(item)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const update = async (item, id) => {
    try {
        let response = await fetch(apiURL + endpoint + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(item)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

const remove = async (id) => {
    try {
        let response = await fetch(apiURL + `/api/order/disable/` + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const getOne = async (id) => {
    try {
        let response = await fetch(apiURL + endpoint + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export { list, create, update, remove, getOne };