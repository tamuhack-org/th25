import React from 'react';

interface CTANavButtonProps {
    text: string;
    link: string;
}

const CTANavButton: React.FC<CTANavButtonProps> = ({ text = 'Link', link = '#' }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col justify-center h-[48px] px-4 rounded-lg border bg-[#CCE9FF]
            text-black border-[#4e4e4e] hover:border-white font-normal text-sm cursor-pointer
            transition-all"
        >
            {text}
        </a>
    );
};

export default CTANavButton;