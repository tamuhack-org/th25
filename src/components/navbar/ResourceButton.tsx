import React from 'react';
import { IconBrandDiscord } from '@tabler/icons-react';

type TablerIconComponent = typeof IconBrandDiscord;

interface ResourceButtonProps {
    text: string;
    link: string;
    Icon: TablerIconComponent;
    disabled?: boolean;
}

const ResourceButton: React.FC<ResourceButtonProps> = ({
    text = 'Link',
    link = '#',
    Icon,
    disabled = false,
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            className={`${disabled ? 'pointer-events-none cursor-default opacity-50' : 'hover:opacity-75'} flex flex-row items-center gap-2 transition-opacity`}
        >
            <Icon className="h-5 w-5" />
            <p>{text}</p>
        </a>
    );
};

export default ResourceButton;
