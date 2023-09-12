import { axiosRequest, serverAddress } from "./api";

let user = {};

export const userdataUpdate = async() => {
    if (localStorage.localToken) {
        try {
            const url = serverAddress+"/users";
            let data = await axiosRequest(url, 'GET');
            if (data) user = data;
            else {
                localStorage.removeItem('localToken');
                user = {};
            }
            return user;
        } catch (error) {
            user = {};
            return user;
        }
    } else {
        localStorage.removeItem('localToken');
        user = {};
        return user;
    }
}

export const userdataReturn = () => {
    return user;
}