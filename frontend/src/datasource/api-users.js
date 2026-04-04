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

export { create, signin }