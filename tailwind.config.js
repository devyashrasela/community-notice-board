/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('tailwind-scrollbar-hide'),
    ],
}
