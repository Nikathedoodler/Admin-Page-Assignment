import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { addWord, getAllWords, editWord, deleteWord } from '../api/captions';

interface Caption {
    _id?: string;
    id?: string;
    national: string;
    foreign: string;
    inSentences: any[];
    isFavorite: boolean;
}

export const Captions = () => {
    const [national, setNational] = useState('');
    const [foreign, setForeign] = useState('');
    const [captions, setCaptions] = useState<Caption[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!national || !foreign) {
            setError('fill all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await addWord(national, foreign);
            console.log('Full response:', response);

            if (response?.words) setCaptions(response.words);

            // Clear form after success
            setNational('');
            setForeign('');
            setError('');
        } catch (err) {
            setError('Failed to Add');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 justify-center w-full sm:w-3/4 lg:w-1/2 px-10">
            <div className="flex gap-6 w-full">
                <input
                    placeholder="national"
                    className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                    value={national}
                    onChange={(e) => {
                        setNational(e.target.value);
                    }}
                />
                <input
                    placeholder="foreign"
                    className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                    value={foreign}
                    onChange={(e) => {
                        setForeign(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    disabled={!national || !foreign}
                    onClick={handleSubmit}
                    className="bg-black text-white w-1/4 py-2 px-4 border rounded-lg shadow shadow-xl"
                >
                    Submit
                </button>
            </div>
            {error && (
                <div className="text-red-500 text-sm text-center w-1/5">
                    {error}
                </div>
            )}
            <table>
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">
                            National
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Foreign
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {captions.map((caption) => (
                        <tr key={caption._id || caption.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {caption.foreign}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {caption.national}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
