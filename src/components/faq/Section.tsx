import React from 'react';
import QuestionItem from './Question';

interface SectionProps {
    title: string;
    questions: { question: string; answers: string[] }[];
}

const SectionItem: React.FC<SectionProps> = ({ title, questions = [] }) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full mb-10 lg:mb-0 lg:w-1/4">
                <h2 id="new-section-title" className="sticky top-8 font-semibold text-4xl text-pink">
                    {title}
                </h2>
            </div>
            <div className="w-full lg:w-3/4">
                {questions.map((item) => (
                    <QuestionItem key={item.question} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SectionItem;