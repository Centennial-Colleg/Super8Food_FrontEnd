// The base URL of your backend (change this once you deploy to Render)
const baseURL = "https://superfood8.onrender.com/";

const create = async (meal) => {
    try {
        let response = await fetch(`${baseURL}/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meal)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
        return { success: false, message: err.message };
    }
};

const list = async () => {
    try {
        let response = await fetch(`${baseURL}/list`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (id, meal) => {
    try {
        let response = await fetch(`${baseURL}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meal)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const remove = async (id) => {
    try {
        let response = await fetch(`${baseURL}/delete/${id}`, {
            method: 'DELETE',
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const read = async (id) => {
    try {
        let response = await fetch(`${baseURL}/get/${id}`, {
            method: 'GET',
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};


export { create, list, update, remove, read };