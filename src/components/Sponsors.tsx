// components/Sponsors.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import localFont from 'next/font/local';

const swily = localFont({ src: '../pages/fonts/SwilyBright.otf' });

interface SponsorImage {
    src: string;
    name: string;
    href: string;
}

const imagesLg: SponsorImage[] = [
    {
        src: 'aa.svg',
        name: 'American Airlines',
        href: 'https://www.aa.com/homePage.do',
    },
];

const imagesMd: SponsorImage[] = [
    {
        src: 'phillips-66.png',
        name: 'Phillips 66',
        href: 'https://www.phillips66.com/',
    },
];

const imagesSm: SponsorImage[] = [
    {
        src: 'arize.svg',
        name: 'Arize AI',
        href: 'https://arize.com/',
    },
    {
        src: 'arm.svg',
        name: 'ARM',
        href: 'https://www.arm.com/',
    },
    {
        src: 'aws.svg',
        name: 'AWS',
        href: 'https://aws.amazon.com/',
    },
    {
        src: 'capitalone.svg',
        name: 'Capital One',
        href: 'https://www.capitalone.com/',
    },
    {
        src: 'cbre.svg',
        name: 'CBRE',
        href: 'https://www.cbre.com/',
    },
    {
        src: 'chevron.svg',
        name: 'Chevron',
        href: 'https://www.chevron.com/',
    },
    {
        src: 'gm.png',
        name: 'General Motors',
        href: 'https://www.gm.com/',
    },
    {
        src: 'pimco.png',
        name: 'PIMCO',
        href: 'https://www.pimco.com/',
    },
    {
        src: 'toyota.png',
        name: 'Toyota',
        href: 'https://www.toyota.com/',
    },
    {
        src: 'usaa.png',
        name: 'USAA',
        href: 'https://www.usaa.com/',
    },
];

const partners: SponsorImage[] = [
    {
        src: 'tamu.png',
        name: 'Texas A&M University',
        href: 'https://www.tamu.edu/',
    },
    {
        src: 'ieee.png',
        name: 'IEEE TAMU',
        href: 'https://ieee-tamu.org/',
    },
    {
        src: 'sec.png',
        name: "Texas A&M Student Engineers' Council",
        href: 'https://sec.tamu.edu/',
    },
];

const Sponsors: React.FC = () => {
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        setIsMediumScreen(mediaQuery.matches);

        const handleScreenChange = (e: MediaQueryListEvent) => {
            setIsMediumScreen(e.matches);
        };

        mediaQuery.addEventListener('change', handleScreenChange);

        return () => {
            mediaQuery.removeEventListener('change', handleScreenChange);
        };
    }, []);

    const getSpanSize = (index: number) => {
        const classes = [];
        if (isMediumScreen) {
            classes.push('col-span-4');
            if (imagesSm.length % 4 === 3 && index === imagesSm.length - 3)
                classes.push('col-start-3');
            else if (
                imagesSm.length % 4 === 1 &&
                index === imagesSm.length - 1
            ) {
                classes.push('col-start-7');
            } else if (
                imagesSm.length % 4 === 2 &&
                index === imagesSm.length - 2
            ) {
                classes.push('col-start-5');
            }
        } else {
            classes.push('col-span-2');
            if (imagesSm.length % 2 !== 0 && index === imagesSm.length - 1)
                classes.push('col-start-2');
        }
        return classes.join(' ');
    };

    const getWidth = (name: string) => {
        if (name === 'USAA') return 'w-1/3';
        if (name === 'AWS') return 'w-1/3';
        if (name === 'Chevron') return 'w-1/3';
        else return 'w-1/2';
    };

    return (
        <>
            <div className="flex w-full flex-col items-center justify-center py-16 text-center md:py-32">
                <h1
                    id="thank-you"
                    className={`text-dark ${swily.className} text-4xl leading-relaxed xxs:text-5xl xs:text-6xl sm:text-7xl xl:text-8xl`}
                >
                    Thank you to our sponsors...
                </h1>
            </div>
            <div className="grid w-full grid-cols-1 gap-y-16 pb-16 md:grid-cols-4 md:gap-16">
                {imagesLg.map((image, index) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 md:col-span-2 ${
                            imagesLg.length % 2 !== 0 &&
                            index === imagesLg.length - 1
                                ? 'md:col-start-2'
                                : ''
                        }`}
                    >
                        <Image
                            className="w-4/5"
                            src={`/sponsors/${image.src}`}
                            alt={`${image.name} homepage`}
                            width={500}
                            height={300}
                        />
                    </Link>
                ))}
                {imagesMd.map((image, index) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 md:col-span-2 ${
                            imagesMd.length % 2 !== 0 &&
                            index === imagesMd.length - 1
                                ? 'md:col-start-2'
                                : ''
                        }`}
                    >
                        <Image
                            className={
                                image.name === 'Phillips 66'
                                    ? 'w-[30%] sm:w-1/4'
                                    : 'w-2/3'
                            }
                            src={`/sponsors/${image.src}`}
                            alt={`${image.name} homepage`}
                            width={500}
                            height={300}
                        />
                    </Link>
                ))}
            </div>
            <div className="grid w-full max-w-full grid-cols-4 gap-y-16 md:grid-cols-16">
                {imagesSm.map((image, index) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`${getSpanSize(index)} flex min-w-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0`}
                    >
                        <Image
                            className={`${getWidth(image.name)}`}
                            src={`/sponsors/${image.src}`}
                            alt={`${image.name} homepage`}
                            width={500}
                            height={300}
                        />
                    </Link>
                ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center py-16 text-center md:py-32">
                <h1
                    id="thank-you"
                    className={`text-dark ${swily.className} text-3xl leading-relaxed sm:text-4xl lg:text-6xl`}
                >
                    and partners...
                </h1>
            </div>
            <div className="mb-24 grid w-full grid-cols-1 gap-16 md:grid-cols-3">
                {partners.map((image) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="col-span-1 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
                    >
                        <Image
                            className={
                                image.name === 'IEEE TAMU'
                                    ? 'w-3/5 md:w-full'
                                    : 'w-1/3 md:w-3/5'
                            }
                            src={`/sponsors/${image.src}`}
                            alt={`${image.name} homepage`}
                            width={500}
                            height={300}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sponsors;
