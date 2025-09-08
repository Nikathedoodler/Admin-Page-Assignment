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
    independent: boolean;
    languages: { [key: string]: string };
}

const Countries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [independetCountries, setIndependetCountries] = useState<Country[]>(
        []
    );

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredCountries = isCheckboxChecked
        ? independetCountries
        : countries;
    const currentCountries = filteredCountries.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await getAllCountries();
            console.log(response, 'response');
            setCountries(response);
            setTotalItems(response.length);
        };
        fetchCountries();
    }, []);

    const handleCheckboxClick = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (isCheckboxChecked) {
            const independentCountries = countries.filter(
                (country) => country.independent === true
            );
            setIndependetCountries(independentCountries);
            setTotalItems(independentCountries.length);
        } else {
            setTotalItems(countries.length);
        }
    }, [isCheckboxChecked, countries]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex gap-12 mb-2">
                <div className="flex align-center justify-center gap-2 py-2 font-semibold">
                    <input
                        type="checkbox"
                        checked={isCheckboxChecked}
                        onChange={handleCheckboxClick}
                    />
                    <label className="m-auto">Independet</label>
                </div>
                <div className="flex align-center justify-center gap-4 py-2 font-semibold">
                    <label className="m-auto">Currency</label>
                    <select className="border border-2 px-2 py-1">
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </div>
            </div>
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
