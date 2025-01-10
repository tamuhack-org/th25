import React, { useState, useEffect } from 'react';

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
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById(link.substring(1));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a
            href={link}
            onClick={handleClick}
            className={`flex h-[48px] cursor-pointer flex-col justify-center rounded-lg border px-4 text-sm font-normal text-[#e1e1e1] transition-all hover:border-gray-300 ${
                isActive ? 'border-gray-300' : 'border-[#4e4e4e]'
            }`}
        >
            {text}
        </a>
    );
};

export default NavButton;
