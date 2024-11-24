/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: "#000853",
                },
                purple: {
                    600: "#761BE4",
                },
                error: "#ED4545",
                disabled: "#898DA9",
                form: "#F0EAF8",
                tooltip: "#FAF9FA",
                borderDefault: "#CBB6E5",
            },
        },
    },
    plugins: [],
};
