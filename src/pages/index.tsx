import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local'
import HomeImage from '@/../public/home_image.png';

const belgiano = localFont({src: '/fonts/Belgiano.ttf'});

export default function Home() {
    return (
        <div className="mx-auto max-w-[2000px] px-8">
            <Header />
            <main className="mt-12 min-h-screen lg:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h1
                                className={`text-center lg:text-left  + ${belgiano.className}`}
                                style={{
                                    fontSize:
                                        'clamp(3rem, 5.543vw + 1.566rem, 6rem)',
                                    lineHeight: '0.9',
                                }}
                            >
                                TAMUHACK
                            </h1>
                            <h2 className={`text-center text-xl lg:text-left lg:text-3xl ${belgiano.className}`}>
                                January 25-26, 2025 @ MSC 2300
                            </h2>
                            <div className="mx-auto mt-6 flex items-start justify-center gap-4 lg:hidden">
                                <Link
                                    href="https://register.tamuhack.com/"
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
                        </div>
                        <Timer className='self-end'/>
                    </div>
                    <Image
                        src={HomeImage}
                        alt="Reflection of College Station in a puddle"
                        width={800}
                        height={600}
                        placeholder="empty"
                        className='mx-auto lg:mx-0'
                    />
                </div>
            </main>
            <TamuhackFooter />
        </div>
    );
}
