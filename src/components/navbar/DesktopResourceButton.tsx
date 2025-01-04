import React from 'react';
import { IconBrandDiscord } from '@tabler/icons-react';

type TablerIconComponent = typeof IconBrandDiscord;

interface DesktopResourceButtonProps {
    text: string;
    link: string;
    Icon: TablerIconComponent;
}

const DesktopResourceButton: React.FC<DesktopResourceButtonProps> = ({ text = 'Link', link = '#', Icon }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-row items-center gap-2 hover:opacity-75 transition-opacity"
        >
            <Icon className="w-5 h-5" />
            <p>{text}</p>
        </a>
    );
};

export default DesktopResourceButton;