/** eslint-disable **/
import Image from 'next/image';
import Guy from '@/../public/guy.png';
import BigBubble from '@/../public/big_bubble.png';
import HomeImage from '@/../public/home_image.png';
import { useEffect, useRef } from 'react';
import Script from 'next/script'

export default function HomeGraphic() {
    const imageRef = useRef(null);

    return (
        <div id="relative" className="relative">
            <div>
                <Script 
                    src="https://code.jquery.com/jquery-3.6.0.min.js"
                    strategy="beforeInteractive"
                    onLoad={() => {
                        console.log('jQuery loaded');
                    }}
                    onError={() => {
                        console.error('Failed to load jQuery');
                    }}
                />
                <Script 
                    src="/js/jquery.ripples.js" 
                    strategy="afterInteractive"
                    onLoad={() => {
                        console.log('Ripples plugin loaded');
                    }}
                    onError={() => {
                        console.error('Failed to load ripples plugin');
                    }}
                />
            </div>

            <div style={{
                maxWidth: '800px',
                width: '100%',
                position: 'relative',
                paddingBottom: '75%',
                overflow: 'hidden'
            }}>
                <Image
                    ref={imageRef}
                    onLoad={(e) => {
                        console.log('Image loaded:', e.target);
                        console.log('Image ref:', imageRef.current);
                        console.log('Natural dimensions:', {
                            width: imageRef.current.naturalWidth,
                            height: imageRef.current.naturalHeight
                        });
                        // Wait a brief moment to ensure image is fully rendered
                        if (!imageRef.current) {
                            console.error('Image ref not available');
                            return;
                        }
                        setTimeout(() => {
                            if (window.jQuery && window.jQuery.fn.ripples && imageRef.current) {
                                try {
                                    window.jQuery(imageRef.current).ripples({
                                        resolution: 512,
                                        perturbance: 0.02,
                                        dropRadius: 50,
                                    });
                                    console.log('Ripples initialized successfully');
                                } catch (error) {
                                    console.error('Error initializing ripples:', error);
                                    // Log the actual error for debugging
                                    console.error('Error details:', {
                                        hasContext: !!window.WebGLRenderingContext,
                                        imageLoaded: imageRef.current.complete,
                                        imageDimensions: {
                                            width: imageRef.current.width,
                                            height: imageRef.current.height
                                        }
                                    });
                                }
                            } else {
                                console.error('Dependencies not loaded:', {
                                    jquery: !!window.jQuery,
                                    ripples: !!(window.jQuery && window.jQuery.fn.ripples),
                                    imageRef: !!imageRef.current
                                });
                            }
                        }, 500);
                        }}
                    src={HomeImage}
                    alt="Home image"
                    fill
                    sizes="(max-width: 800px) 100vw, 800px"
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
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
