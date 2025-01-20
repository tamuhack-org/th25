import React, { useRef } from 'react';
import SectionItem from './Section'; // Assuming Section is also converted to a React component
import content from './content.json' assert { type: 'json' };
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import bus from '@/../public/bus_vignette.png';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

// Redefine Question shape as the same as in Question.tsx
interface Question {
    question: string;
    answers: string[];
}

// Redefine Section shape as the same as in Section.tsx
interface Section {
    title: string;
    questions: Question[];
}

const FAQ: React.FC = () => {
    const svgContainer = useRef(null);
    const crossWalk1 = useRef(null);
    const crossWalk2 = useRef(null);
    const crossWalk3 = useRef(null);
    const busVignette1 = useRef(null);
    const busVignette2 = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: svgContainer.current,
                start: 'top center',
                end: 'bottom center',
                scrub: true,
            },
        });

        tl.to(crossWalk1.current, { fillOpacity: 0.1, duration: 1 })
            .to(crossWalk2.current, { fillOpacity: 0.25, duration: 1 }, '+=0.5')
            .to(
                busVignette1.current,
                { opacity: 1, y: '-10%', duration: 2 },
                '+=0.1',
            )
            .to(crossWalk3.current, { fillOpacity: 0.45, duration: 1 }, '+=0.5')
            .to(
                busVignette2.current,
                { opacity: 1, y: '-10%', duration: 2 },
                '+=0.1',
            );
    });

    // Specifically type assert the content as a Section shape so I don't get errors w/ map function later
    const sections = content as Section[];

    return (
        <>
            <div className="relative w-full">
                <svg
                    viewBox="0 0 1373 438"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ref={svgContainer}
                >
                    <path
                        d="M272.045 0H1097.7L1132.1 73H240.1L272.045 0Z"
                        fill="white"
                        fillOpacity="0"
                        ref={crossWalk1}
                    />
                    <path
                        d="M203.1 134H1151.6L1235.6 232H119.1L203.1 134Z"
                        fill="white"
                        fillOpacity="0"
                        ref={crossWalk2}
                    />
                    <path
                        d="M91.1001 293H1276.1L1372.1 438H0.100098L91.1001 293Z"
                        fill="white"
                        fillOpacity="0"
                        ref={crossWalk3}
                    />
                </svg>

                {/**SVG Ratio is 73: 98: 145 */}
                <div className="absolute bottom-[45%] left-[10%] w-1/3">
                    <Image
                        src={bus}
                        alt="People waiting for bus"
                        className="relative z-50 ml-auto h-full w-auto object-cover opacity-0"
                        ref={busVignette1}
                    />
                </div>
                <div className="absolute bottom-0 right-[10%] w-1/3">
                    <Image
                        src={bus}
                        alt="People waiting for bus"
                        className="relative z-50 ml-auto h-full w-auto object-cover opacity-0"
                        ref={busVignette2}
                    />
                </div>
            </div>
            <section
                id="faq"
                className="mt-12 w-full lg:container lg:mt-48"
                aria-label="faq"
            >
                <div className="flex w-full flex-row justify-between">
                    <div className="w-full md:w-1/2">
                        <h1
                            id="faq-title"
                            className="font-poppins text-4.5xl font-semibold text-white xxs:text-5.5xl xs:text-6xl md:text-6.5xl xl:text-7.5xl 2xl:text-8.5xl"
                        >
                            FAQ
                        </h1>
                        <div
                            id="faq-description"
                            className="xs:text-md mt-5 font-poppins text-sm leading-loose tracking-wide text-white sm:text-lg md:text-xl"
                        >
                            <p>
                                Everything you need to know about participating
                                in TAMUhack. Can&apos;t find what you&apos;re
                                looking for?{' '}
                                <a
                                    className="underline"
                                    href="mailto:hello@tamuhack.com"
                                >
                                    Contact Our Team.
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="mr-20 hidden md:flex md:w-3/12">
                        <Image
                            src="/faq_guy.png"
                            alt="FAQ mascot"
                            width={249}
                            height={187}
                            className="hidden h-auto max-h-full w-auto max-w-full object-contain opacity-0 md:flex"
                        />
                    </div>
                </div>
                <div className="mt-10">
                    {sections.map((section, index) => (
                        <div key={index} className="mb-12 lg:mb-16">
                            {/* Create each section*/}
                            <SectionItem
                                title={section.title}
                                questions={section.questions}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default FAQ;
