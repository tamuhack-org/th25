import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import FAQ from '@/components/faq/Faq';

export default function Home() {
    return (
        <div className="px-8 max-w-[2000px] mx-auto">
            <Header />
            <main className="mt-24 min-h-screen">
                <h1 className="font-serif text-8xl">TAMUHACK</h1>
                <h2 className="font-serif text-3xl">
                    January 25-26, 2025 @ MSC 2300
                </h2>
                <div className="mt-6">
                    <span className="rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#b1dcfb]">
                        24 Hours
                    </span>
                    <span className="ml-4 rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#e3b8dd]">
                        Hardware &amp; Software
                    </span>
                </div>
                
                <Timer />
                <FAQ />
            </main>
            <TamuhackFooter />
        </div>
    );
}
