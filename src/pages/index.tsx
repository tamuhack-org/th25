import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';

export default function Home() {
    return (
        <div className="bg-sky-blue px-8">
            <Header />
            <main className="mt-24 min-h-screen">
                <h1>TAMUhack 2025</h1>
            </main>
            <TamuhackFooter />
        </div>
    );
}
