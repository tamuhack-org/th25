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
            require("jquery.ripples"); 

            if ($.fn.ripples) {
                $("#home-image-container").ripples({
                    // Change resolution, perturbance, and dropRadius to change the ripple effect
                    resolution: 512,
                    perturbance: .02,
                    dropRadius: 50,
                });
                $("#home-image-container").ripples("updateSize");
            }
        }
    }, []);

    return (
        <div id="relative" className="relative">
            <div>
                <script 
                    src="http://www.jqueryscript.net/demo/jQuery-Plugin-For-Water-Ripple-Animation-ripples/js/jquery.ripples.js" 
                    defer
                ></script>
            </div>
            <div
                id="home-image-container"
                style={{
                    width: '600px',
                    height: '500px',
                    overflow: 'hidden',
                    background: 'url("/home_image.png") no-repeat center center',
                    backgroundSize: 'contain',
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
