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

const Info = () => {
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#car-container',
                start: 'center 90%',
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
                start: 0.15,
                end: 0.7,
                autoRotate: true,
            },
            opacity: 0,
            immediateRender: true,
            ease: 'none',
        });
    });
    return (
        <div className="relative font-poppins">
            {/* -z-10 on the svg makes it disappear for some reason, so we add z-10 to all divs so that they are on top */}
            <div className="relative z-10">
                <p className="mx-auto max-w-screen-lg text-center text-base !leading-relaxed lg:text-2xl">
                    TAMUhack is a{' '}
                    <span className="font-bold">24-hour event</span> where teams
                    create innovative{' '}
                    <span className="font-bold">software and hardware</span>{' '}
                    solutions to real-world problems, all while being supported
                    by a{' '}
                    <span className="font-bold">community of mentorship.</span>
                </p>
            </div>
            <div className="flex flex-col place-items-center items-center gap-8 py-10 lg:grid lg:grid-cols-2 lg:grid-rows-2">
                <div className="z-10 col-span-1 col-start-2 row-span-1 row-start-1 mt-10">
                    <h2
                        className={`text-4xl lg:text-7xl ${belgiano.className}`}
                    >
                        Location
                    </h2>
                    <div className="mt-4 max-w-lg rounded-xl bg-transparent bg-opacity-60 lg:bg-white lg:p-6">
                        <p>Bethancourt Ballroom (MSC 2300)</p>
                        <p>730 Olsen Blvd, College Station, TX 77845</p>
                        <div className="mt-6">
                            <a href="#" className="underline">
                                Building Map & Parking
                            </a>
                        </div>
                        <p className="mt-6">
                            Information on parking will be updated at a later
                            date!
                        </p>
                    </div>
                </div>
                <div className="z-10 col-span-1 col-start-1 row-span-1 row-start-2">
                    <h2
                        className={`text-5xl ${belgiano.className} hidden lg:block`}
                    >
                        Interested in hardware?
                    </h2>
                    <h2
                        className={`text-4xl ${belgiano.className} block lg:hidden`}
                    >
                        Hardware
                    </h2>
                    <div className="mt-3 grid w-full place-items-center rounded-full bg-black p-2 text-base lg:text-lg">
                        <p className="uppercase text-white">
                            Hardware will begin Jan 19th
                        </p>
                    </div>
                    <div className="mt-4 max-w-lg rounded-xl bg-transparent bg-opacity-60 lg:bg-white lg:p-6">
                        <p>
                            At TAMUhack 2025,{' '}
                            <span className="underline">hardware</span> will be
                            a <span className="font-bold">week-long</span>{' '}
                            hackathon. Teams may begin working on January 19th
                            and have until January 26th, when teams will
                            showcase their project at the venue in specific
                            challenges or the general track.
                        </p>
                        <p className="mt-6">
                            TAMUhack will be providing{' '}
                            <span className="underline">hardware supplies</span>{' '}
                            to{' '}
                            <span className="font-bold">
                                accepted participants
                            </span>{' '}
                            on campus on a{' '}
                            <span className="font-bold">
                                first come, first served{' '}
                            </span>
                            basis. Using personal/outside hardware is allowed,
                            but it is your responsibility to obtain it!
                        </p>
                    </div>
                </div>
                <div className="col-start-2 row-start-2 self-end">
                    <p className="max-w-prose bg-[url('/acceptance_info.svg')] bg-contain bg-center bg-no-repeat text-sm">
                        <span className="font-bold">Note:</span> Acceptances
                        will be sent out on a rolling basis. If you are
                        accepted, you must check in before 11 AM or your
                        acceptance will be forfeited. We will have a waitlist
                        line for students who are not accepted. After 11AM, we
                        will admit people from the waitlist line until the MSC
                        capacity has been reached.
                    </p>
                </div>
            </div>
            {/* Need to add extra margin to break out of box */}
            <div
                className="absolute right-0 top-0 -mx-8 hidden h-3/4 w-full grid-cols-1 grid-rows-1 justify-items-end lg:-mx-16 lg:grid"
                id="car-container"
            >
                <svg
                    className="z-0 col-start-1 row-start-1 h-full w-full object-cover"
                    preserveAspectRatio="none"
                    viewBox="0 0 1338 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M184 9.99988L98.3707 130.642C80.5127 155.802 65.5178 182.876 53.6644 211.362L29.3108 269.888C6.80316 323.978 4.48623 384.356 22.7825 440.012V440.012C43.9202 504.311 90.7899 556.956 152.212 585.391L160.811 589.372C229.851 621.333 306.587 632.896 381.98 622.698L408.487 619.112C451.422 613.305 492.776 599.027 530.149 577.108L574.928 550.845C586.239 544.211 596.273 535.608 604.556 525.443L624.176 501.364C649.473 470.317 646.557 425.017 617.486 397.47V397.47C594.336 375.532 560.007 370.252 531.334 384.218L495.302 401.768C474.139 412.075 456.055 427.762 442.861 447.256L433.846 460.575C403.968 504.716 400.144 561.515 423.834 609.263V609.263C440.638 643.13 469.769 669.28 505.246 682.344L512.887 685.157C555.187 700.732 601.964 698.701 642.754 679.518L680 662.001L705.248 646.581C737.099 627.128 774.698 619.289 811.67 624.394L830.781 627.032C872.567 632.801 898.103 675.967 883.037 715.368V715.368C881.351 719.777 879.193 723.991 876.602 727.937L858.968 754.789C837.186 787.956 854.549 832.704 893 842.501V842.501V842.501C1017.49 888.693 1151.91 901.445 1282.87 879.484L1327.5 872"
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
                    className="car col-start-1 row-start-1 hidden w-fit lg:block"
                    loading="eager"
                />
            </div>
        </div>
    );
};

export default Info;
