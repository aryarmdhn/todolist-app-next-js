import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="max-w-xl w-full text-center">
                {/* Error Code */}
                <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
                    404
                </h1>
                
                {/* Error Message */}
                <div className="bg-indigo-500 text-white px-4 py-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                
                {/* Description */}
                <p className="mt-8 mb-8 text-gray-600">
                    Tidak ada halaman yang cocok.
                </p>
                
                {/* Back to Home Button */}
                <Link 
                    href="/"
                    className="inline-flex items-center px-6 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300 gap-2"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </main>
    );
}