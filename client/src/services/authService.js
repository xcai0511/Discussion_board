import { REACT_APP_API_URL, api } from "./config";

const AUTH_API_URL = `${REACT_APP_API_URL}/auth`;

const login = async(email, password, csrfToken) => {
    const data = {email, password};
    const res = await api.post(`${AUTH_API_URL}/login`, data, {
        headers: {
            'x-csrf-token': csrfToken,
        },
        withCredentials: true,
    });
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

const fetchCsrfToken = async () => {
    const response = await api.get(`${AUTH_API_URL}/csrf-token`, { withCredentials: true });
    return response.data.csrfToken;
};

export { login, logout, fetchCsrfToken };