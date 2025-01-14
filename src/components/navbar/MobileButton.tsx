import React from 'react';
import { IconBrandDiscord } from '@tabler/icons-react';

type TablerIconComponent = typeof IconBrandDiscord;

interface MobileButtonProps {
    Icon: TablerIconComponent;
    link: string;
    isActive: boolean;
}

const MobileButton: React.FC<MobileButtonProps> = ({
    Icon,
    link,
    isActive,
}) => {

    return (
        <a
            href={link}
            className={`rounded-md border p-1 transition-all ${
                isActive ? 'border-gray-400' : 'border-transparent'
            }`}
        >
            <Icon className="h-5 w-5" />
        </a>
    );
};

export default MobileButton;
