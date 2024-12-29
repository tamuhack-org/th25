// components/Sponsors.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface SponsorImage {
    src: string;
    name: string;
    href: string;
}

const imagesLg: SponsorImage[] = [
    {
        src: 'aa.png',
        name: 'American Airlines',
        href: 'https://www.aa.com/homePage.do',
    },
    {
        src: 'sandia.png',
        name: 'Sandia National Laboratories',
        href: 'https://www.sandia.gov/',
    },
];

const imagesMd: SponsorImage[] = [
    {
        src: 'phillips-66.png',
        name: 'Phillips 66',
        href: 'https://www.phillips66.com/',
    },
    {
        src: 'ieee.png',
        name: 'IEEE TAMU',
        href: 'https://ieee-tamu.org/',
    },
];

const imagesSm: SponsorImage[] = [
    {
        src: 'l3harris.png',
        name: 'L3Harris',
        href: 'https://www.l3harris.com/',
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
        src: 'usaa.png',
        name: 'USAA',
        href: 'https://www.usaa.com/',
    },
    {
        src: 'baker-hughes.png',
        name: 'Baker Hughes',
        href: 'https://www.bakerhughes.com/',
    },
    {
        src: 'jpmorgan.png',
        name: 'JPMorgan Chase & Co.',
        href: 'https://www.jpmorganchase.com/',
    },
    {
        src: 'frogslayer.png',
        name: 'FrogSlayer',
        href: 'https://frogslayer.com/',
    },
    {
        src: 'texas-instruments.png',
        name: 'Texas Instruments',
        href: 'https://www.ti.com/',
    },
];

const partners: SponsorImage[] = [
    {
        src: 'sec.png',
        name: "Texas A&M Student Engineers' Council",
        href: 'https://sec.tamu.edu/',
    },
    {
        src: 'tamu.png',
        name: 'Texas A&M University',
        href: 'https://www.tamu.edu/',
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
        if (name === 'USAA') return 'w-1/2 sm:w-1/3';
        else return 'w-4/5 sm:w-3/4';
    };

    return (
        <>
            <div className="flex w-full flex-col items-center justify-center py-16 text-center md:py-32">
                <h1
                    id="thank-you"
                    className="text-dark font-serif text-3xl leading-relaxed sm:text-4xl lg:text-6xl"
                >
                    Thank you to our sponsors...
                </h1>
            </div>
            <div className="grid w-full grid-cols-2 gap-16 pb-16 md:grid-cols-4">
                {imagesLg.map((image, index) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`col-span-2 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 ${
                            imagesLg.length % 2 !== 0 &&
                            index === imagesLg.length - 1
                                ? 'col-start-2'
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
                        className={`col-span-2 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 ${
                            imagesMd.length % 2 !== 0 &&
                            index === imagesMd.length - 1
                                ? 'col-start-2'
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
            <div className="grid w-full grid-cols-4 gap-16 md:grid-cols-16">
                {imagesSm.map((image, index) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={`${getSpanSize(index)} flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0`}
                    >
                        <Image
                            className={getWidth(image.name)}
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
                    className="text-dark font-serif text-3xl leading-relaxed sm:text-4xl lg:text-6xl"
                >
                    and partners...
                </h1>
            </div>
            <div className="mb-24 grid w-full grid-cols-1 gap-16 md:grid-cols-2">
                {partners.map((image) => (
                    <Link
                        key={image.name}
                        href={image.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="col-span-1 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
                    >
                        <Image
                            className="w-1/2 md:w-1/3"
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
