import TodoList from "./_components/todo-list"
import Form from "./_components/form-todo"

export default async function Home() {
    type Todo = {
        id: number,
        title: string,
        completed: boolean
    }
    
    const rest = await fetch(process.env.NEXT_PUBLIC_API as string, {
        next:{
            tags: ["todo"]
        }
    })
    const data: Todo[] = await rest.json()
 
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                        My Todo List
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Keep track of your tasks and stay organized with our simple todo manager
                    </p>
                </div>

                {/* Main Content Container */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
                    {/* Add Todo Button */}
                    <div className="flex justify-between items-center">
                        <Form />

                        {/* Progress Summary - Moved to top right */}
                        {data && data.length > 0 && (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <h2 className="text-sm font-semibold text-gray-900">Progress</h2>
                                    <p className="text-sm text-gray-600">
                                        {data.filter(todo => todo.completed).length} of {data.length} tasks
                                    </p>
                                </div>
                                <div className="w-40 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                                        style={{ 
                                            width: `${(data.filter(todo => todo.completed).length / data.length) * 100}%` 
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
 
                    {/* Todo List Section */}
                    <div className="mt-6">
                        {data && data.length > 0 ? (
                            <div className="space-y-2">
                                {data.map(todo => (
                                    <div key={todo.id}>
                                        <TodoList todo={todo} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-4">
                                    <svg 
                                        className="w-10 h-10 text-indigo-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth="2" 
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No todos yet</h3>
                                <p className="text-gray-600">Start adding some tasks to get organized</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
 }