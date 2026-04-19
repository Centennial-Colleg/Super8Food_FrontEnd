// api-users.js

import { getToken } from "../components/auth/auth-helper";

let apiURL = import.meta.env.VITE_APP_APIURL;

const create = async (item) => {
    try {
        let response = await fetch(apiURL + "/auth/signup/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const getProfile = async () => {
    try {
        let response = await fetch(apiURL + '/api/users/profile', {
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
}

const updateProfile = async (user) => {
    try {
        let response = await fetch(apiURL + '/api/users/profile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export { create, signin, getProfile, updateProfile };