'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed w-full top-0 z-50">
            <nav className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-2xl font-bold text-gray-800">
                                    Logo
                                </Link>
                            </div>

                            {/* Menu items */}
                            <div className="hidden md:ml-6 md:flex md:space-x-8">
                                <Link
                                    href="/"
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition duration-300 ${pathname === '/'
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-900 hover:border-indigo-500 hover:text-indigo-500'
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition duration-300 ${pathname === '/about'
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-900 hover:border-indigo-500 hover:text-indigo-500'
                                        }`}
                                >
                                    About
                                </Link>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className={`block pl-3 pr-4 py-2 text-base font-medium ${pathname === '/'
                                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`block pl-3 pr-4 py-2 text-base font-medium ${pathname === '/about'
                                    ? 'bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            About
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}