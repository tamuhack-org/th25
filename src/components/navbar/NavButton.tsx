import React, { useState, useEffect } from 'react';

interface NavButtonProps {
    text: string;
    link: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text = 'Link', link = '#' }) => {
    const [sectionInView, setSectionInView] = useState('')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setSectionInView(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <a
            href={link}
            className={`flex flex-col justify-center h-[48px] px-4 rounded-lg border
            hover:border-gray-300 text-[#e1e1e1] font-normal text-sm cursor-pointer
            transition-all ${sectionInView === text ? 'border-gray-300' : 'border-[#4e4e4e]'
                }`}
        >
            {text}
        </a>
    );
};

export default NavButton;