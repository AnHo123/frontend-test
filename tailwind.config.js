/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#333333',
                secondary: '#666666',
                highlight: '#fbbf24',
                background: '#f0f0f0',
            },
            fontFamily: {
                monserrat: ['Montserrat', 'sans-serif'],
            },
            fontSize: {
                'h-1': '2rem',
                'h-2': '1.75rem',
                'sub-1': '1.5rem',
                'sub-2': '1.25rem',
                'body-1': '1rem',
                'body-2': '0.875rem',
            },
        },
    },
    plugins: [],
}
