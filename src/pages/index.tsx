import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import Link from 'next/link';
import localFont from 'next/font/local';
import HomeGraphic from '@/components/HomeGraphic';
import Image from 'next/image';
import SmallBubble from '../../public/small_bubble.png';
import MediumBubble from '../../public/med_bubble.png';
import FAQ from '@/components/faq/Faq';
import Info from '@/components/info/Info';

const belgiano = localFont({ src: '/fonts/Belgiano.woff' });
const kis = localFont({ src: '/fonts/adobe-kis-vf-default-roman.ttf' });

export default function Home() {
    return (
        <>
            <div className="mx-auto max-w-[2000px] px-8 lg:px-16">
                <Header />
            </div>
            <main>
                <div className="mx-auto max-w-[2000px] px-8 lg:px-16">
                    <div className="relative mx-auto grid max-w-screen-xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
                        <div className="flex flex-col justify-between">
                            <div className="relative">
                                <Image
                                    src={SmallBubble}
                                    alt=""
                                    width={32}
                                    height={32}
                                    className="absolute -left-16 -top-12 hidden lg:block"
                                />
                                <Image
                                    src={MediumBubble}
                                    alt=""
                                    width={48}
                                    height={48}
                                    className="absolute -top-20 hidden lg:block"
                                />
                                <h1
                                    className={`text-center lg:text-left ${belgiano.className}`}
                                    style={{
                                        fontSize:
                                            'clamp(3rem, 5.543vw + 1.566rem, 7rem)',
                                        lineHeight: '0.9',
                                    }}
                                >
                                    TAMUHACK
                                </h1>
                                <h2
                                    className={`text-center text-xl lg:text-left lg:text-3xl ${kis.className} text-balance`}
                                >
                                    January 25-26, 2025 @ MSC 2300
                                </h2>
                                <div className="mx-auto mt-6 flex items-start justify-center gap-4 font-poppins lg:hidden">
                                    <Link
                                        href="https://register.tamuhack.com/"
                                        className="rounded-lg border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                                    >
                                        Apply
                                    </Link>
                                    <Link
                                        href="https://tamuhack.org/mentor"
                                        target="_blank"
                                        className="`hover:bg-black` `hover:text-white` rounded-lg border border-black px-6 py-2 text-black transition"
                                    >
                                        Mentor
                                    </Link>
                                </div>
                                <div className="mt-6 hidden font-poppins text-sm lg:block">
                                    <span className="rounded-full border border-black bg-white px-3 py-1 transition-colors hover:bg-[#b1dcfb]">
                                        24 Hours
                                    </span>
                                    <span className="ml-4 rounded-full border border-black bg-white px-3 py-1 transition-colors hover:bg-[#e3b8dd]">
                                        Hardware &amp; Software
                                    </span>
                                </div>
                            </div>
                            <Timer className="self-end" />
                        </div>
                        <HomeGraphic />
                    </div>
                </div>
                {/* Gradient section */}
                <div className="bg-gradient-to-b from-[#ffff] to-[#8CCBF8]">
                    <div className="mx-auto max-w-[2000px] px-8 lg:px-16">
                        <Info />
                    </div>
                </div>
                {/* Blue section */}
                <div className="bg-[#8CCBF8]">{/* <FAQ /> */}</div>
            </main>
            <TamuhackFooter />
        </>
    );
}
