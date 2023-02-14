import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};
const prefix = `${import.meta.env.VITE_BASE_URL}`
const Api = {};

const allowedCodes = [401, 422];

Api.get = async (url, params = {}) => {
    try {
        const response = await axios.get(`${prefix}${url}`, {
            params: params
        })

        return response.data
    }
    catch (error) {
        // console.log(error);
        if (!error.response) {
            throw error;
        }
        if (allowedCodes.indexOf(error.response.status) == -1) {
            throw error;
        }
        return error.response.data;
    }
}

Api.post = async (url, body, headers = {}) => {
    try {
        const response = await axios.post(`${prefix}${url}`, body, {
            headers: { ...axios.defaults.headers, ...headers }
        })
        return response.data;
    }
    catch (error) {
        // console.log(error);
        if (!error.response) {
            throw error;
        }
        if (allowedCodes.indexOf(error.response.status) == -1) {
            throw error;
        }

        return error.response.data;
    }
}

Api.delete = async (url, body = {}, headers = {}) => {
    if (body instanceof FormData) {
        body.append('_method', 'delete')
    }
    else {
        body['_method'] = 'delete';

    }
    return Api.post(url, body, headers);
}

Api.put = async (url, body = {}, headers = {}) => {
    if (body instanceof FormData) {
        body.append('_method', 'put')
    }
    else {
        body['_method'] = 'put';

    }

    return Api.post(url, body, headers);
}






export default Api;