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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [totalItems, setTotalItems] = useState(0);

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentCountries = countries.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await getAllCountries();
            console.log(response, 'response');
            setCountries(response);
            setTotalItems(response.length);
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
                    {currentCountries.map((country) => (
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
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    prev
                </button>
                <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    next
                </button>
            </div>
        </div>
    );
};

export default Countries;
