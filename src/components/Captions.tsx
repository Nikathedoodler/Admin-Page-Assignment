import React from 'react';
import { useState } from 'react';
import { addWord, getAllWords, editWord, deleteWord } from '../api/captions';

export const Captions = () => {
    const [key, setKey] = useState('');
    const [property, setProperty] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!key || !property) {
            setError('fill all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await addWord(key, property);
            console.log(response, 'response');

            // Clear form after success
            setKey('');
            setProperty('');
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
                    placeholder="key"
                    className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                    value={key}
                    onChange={(e) => {
                        setKey(e.target.value);
                    }}
                />
                <input
                    placeholder="property"
                    className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                    value={property}
                    onChange={(e) => {
                        setProperty(e.target.value);
                    }}
                />
                <button
                    type="submit"
                    disabled={!key || !property}
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
        </div>
    );
};
