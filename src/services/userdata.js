import { axiosRequest, serverAddress } from "./api";

var user = {};

export const userdataUpdate = async() => {
    try {
        let url = serverAddress+"/users";
        let data = await axiosRequest(url, 'GET');
        console.log(data);
    } catch (error) {
        user = {};
        return user;
    }
};

export const userdataReturn = () => {
    return user;
};