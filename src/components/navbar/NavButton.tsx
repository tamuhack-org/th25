import React, { useState, useEffect } from 'react';

interface NavButtonProps {
    text: string;
    link: string;
    isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ text = 'Link', link = '#', isActive }) => {
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
            className={`flex flex-col justify-center h-[48px] px-4 rounded-lg border
            hover:border-gray-300 text-[#e1e1e1] font-normal text-sm cursor-pointer
            transition-all ${isActive ? 'border-gray-300' : 'border-[#4e4e4e]'
                }`}
        >
            {text}
        </a>
    );
};

export default NavButton;