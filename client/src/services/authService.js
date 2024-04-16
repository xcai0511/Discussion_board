import { REACT_APP_API_URL, api } from "./config";

const AUTH_API_URL = `${REACT_APP_API_URL}/auth`;

const login = async(email, password, csrfToken) => {
    const data = {email, password};
    const res = await api.post(`${AUTH_API_URL}/login`, data, {
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
    });
    console.log("enter login in authService ====", res.data);
    return res.data;
}

const logout = async (csrfToken) => {
    try {
        const response = await api.post(`${AUTH_API_URL}/logout`, {}, {
            headers: {
                'x-csrf-Token': csrfToken,
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
}

const checkLoginStatus = async (csrfToken) => {
    return api.get(`${AUTH_API_URL}/check-login`, {
        headers: {
            'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
    });
};


const fetchCsrfToken = async () => {
    const response = await api.get(`${REACT_APP_API_URL}/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
};

export { login, logout, checkLoginStatus, fetchCsrfToken };