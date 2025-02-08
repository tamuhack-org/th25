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
            fontSize: {
                xxxs: ['0.7rem', { lineHeight: '1rem' }],
                xxs: ['0.625rem', { lineHeight: '1rem' }],
                '4.5xl': ['2.625rem', { lineHeight: '1' }],
                '5.5xl': ['3.25rem', { lineHeight: '1' }],
                '6.5xl': ['4.125rem', { lineHeight: '1' }],
                '7.5xl': ['5.25rem', { lineHeight: '1' }],
                '8.5xl': ['6.75rem', { lineHeight: '1' }],
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
            screens: {
                xxs: '375px',
                xs: '425px',
                xxl: '1200px',
                xxxl: '1400px',
                xxxxl: '1634px',
            },
        },
    },
    plugins: [],
};
export default config;
