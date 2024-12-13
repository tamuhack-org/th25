import Image from 'next/image';
import HomeImage from '@/../public/home_image.png';
import Guy from '@/../public/guy.png';
import BigBubble from '@/../public/big_bubble.png';
import { useEffect } from 'react';

export default function HomeGraphic() {

    useEffect(() => {
        if (typeof window !== "undefined") {
            const $ = require("jquery");
            window.$ = window.jQuery = $;
            require("jquery.ripples"); // Load the Ripples plugin

            if ($.fn.ripples) {
                console.log("jQuery Ripples is active!");

                // Apply ripples to the element with the background image
                $("#home-image-container").ripples({
                    resolution: 256,
                    perturbance: 0.08,
                });
                $("#home-image-container").ripples("update");
            } else {
                console.log("jQuery Ripples is not active.");
            }
        }
    }, []);

    return (
        <div id="relative" className="relative">
            <div
                id="home-image-container"
                style={{
                    width: '800px',
                    height: '600px',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'url("/home_image.png") no-repeat center center',
                    backgroundSize: 'cover',
                }}
            ></div>
            <Image
                src={Guy}
                alt="Lineart of a man walking"
                width={64}
                height={64}
                placeholder="empty"
                className="absolute bottom-0 right-[25%] max-w-9 md:max-w-12 lg:max-w-16"
            />
            <Image
                src={BigBubble}
                alt=""
                width={64}
                height={64}
                placeholder="empty"
                className="absolute right-[15%] top-7 hidden max-w-12 lg:block"
            />
        </div>
    );
}
