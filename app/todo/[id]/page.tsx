"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonDelete from "@/app/_components/button-delete";


type Todo = {
    id: number;
    title: string;
    completed: boolean;
    createdAt?: string;
};

export default function Post() {
    const { id } = useParams();
    const router = useRouter();
    const [todo, setTodo] = useState<Todo>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API}/${id}`)
            .then(res => res.json())
            .then(data => {
                setTodo(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching todo:', error);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to List
                </button>

                {/* Todo Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Todo Details
                            </h1>
                            <span
                                className={`px-3 py-1 text-sm font-medium rounded-full ${todo?.completed
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {todo?.completed ? "Completed" : "Pending"}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Title
                                </h3>
                                <p className="mt-1 text-lg text-gray-900">
                                    {todo?.title}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Status
                                </h3>
                                <div className="mt-1 flex items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full mr-2 ${todo?.completed
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                            }`}
                                    ></div>
                                    <p className="text-gray-900">
                                        {todo?.completed
                                            ? "Task completed"
                                            : "Task in progress"}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Task ID
                                </h3>
                                <p className="mt-1 text-gray-900">#{todo?.id}</p>
                            </div>

                            {todo?.createdAt && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Created At
                                    </h3>
                                    <p className="mt-1 text-gray-900">
                                        {new Date(todo.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                        {/* <button
                            onClick={() => router.push(`/todo/${id}/edit`)}
                            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            Edit Todo
                        </button> */}
                        {/* <ButtonDelete id={todo?.id} /> */}
                        
                        
                    </div>
                </div>
            </div>
        </main>
    );
}