import axios from 'axios';
axios.defaults.withCredentials = true;

function apiURL() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL ?? "https://d2v76rwlkzvt6c.cloudfront.net/api"
    console.log("apiURL: ", apiURL);
    return apiURL;
}

export async function get(resource_url: string) {
    try {
        const response = await axios.get(`${apiURL()}${resource_url}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function post(resource_url: string, data: any) {
    try {
        const response = await axios.post(`${apiURL()}${resource_url}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function put(resource_url: string, data: any) {
    try {
        const response = await axios.put(`${apiURL()}${resource_url}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}