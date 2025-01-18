import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useWindowSize } from '@/hooks/useWindowSize';

gsap.registerPlugin(useGSAP);

const SpriteAnimator = ({
    playing,
    className,
    src,
    alt,
}: {
    playing: boolean;
    className: string;
    src: string;
    alt: string;
}) => {
    const size = useWindowSize();
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(
        () => {
            if (tl.current) {
                tl.current.kill();
            }
            tl.current = gsap.timeline({ repeat: -1, paused: true });

            const cordesH = gsap.getProperty('.asdf', 'height') as number;

            tl.current.to('#runner', {
                duration: 0.75,
                x: -cordesH * 5,
                ease: 'steps(5)',
            });
        },
        { dependencies: [size] },
    );

    useEffect(() => {
        console.log(playing, Date.now());
        if (playing) {
            tl.current?.play();
        } else {
            tl.current?.pause();
        }
    }, [playing]);

    return (
        <div
            className={twMerge(
                'asdf aspect-square w-[200px] overflow-hidden',
                className,
            )}
        >
            <Image
                src={src}
                alt={alt}
                id="runner"
                width={500}
                height={100}
                className="h-full w-auto max-w-none"
            />
        </div>
    );
};

export default SpriteAnimator;
