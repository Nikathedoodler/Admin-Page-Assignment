import api from './index';

export const login = async (username: string, password: string) => {
    const response = await api.post('/Api/Client/Login', {
        username,
        password,
    });
    return response.data;
};

export const register = async (
    username: string,
    password: string,
    confirm_password: string
) => {
    const response = await api.post('/Api/Client/Register', {
        username,
        password,
        confirm_password,
    });
    return response.data;
};

export const logout = () => {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user');
};
