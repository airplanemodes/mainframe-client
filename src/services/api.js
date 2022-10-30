import axios from "axios";

export var serverAddress = 'http://localhost:4000';

export const getRequest = async(url) => {
    try {
        let response = await axios.get(url)
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log(error);
        return error;
    }
};