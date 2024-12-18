import localFont from 'next/font/local';
import Car from '@/../public/car.png';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

const belgiano = localFont({ src: '../../pages/fonts/Belgiano.woff' });
const kis = localFont({
    src: '../../pages/fonts/adobe-kis-vf-default-roman.ttf',
});

const Info = () => {
    useGSAP(() => {
        const startPos = 0.05
        // gsap.set('.car', {
        //     motionPath: {
        //         path: '#car-path',
        //         align: '#car-path',
        //         alignOrigin: [0.5, 0.5],
        //         start: startPos,
        //         end: 0.1,
        //         autoRotate: true,
        //     },
        // });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#car-container',
                start: '30% 90%',
                end: 'bottom center',
                scrub: true,
                markers: true,
            },
        });
        tl.to('.car', {
            motionPath: {
                path: '#car-path',
                align: '#car-path',
                alignOrigin: [0.5, 0.5],
                start: startPos,
                end: 0.7,
                autoRotate: true,
            },
            opacity: 0,
            immediateRender: true,
            ease: 'none'
        });
    });
    return (
        <div className="relative grid-cols-2 grid-rows-2 place-items-center gap-8 py-10 lg:grid">
            {/* -z-10 on the svg makes it disappear for some reason, so we add z-10 to all divs so that they are on top */}
            <div className="z-10 col-span-1 col-start-2 row-span-1 row-start-1 mt-10">
                <h2 className={`text-7xl ${belgiano.className}`}>
                    General Info
                </h2>
                <div className="mt-4 max-w-lg rounded-xl bg-white bg-opacity-60 p-6">
                    <p>
                        TAMUhack is a 24-hour event where teams create
                        innovative software and hardware solutions to real-world
                        problems in a community of mentorship.
                    </p>
                    <h3 className="mt-8 text-lg">Location</h3>
                    <p>Bethancourt Ballroom (MSC 2300)</p>
                    <p>730 Olsen Blvd, College Station, TX 77845</p>
                    <div className="mt-6">
                        <a href="#" className="underline">
                            Building Map & Parking
                        </a>
                    </div>
                </div>
            </div>
            <div className="z-10 col-span-1 col-start-1 row-span-1 row-start-2">
                <h2 className={`text-7xl ${belgiano.className}`}>Hardware</h2>
                <div className="mt-4 max-w-lg rounded-xl bg-white bg-opacity-60 p-6">
                    <p>
                        At TAMUhack 2025,{' '}
                        <span className="underline">hardware</span> will be a{' '}
                        <span className="font-bold">week-long</span> hackathon
                        Teams may begin working on January 19th and have until
                        January 26th, when teams will showcase their project at
                        the venue in specific challenges or the general track.
                    </p>
                    <p className="mt-6">
                        TAMUhack will be providing{' '}
                        <span className="underline">hardware supplies </span>to{' '}
                        <span className="font-bold">accepted participants</span>{' '}
                        on campus on a{' '}
                        <span className="font-bold">
                            first come, first served{' '}
                        </span>
                        basis. Using personal/outside hardware is allowed, but
                        it is your responsibility to obtain it!
                    </p>
                </div>
            </div>
            <div className="col-start-2 row-start-2 self-end">
                <p className='max-w-prose'>
                    Note: Acceptances will be sent out on a rolling basis. If
                    you are accepted, you must check in before 11 AM or your
                    acceptance will be forfeited. We will have a waitlist line
                    for students who are not accepted. After 11AM, we will admit
                    people from the waitlist line until the MSC capacity has
                    been reached.
                </p>
            </div>
            {/* Need to add extra margin to break out of box */}
            <div
                className="absolute right-0 top-0 -mx-8 grid h-5/6 w-full grid-cols-1 grid-rows-1 justify-items-end lg:-mx-16"
                id="car-container"
            >
                <svg
                    viewBox="0 0 1331 916"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="z-0 col-start-1 row-start-1 h-full object-cover"
                >
                    <path
                        d="M304 10.5L263.745 61.1358C237.71 93.8835 207.213 122.82 173.144 147.099L149.071 164.254C112.78 190.117 82.4613 223.467 60.1633 262.051L40.4206 296.214C8.60715 351.264 1.77152 417.266 21.628 477.668V477.668C40.9504 536.445 83.795 584.569 139.942 610.562L156.811 618.371C225.85 650.332 302.587 661.895 377.979 651.697L404.487 648.111C447.422 642.304 488.776 628.026 526.149 606.107L570.928 579.844C582.239 573.21 592.273 564.607 600.556 554.442L620.175 530.364C645.473 499.316 642.556 454.016 613.486 426.469V426.469C590.335 404.532 556.007 399.251 527.333 413.217L491.302 430.767C470.139 441.075 452.055 456.761 438.86 476.255L429.845 489.574C399.968 533.715 396.144 590.515 419.834 638.262V638.262C436.637 672.129 465.768 698.279 501.246 711.343L508.887 714.156C551.186 729.731 597.964 727.7 638.754 708.517L676 691L701.248 675.58C733.099 656.127 770.698 648.288 807.669 653.393L826.78 656.031C868.567 661.8 894.102 704.966 879.036 744.367V744.367C877.35 748.776 875.193 752.99 872.602 756.936L854.968 783.788C833.186 816.955 850.549 861.703 889 871.5V871.5V871.5C1011.55 916.974 1146.38 916.801 1268.82 871.014L1321 851.5"
                        stroke="white"
                        strokeOpacity="0.55"
                        strokeWidth="20"
                        strokeLinecap="round"
                        id="car-path"
                    />
                </svg>
                <Image
                    src={Car}
                    alt=""
                    width={64}
                    height={64}
                    placeholder="empty"
                    className="car z-10 col-start-1 row-start-1 hidden w-fit lg:block"
                />
            </div>
        </div>
    );
};

export default Info;
