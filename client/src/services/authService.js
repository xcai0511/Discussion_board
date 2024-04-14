import { REACT_APP_API_URL, api } from "./config";
import {useState} from "react";

const AUTH_API_URL = `${REACT_APP_API_URL}/auth`;

const login = async(email, password, csrfToken) => {
    const data = {email, password};
    const res = await api.post(`${AUTH_API_URL}/login`, data, {
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
    });
    return res.data;
}

const logout = async (csrfToken) => {
    const res = await api.post(`${AUTH_API_URL}/logout`, {}, {
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
    });
    return res.data;
}

const fetchCsrfToken = async () => {
    return api.get(`${AUTH_API_URL}/csrf-token`, { withCredentials: true });
};

export { login, logout, fetchCsrfToken };