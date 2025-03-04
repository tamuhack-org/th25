import React from 'react';
import QuestionItem from './Question';

interface SectionProps {
    // Expects a section title
    title: string;
    // Expects multiple question items that contains a question and a list of answers
    questions: { question: string; answers: string[] }[];
}

const SectionItem: React.FC<SectionProps> = ({ title, questions = [] }) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="mb-10 w-full lg:mb-0 lg:w-1/4">
                <h2
                    id="new-section-title"
                    className="sticky top-8 font-poppins text-2xl font-semibold text-white xxs:text-3xl xs:text-4xl md:text-4.5xl xl:text-5.5xl 2xl:text-6.5xl"
                >
                    {/*Add the title to the left 1/4 of screen and make it sticky*/}
                    {title}
                </h2>
            </div>
            <div className="w-full lg:w-3/4">
                {/*Add each question to the right 3/4 of screen -- uses QuestionItem for accordion animation*/}
                {questions.map((item) => (
                    <QuestionItem key={item.question} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SectionItem;
