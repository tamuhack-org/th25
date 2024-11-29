import React from 'react';
import SectionItem from './Section'; // Assuming Section is also converted to a React component
import content from './content.json' assert { type: 'json'};

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
        <div className="w-full lg:container">
            <div className="flex">
                <div className="w-full lg:w-3/4">
                    <h1 id="faq-title" className="font-serif text-7xl text-transparent">FAQ</h1>
                    <div id="faq-description" className="mt-10 text-[#000000] text-xl md:text-2xl font-serif">
                        <p>Everything you need to know about participating in TAMUhack.</p>
                        <p className="mt-4 md:mt-0">
                            Can't find what you're looking for? <a className="underline" href="mailto:hello@tamuhack.com">Contact Our Team.</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                {sections.map((section, index) => (
                    <div key={index} className="mb-12 lg:mb-16">
                        {/* Create each section*/}
                        <SectionItem title={section.title} questions={section.questions} />
                    </div>
                ))}
            </div>
            {/*Style the FAQ title to have cool outline*/}
            <style jsx>{`
                #faq-title {
                -webkit-text-stroke-width: 2px;
                -webkit-text-stroke-color: #000000;
                opacity: 0.7;
                }
            `}</style>
        </div>
    );
};

export default FAQ;