import React, { useState, useEffect } from 'react';
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
    const [fetchLoading, setFetchLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        const fetchCaptions = async () => {
            setFetchLoading(true); // Set loading for fetch
            try {
                const response = await getAllWords();
                if (response.words) setCaptions(response.words);
            } catch (err) {
                setError('Failed to fetch captions');
            } finally {
                setFetchLoading(false);
            }
        };
        fetchCaptions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitLoading(true);
        setError('');

        try {
            const response = await addWord(national, foreign);
            console.log('Full response:', response);

            if (response?.words) setCaptions(response.words);

            setNational('');
            setForeign('');
            setError('');
        } catch (err) {
            setError('Failed to Add');
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-4 w-full mb-6">
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
                        disabled={!national || !foreign || submitLoading}
                        onClick={handleSubmit}
                        className="bg-black text-white w-1/4 py-2 px-4 border rounded-lg shadow shadow-xl"
                    >
                        {submitLoading ? 'Adding...' : 'Submit'}
                    </button>
                </div>
                {error && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full">
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
                            {fetchLoading ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="border border-gray-300 px-4 py-8 text-center"
                                    >
                                        Loading captions...
                                    </td>
                                </tr>
                            ) : (
                                captions.map((caption) => (
                                    <tr key={caption._id}>
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
