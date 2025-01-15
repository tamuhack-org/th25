import React from 'react';
import SectionItem from './Section'; // Assuming Section is also converted to a React component
import content from './content.json' assert { type: 'json' };
import Image from 'next/image';

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
    // Specifically type assert the content as a Section shape so I don't get errors w/ map function later
    const sections = content as Section[];

    return (
        <section id="faq" className="w-full lg:container" aria-label="faq">
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
                            Everything you need to know about participating in
                            TAMUhack. Can&apos;t find what you&apos;re looking
                            for?{' '}
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
                        alt="Schedule mascot"
                        width={249}
                        height={187}
                        className="hidden h-auto max-h-full w-auto max-w-full object-contain md:flex"
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
    );
};

export default FAQ;
