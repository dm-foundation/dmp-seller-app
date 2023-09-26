import axios from 'axios';
axios.defaults.withCredentials = true;

function host() {
    console.log("process.env.NEXT_PUBLIC_API_URL: ", process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL ?? "http://192.168.0.7:3000/api";
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

export async function patch(resource_url: string, data: any) {
    try {
        const API_URL = host();
        const response = await axios.patch(`${API_URL}${resource_url}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}