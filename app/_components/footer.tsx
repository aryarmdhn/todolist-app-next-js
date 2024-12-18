export default function Footer() {
    return (
        <footer className="flex items-center justify-center gap-4 py-4 px-8 text-sm text-gray-500 bg-white border-t border-gray-200">
            <a
                href="https://github.com/laravel-frontend-presets/tailwindcss-react"
                className="hover:underline"
            >
                Tailwind CSS React
            </a>{" "}
            by{" "}
            <a
                href="https://twitter.com/tailwindcss"
                className="hover:underline"
            >
                Tailwind CSS
            </a>
        </footer>
    );
}