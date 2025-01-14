import React from 'react';

interface NavButtonProps {
    text: string;
    link: string;
    isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
    text = 'Link',
    link = '#',
    isActive,
}) => {
    return (
        <a
            href={link}
            className={`flex h-[48px] cursor-pointer flex-col justify-center rounded-lg border px-4 text-sm font-normal text-[#e1e1e1] transition-all hover:border-gray-300 ${
                isActive ? 'border-gray-300' : 'border-[#4e4e4e]'
            }`}
        >
            {text}
        </a>
    );
};

export default NavButton;
