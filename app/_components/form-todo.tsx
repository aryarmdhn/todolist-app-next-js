"use client"

import { useActionState } from 'react';
import { useState } from 'react';
import { create } from "@/app/action"

export default function Form() {
    const [isOpen, setIsOpen] = useState(false);
    const [state, actionForm, isPending] = useActionState(create, null);

    // Tutup modal jika sukses
    if (state?.message === 'Success' && isOpen) {
        setIsOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Add New Todo
            </button>

            <div
                className={`fixed inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            >
                <div
                    className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 ${
                        isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Add New Todo</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            type="button"
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form action={actionForm} className="space-y-4">
                        {state?.message && (
                            <div className={`p-3 text-sm rounded-lg ${
                                state.message === 'Success' 
                                    ? 'bg-green-50 text-green-700'
                                    : 'bg-red-50 text-red-700'
                            }`}>
                                {state.message}
                            </div>
                        )}

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Todo Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                placeholder="Enter your todo..."
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isPending}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add Todo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}