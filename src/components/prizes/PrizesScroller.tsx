import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import Image from 'next/image';
import bigChallenges from '../../../public/prizes_text_1.svg';
import biggerPrizes from '../../../public/prizes_text_2.svg';
import Prizes from './Prizes';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import useMedia from '@/hooks/useMedia';

gsap.registerPlugin(ScrollTrigger); // Removed useGSAP from registration

//Need it for framer motion typing
type Offsets = ['start center', 'end end'] | ['center end', 'end center'];

const PrizesScroller = () => {
    const isDesktop = useMedia('(min-width: 800px)', true);
    const container = useRef(null);
    const svg = useRef(null);

    const svgOffset: Offsets = isDesktop
        ? ['start center', 'end end']
        : ['center end', 'end center'];
    const { scrollYProgress: containerScrollYProgress } = useScroll({
        target: container,
        offset: ['start center', 'center end'],
    });

    const { scrollYProgress: svgScrollYProgress } = useScroll({
        target: svg,
        offset: svgOffset,
    });
    const backgroundColor = useTransform(
        containerScrollYProgress,
        [0, 0.5, 1],
        ['#BFE4FF', '#72A0E5', '#192349'],
    );

    useGSAP(() => {
        const mm = gsap.matchMedia();

        //Desktop
        mm.add('(min-width: 800px)', () => {
            gsap.from('#big-challenges', {
                scrollTrigger: {
                    trigger: '#big-challenges',
                    scrub: true,
                    start: '-70% 20%',
                    end: 'bottom center',
                },
                opacity: 0,
                ease: 'none',
            });

            gsap.from('#bigger-prizes', {
                scrollTrigger: {
                    trigger: '#bigger-prizes',
                    scrub: true,
                    start: '-70% 20%',
                    end: 'bottom center',
                },
                opacity: 0,
                ease: 'none',
            });
        });

        //mobile
        mm.add('(max-width: 799px)', () => {
            gsap.from('#big-challenges', {
                scrollTrigger: {
                    trigger: '#big-challenges',
                    scrub: true,
                    start: '-70% center',
                    end: 'bottom center',
                },
                opacity: 0,
                ease: 'none',
            });

            gsap.from('#bigger-prizes', {
                scrollTrigger: {
                    trigger: '#bigger-prizes',
                    scrub: true,
                    start: '-70% center',
                    end: 'bottom center',
                },
                opacity: 0,
                ease: 'none',
            });
        });
    });

    return (
        <motion.div
            ref={container}
            className="prizes w-full"
            style={{ backgroundColor }}
        >
            <div className="relative flex max-w-[2000px] flex-col items-center justify-center px-8">
                {/* <Image src={prizesLine} alt="Prizes" className="w-full" /> */}

                <svg
                    viewBox="0 0 960 1359"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="h-auto min-w-full"
                    ref={svg}
                >
                    <motion.path
                        initial={{ pathLength: 0 }}
                        opacity="0.5"
                        d="M949.5 -0.5C822.5 614.5 369.5 502.995 369.5 502.995C-26.5003 377.408 501.478 207.482 501.479 369.183C501.48 468.683 -219.5 894 86.4998 1349"
                        stroke="white"
                        strokeOpacity="0.55"
                        strokeWidth="20"
                        strokeLinecap="round"
                        style={{ pathLength: svgScrollYProgress }}
                        pathLength={100}
                    />
                </svg>
                <div className="absolute flex w-full flex-col gap-16">
                    <div className="flex-start flex w-full" id="big-challenges">
                        <Image
                            src={bigChallenges}
                            alt="Big Challenges"
                            className="w-4/5"
                        />
                    </div>
                    <div className="flex w-full justify-end" id="bigger-prizes">
                        <Image
                            src={biggerPrizes}
                            alt="Bigger Prizes"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <div
                className="mx-auto -mt-12 max-w-[2000px] px-8 lg:-mt-48 lg:px-16"
                id="prizes"
            >
                <Prizes />
            </div>
        </motion.div>
    );
};

export default PrizesScroller;
