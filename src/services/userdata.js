import { axiosRequest, host } from "./api";

let user = {};

export const userdataUpdate = async() => {
    if (localStorage.token) {
        try {
            const url = host+"/users";
            let data = await axiosRequest(url, "GET");
            if (data) user = data;
            else {
                localStorage.removeItem("token");
                user = {};
            }
            return user;
        } catch (error) {
            user = {};
            return user;
        }
    } else {
        localStorage.removeItem("token");
        user = {};
        return user;
    }
}

export const userdataReturn = () => {
    return user;
}
