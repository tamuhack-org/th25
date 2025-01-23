import React from 'react';

interface CTANavButtonProps {
    text: string;
    link: string;
}

const CTANavButton: React.FC<CTANavButtonProps> = ({
    text = 'Link',
    /*
    link = '#',
    */
}) => {
    return (
        /*
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[48px] cursor-pointer flex-col justify-center rounded-lg border border-[#4e4e4e] bg-[#CCE9FF] px-4 text-sm font-semibold text-black transition-all hover:border-white"
        >
        </a>
        */
        <div
            className="flex h-[48px] pointer-events-none flex-col justify-center rounded-lg border border-[#4e4e4e] bg-[#CCE9FF] px-4 text-sm font-semibold text-black transition-all opacity-50"
        >
            {text}
        </div>
    );
};

export default CTANavButton;
