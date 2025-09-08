import React, { useState, useEffect } from 'react';
import { getAllCountries } from '../api/countries';

// Gotta admit, defining Country type was really difficult ))
interface Country {
    name: {
        common: string;
        official: string;
        nativeName: { [key: string]: { official: string; common: string } };
    };
    region: string;
    capital: string[];
    currencies: { [key: string]: { name: string; symbol: string } };
    languages: { [key: string]: string };
}

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await getAllCountries();
            console.log(response, 'response');
            setCountries(response);
        };
        fetchCountries();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <table className="overflow-x-auto w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">
                            Region
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Country
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Capital
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Currency
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Language
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {countries.map((country) => (
                        <tr key={country.capital[0]}>
                            <td className="border border-gray-300 px-4 py-2">
                                {country.region}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {country.name.common}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {country.capital[0]}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {Object.values(country.currencies)[0]?.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {Object.values(country.languages)[0]}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Countries;
