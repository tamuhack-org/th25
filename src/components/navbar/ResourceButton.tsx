import React from 'react';
import { IconBrandDiscord } from '@tabler/icons-react';

type TablerIconComponent = typeof IconBrandDiscord;

interface ResourceButtonProps {
    text: string;
    link: string;
    Icon: TablerIconComponent;
}

const ResourceButton: React.FC<ResourceButtonProps> = ({ text = 'Link', link = '#', Icon }) => {
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

export default ResourceButton;