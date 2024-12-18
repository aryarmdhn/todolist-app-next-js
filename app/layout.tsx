import Navbar from './_components/navbar';
import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'Todo List App',
}
export default function RootLayout({children}:Readonly <{children: React.ReactNode}>) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <Navbar />
                    <main  className="pt-14">
                    {children}
                    </main>
            </body>
        </html>
    );
}