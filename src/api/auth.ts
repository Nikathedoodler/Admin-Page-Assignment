import api from './index';

export const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
        email,
        password,
    });
    return response.data;
};

export const register = async (
    email: string,
    password: string,
    name: string
) => {
    const response = await api.post('/auth/register', {
        email,
        password,
        name,
    });
    return response.data;
};

export const logout = () => {
    sessionStorage.remove('jwt_token');
    sessionStorage.remove('user');
};
