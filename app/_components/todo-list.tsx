"use client"

import Link from "next/link"
import ButtonDelete from "./button-delete"
import React from "react"
import { useRouter } from "next/navigation"

type Todo = {
    id: number,
    title: string,
    completed: boolean
}

export default function TodoList({ todo }: { todo: Todo }) {
    const router = useRouter();

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: e.target.checked
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }

            router.refresh();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <div className="w-full mb-3">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm border border-gray-100">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleChange}
                        className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-indigo-500 checked:border-indigo-500 cursor-pointer transition-colors"
                    />
                </div>

                <Link
                    href={`/todo/${todo.id}`}
                    className="flex-1 flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all duration-200 group"
                >
                    <div className="flex items-center gap-4">
                        <span className={`text-lg transition-colors ${todo.completed
                                ? 'text-gray-400 line-through'
                                : 'text-gray-700 group-hover:text-indigo-600'
                            }`}>
                            {todo.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${todo.completed
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {todo.completed ? 'Completed' : 'Pending'}
                        </span>
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </Link>

                <ButtonDelete id={todo.id} />
            </div>
        </div>
    )
}