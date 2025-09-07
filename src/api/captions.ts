// In src/api/captions.ts
import api from './index';

export const addWord = async (national: string, foreign: string) => {
    const response = await api.post('/Api/Client/AddWord', {
        national,
        foreign,
    });
    return response.data;
};

export const getAllWords = async () => {
    const response = await api.get('/Api/Client/GetAllWords');
    return response.data;
};

export const editWord = async (
    national: string,
    foreign: string,
    id: string
) => {
    const response = await api.put(`/Api/Client/EditWord/${id}`, {
        national,
        foreign,
    });
    return response.data;
};

export const deleteWord = async (id: string) => {
    const response = await api.delete(`/Api/Client/DeleteWord/${id}`);
    return response.data;
};
