import axios from 'axios';

export const api_url = 'http://localhost:3500';

export const api_get = async(url) => {
    try {
        let responseData = await axios.get(url);
        console.log(responseData);
        return responseData.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const api_method = async(url, method, dataBody) => {
    try {
        let responseData = await axios({
            method: method,
            url: url,
            data: dataBody,
            headers: {
                'content-type': 'application/json',
                'x-auth-token': localStorage['tok']
            }
        })
        return responseData.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}