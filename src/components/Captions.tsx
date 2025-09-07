import React, { useState, useEffect } from 'react';
import { addWord, getAllWords, editWord, deleteWord } from '../api/captions';
import { Modal } from './Modal';

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
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Edit modal states
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingCaption, setEditingCaption] = useState<Caption | null>(null);
    const [editNational, setEditNational] = useState('');
    const [editForeign, setEditForeign] = useState('');
    const [editError, setEditError] = useState('');
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        const fetchCaptions = async () => {
            setFetchLoading(true);
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

            if (response.words) setCaptions(response.words);

            setNational('');
            setForeign('');
            setError('');
        } catch (err) {
            setError('Failed to Add');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;

        setDeletingId(id);
        setError('');

        const deletingItem = captions.filter((caption) => id === caption._id);
        console.log(deletingItem, 'deletingItem');

        try {
            const response = await deleteWord(id);
            if (response.words) setCaptions(response.words);
        } catch (err) {
            setError('Failed to Delete');
        } finally {
            setDeletingId(null);
        }
    };

    // Edit modal handlers
    const handleEditClick = (caption: Caption) => {
        setEditingCaption(caption);
        setEditNational(caption.national);
        setEditForeign(caption.foreign);
        setEditError('');
        setEditModalOpen(true);
    };

    const handleEditSave = async () => {
        if (!editingCaption?._id) return;

        if (!editNational || !editForeign) {
            setEditError('Fill all fields');
            return;
        }

        setEditLoading(true);

        try {
            const response = await editWord(
                editNational,
                editForeign,
                editingCaption._id
            );
            if (response.words) setCaptions(response.words);
            setEditModalOpen(false);
            setEditingCaption(null);
        } catch (err) {
            setError('Failed to update caption');
        } finally {
            setEditLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex gap-4 w-full mb-6">
                    <input
                        placeholder="Foreign"
                        className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                        value={foreign}
                        onChange={(e) => {
                            setForeign(e.target.value);
                        }}
                    />
                    <input
                        placeholder="National"
                        className="w-full px-4 py-2 border rounded-lg outline-4 outline-offset-2 shadow shadow-xs"
                        value={national}
                        onChange={(e) => {
                            setNational(e.target.value);
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
                                    foreign
                                </th>
                                <th className="border border-gray-300 px-4 py-2">
                                    National
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
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={() =>
                                                    handleEditClick(caption)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                disabled={
                                                    deletingId === caption._id
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        caption._id || ''
                                                    )
                                                }
                                            >
                                                {deletingId === caption._id
                                                    ? 'Deleting...'
                                                    : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setEditingCaption(null);
                }}
                title="Edit Caption"
            >
                <div className="space-y-4">
                    {editError && (
                        <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                            {editError}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Foreign
                        </label>
                        <input
                            type="text"
                            value={editForeign}
                            onChange={(e) => setEditForeign(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            National
                        </label>
                        <input
                            type="text"
                            value={editNational}
                            onChange={(e) => setEditNational(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={() => {
                                setEditModalOpen(false);
                                setEditingCaption(null);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEditSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
