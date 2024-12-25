import {get, zzkxPost} from "@/utils/request";
import {hellologin} from "@/utils/baseUrl";

export const test = () => {
    return get(`${hellologin}/`);
};

export const login = (data) => {
    return zzkxPost(`${hellologin}/login`,data);
};