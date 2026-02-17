import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#FAFAFA', // White/Light Gray
                foreground: '#1F2937', // Gray-900

                // Primary: Bright Violet for Light Mode
                primary: {
                    DEFAULT: '#8B5CF6', // Violet-500
                    foreground: '#FFFFFF',
                    50: '#F5F3FF',
                    100: '#EDE9FE',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                },

                // Secondary: Pink/Fuchsia
                secondary: {
                    DEFAULT: '#EC4899', // Pink-500
                    foreground: '#FFFFFF',
                    50: '#FDF2F8',
                },

                // Cards & Borders for Light Mode
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.7)',
                    hover: 'rgba(255, 255, 255, 0.9)'
                },
                border: 'rgba(139, 92, 246, 0.1)', // Subtle Violet Border
            },
            fontFamily: {
                sans: ['Outfit', 'Pretendard Variable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            animation: {
                orb: 'float-orb 20s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                'float-orb': {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(10px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
