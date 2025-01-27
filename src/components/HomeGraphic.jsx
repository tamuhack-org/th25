import Image from 'next/image';
import HomeImage from '@/../public/home_image.png';
import Guy from '@/../public/guy.png';
import { useEffect } from 'react';

export default function HomeGraphic() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const $ = require('jquery');
            window.$ = window.jQuery = $;
            require('jquery.ripples');

            if ($.fn.ripples) {
                $('#home-image-container').ripples({
                    // Change resolution, perturbance, and dropRadius to change the ripple effect
                    resolution: 512,
                    perturbance: 0.02,
                    dropRadius: 50,
                });
                $('#home-image-container').ripples('updateSize');
            }
        }
    }, []);

    return (
        <div className="relative">
            <div>
                <script
                    src="http://www.jqueryscript.net/demo/jQuery-Plugin-For-Water-Ripple-Animation-ripples/js/jquery.ripples.js"
                    defer
                ></script>
            </div>
            <div
                id="home-image-container"
                alt="Reflection of College Station in a puddle"
                style={{
                    maxWidth: '800px',
                    width: '100%',
                    // Maintain a 4:3 aspect ratio: (600/800)*100% = 75%
                    paddingBottom: '75%',
                    background:
                        'url("/home_image.png") no-repeat center center',
                    backgroundSize: 'contain',
                }}
                className="hidden lg:flex"
            ></div>
            <Image
                src={HomeImage}
                alt="Reflection of College Station in a puddle"
                placeholder="empty"
                className="flex lg:hidden mx-auto lg:mx-0"
                quality={50}
                priority
            />
            <Image
                src={Guy}
                alt="Just a guy walking"
                placeholder="empty"
                className="absolute bottom-0 right-[25%] max-w-12 lg:max-w-16"
            />
        </div>
    );
}
