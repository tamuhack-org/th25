import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import Image from 'next/image';
import Link from 'next/link';
import HomeImage from '@/../public/home_image.png';

export default function Home() {
    return (
        <div className="mx-auto max-w-[2000px] px-8">
            <Header />
            <main className="mt-12 min-h-screen lg:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h1 className="text-center font-serif text-5xl lg:text-left lg:text-8xl">
                            TAMUHACK
                        </h1>
                        <h2 className="text-center font-serif text-xl lg:text-left lg:text-3xl">
                            January 25-26, 2025 @ MSC 2300
                        </h2>
                        <div className="mt-6 flex justify-center items-start mx-auto lg:hidden gap-4">
                            <Link
                                href="#"
                                className="rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                            >
                                Apply
                            </Link>
                            <Link
                                href="#"
                                className="rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                            >
                                Mentor
                            </Link>
                        </div>
                        <div className="mt-6 hidden text-sm lg:block">
                            <span className="rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#b1dcfb]">
                                24 Hours
                            </span>
                            <span className="ml-4 rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#e3b8dd]">
                                Hardware &amp; Software
                            </span>
                        </div>
                        <Timer />
                    </div>
                    <Image
                        src={HomeImage}
                        alt="Reflection of College Station in a puddle"
                        width={800}
                        height={600}
                        placeholder="empty"
                    />
                </div>
            </main>
            <TamuhackFooter />
        </div>
    );
}
