import axios from 'axios';
axios.defaults.withCredentials = true;

function host() {
    return process.env.API_URL ?? "http://127.0.0.1:3000";
}

async function get(resource_url: string) {
    try {
        const API_URL = host();
        const response = await axios.get(`${API_URL}${resource_url}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default get;