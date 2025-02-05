import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
/* import Link from 'next/link'; */
import localFont from 'next/font/local';
import HomeGraphic from '@/components/HomeGraphic';
import Image from 'next/image';
import SmallBubble from '../../public/small_bubble.png';
import MediumBubble from '../../public/med_bubble.png';
import FAQ from '@/components/faq/Faq';
import Info from '@/components/info/Info';
import Schedule from '@/components/Schedule';
import Navbar from '@/components/navbar/Navbar';
import PrizesScroller from '@/components/prizes/PrizesScroller';
import Sponsors from '@/components/Sponsors';
import { motion } from "motion/react";

const belgiano = localFont({ src: '/fonts/Belgiano.woff' });

export default function Home() {
    return (
        <>
            {/*
            <Link
                className="flex h-12 items-center justify-center bg-pink-300 px-8 py-2 text-center font-poppins text-sm font-bold text-white md:text-base lg:px-16"
                href="/hardware_starter_guide.png"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p className="uppercase">
                    Hardware week is ongoing! View the starter guide here.
                </p>
            </Link>
            */}
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
                                    className="absolute -left-8 -top-12 hidden lg:block"
                                />
                                <Image
                                    src={MediumBubble}
                                    alt=""
                                    width={48}
                                    height={48}
                                    className="absolute -top-20 left-8 hidden lg:block"
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
                                    className={`text-balance text-center font-poppins text-xl lg:text-left lg:text-3xl`}
                                >
                                    January 25-26, 2025 @ MSC 2300
                                </h2>
                                <div className="mx-auto mt-4 flex items-start justify-center gap-4 font-poppins lg:hidden">
                                    {/*
                                    <Link
                                        href="https://register.tamuhack.com/"
                                        className="rounded-lg border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                                    >
                                        Apply
                                    </Link>
                                    */}
                                    <div className="rounded-lg border border-black px-6 py-2 text-black opacity-50">
                                        Apply
                                    </div>
                                    {/*
                                    <Link
                                        href="https://tamuhack.org/mentor"
                                        target="_blank"
                                        className="`hover:bg-black` `hover:text-white` rounded-lg border border-black px-6 py-2 text-black transition"
                                    >
                                        Mentor
                                    </Link>
                                    */}
                                    <div className="rounded-lg border border-black px-6 py-2 text-black opacity-50">
                                        Mentor
                                    </div>
                                </div>
                                <div className="mt-3 hidden font-poppins text-sm lg:block">
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
                    <motion.div 
                    initial={{ opacity: 0}}
                    whileInView={{
                        opacity: 1,
                        transition: { duration: 1, delay: 1 },
                    }}
                    viewport={{ once: true }}
                    className="fading_text flex flex-row mt-5 font-poppins text-xl justify-center">
                        <p>
                            Thanks for joining us!
                        </p>
                        <div className="vector flex flex-col ml-2 mt-[-8px]">
                            <Image
                                src="/vector1.svg"
                                alt="Vector 1"
                                width={176}
                                height={144}
                                className="w-[10px] rotate-[10deg]"
                            />
                            <Image
                                src="/vector1.svg"
                                alt="Vector 2"
                                width={176}
                                height={144}
                                className="w-[14px] rotate-[35deg] pl-1"
                            />
                        </div>
                    </motion.div>
                </div>
                <Navbar />
                {/* Gradient section */}
                <div className="mt-40 bg-gradient-to-b from-[#ffff] to-[#BFE4FF]">
                    <div className="mx-auto max-w-[2000px] px-8 lg:px-16">
                        <Info />
                    </div>
                </div>
                <div className="mx-auto max-w-[2000px] px-8 pb-32 pt-24 lg:px-16">
                    <Schedule />
                </div>
                <section id="prizes px-8 lg:px-16">
                    <PrizesScroller />
                </section>
                <div className="bg-[#192349]">
                    <div className="mx-auto max-w-[2000px] px-8 pb-8 lg:px-16">
                        <FAQ />
                    </div>
                </div>
                <div className="h-64 bg-[linear-gradient(180deg,_#192349_4.1%,_#2C355A_20.6%,_#535A88_36.03%,_#7980B7_54.46%,_#B3A8D3_68.1%,_#ECD1F0_82.6%,_#FFFFFF_100%)]"></div>
                <div className="mx-auto max-w-[2000px] px-8 pb-8 lg:px-16">
                    <Sponsors />
                </div>
            </main>
            <div className="mx-auto max-w-[2000px] px-8 pt-16 lg:px-16">
                <TamuhackFooter />
            </div>
            <style jsx>{`
            
            
            `}</style>
        </>
    );
}
