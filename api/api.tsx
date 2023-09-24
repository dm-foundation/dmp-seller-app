import axios from 'axios';
axios.defaults.withCredentials = true;

function host() {
    return process.env.API_URL ?? "https://d3k2555wexgp0x.cloudfront.net:3000/api";
}

export async function get(resource_url: string) {
    try {
        const API_URL = host();
        const response = await axios.get(`${API_URL}${resource_url}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function post(resource_url: string, data: any) {
    try {
        const API_URL = host();
        const response = await axios.post(`${API_URL}${resource_url}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
