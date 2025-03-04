import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>TAMUhack 2025</title>
            </Head>
            <Component {...pageProps} />
            <Analytics />
        </>
    );
}
