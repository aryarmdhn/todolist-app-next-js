'use client';

import { useActionState } from "react";
import { remove } from "@/app/action";
import { useState } from "react";

export default function ButtonDelete({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const deleteWithId = remove.bind(null, null, id);
    const [, actionDelete, isPending] = useActionState(deleteWithId, null);

    const handleDelete = () => {
        setIsOpen(true);
    };

    return (
        <>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
                Delete
            </button>

            {/* Confirmation Modal */}
            <div
                className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            >
                <div
                    className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-sm transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                        }`}
                    onClick={e => e.stopPropagation()}
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h2>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete this todo?</p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Cancel
                        </button>

                        <form action={actionDelete}>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}