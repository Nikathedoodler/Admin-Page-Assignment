import axios from 'axios';

const countriesApi = axios.create({
    baseURL: 'https://restcountries.com',
    timeout: 10000,
});

export const getAllCountries = async () => {
    const response = await countriesApi.get(
        '/v3.1/all?fields=region,name,capital,currencies,languages'
    );
    return response.data;
};
