import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                'open-sans': ['open-sans', 'sans-serif'],
            },
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
            },
            gridColumnStart: {
                '13': '13',
                '14': '14',
                '15': '15',
                '16': '16',
                '17': '17',
            },
            gridColumnEnd: {
                '13': '13',
                '14': '14',
                '15': '15',
                '16': '16',
                '17': '17',
            },
        },
    },
    plugins: [],
};
export default config;
