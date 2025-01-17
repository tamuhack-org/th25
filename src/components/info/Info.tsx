import localFont from 'next/font/local';
import Car from '@/../public/car.png';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef, useEffect } from 'react';
import Link from 'next/link';

import pink_info from '../../../public/pink_info.png';
import blue_info from '../../../public/blue_info.png';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

const belgiano = localFont({ src: '../../pages/fonts/Belgiano.woff' });

const Info = () => {
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const createTimeline = (initialProgress = 0) => {
        if (tlRef.current) {
            tlRef.current.kill();
            tlRef.current = null;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#car-container',
                start: 'center 90%',
                end: 'bottom center',
                scrub: true,
            },
        });

        tl.to('.car', {
            motionPath: {
                path: '#car-path',
                align: '#car-path',
                alignOrigin: [0.5, 1],
                start: 0.15,
                end: 0.7,
                autoRotate: true,
            },
            opacity: 0,
            immediateRender: true,
            ease: 'none',
        });

        tl.set('.pin', {
            motionPath: {
                path: '#car-path',
                align: '#car-path',
                alignOrigin: [0.5, 0.8],
                start: 0.65,
                end: 0.65,
            },
            immediateRender: true,
        });

        tl.progress(initialProgress);

        tlRef.current = tl;
    };

    //! Can't use layoutEffect here cuz pages renders this on the server? doesn't rly impact it though it seems like
    useEffect(() => {
        createTimeline();

        const handleResize = () => {
            if (!tlRef.current) return;

            const oldProgress = tlRef.current.progress();

            createTimeline(oldProgress);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (tlRef.current) {
                tlRef.current.kill();
            }
        };
    }, []);
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
                            <Link
                                href="/buildingMap.png"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                View Building Map
                            </Link>
                        </div>
                        <p className="mt-6">
                            Parking will be available at{' '}
                            <Link
                                href="https://maps.app.goo.gl/ceQELiAUQKdrBqqc6"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                Lot 100t
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="https://maps.app.goo.gl/9LnkaYUdw7PFyR5o6"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                Lot 74
                            </Link>
                            . These lots are available for free parking during
                            the event, no permit required. Please note that you
                            cannot park in numbered spots, timed parking spaces,
                            or university business or service spaces.
                        </p>
                    </div>
                </div>
                <div className="col-span-1 col-start-1 row-span-1 row-start-1 w-[65%] xs:w-[55%] lg:mb-24 z-10">
                    <Image src={blue_info} alt="pink info" />
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
                    <div className="mt-3 grid w-full place-items-center rounded-full bg-black p-2 text-base font-semibold tracking-wider">
                        <p className="uppercase text-white">
                            Hardware will begin Jan 21st
                        </p>
                    </div>
                    <div className="mt-4 max-w-lg rounded-xl bg-transparent bg-opacity-60 lg:bg-white lg:p-6">
                        <p>
                            At TAMUhack 2025, <span className="">hardware</span>{' '}
                            will be a{' '}
                            <span className="font-bold">week-long</span>{' '}
                            hackathon. Teams may begin working on January 21st
                            and have until January 26th, when teams will
                            showcase their project at the venue in specific
                            challenges or the general track.
                        </p>
                        <p className="mt-6">
                            TAMUhack will be providing hardware supplies (see {' '}
                            <a
                                href="https://docs.google.com/document/d/1NAnblNfmhRuGRvaJSTiiwVoV1eC3fDpZaJBeHEqp-rk/edit?usp=sharing"
                                className="underline"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                here
                            </a>{') '}
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
                <div className="w-full lg:w-4/5">
                    <div className="flex flex-col place-items-center gap-6">
                        <div className="w-[65%] xs:w-[55%] lg:w-[65%s] z-10">
                            <Image src={pink_info} alt="pink info" />
                        </div>
                        <div>
                            <p className="max-w-prose bg-white py-4 px-8 rounded-3xl bg-opacity-55 lg:py-0 lg:px-0 lg:rounded-none lg:bg-opacity-0 lg:bg-[url('/acceptance_info.svg')] lg:bg-contain lg:bg-center lg:bg-no-repeat text-xxxs sm:text-sm text-center">
                                <span className="font-bold">Note:</span>{' '}
                                Acceptances will be sent out on a rolling basis.
                                If you are accepted, you must check in before 11
                                AM or your acceptance will be forfeited. We will
                                have a waitlist line for students who are not
                                accepted. After 11AM, we will admit people from
                                the waitlist line until the MSC capacity has
                                been reached.
                            </p>
                        </div>
                    </div>
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

                {/*Map pin svg  */}
                <svg
                    width="102"
                    height="62"
                    viewBox="0 0 102 62"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pin"
                >
                    <path
                        d="M51 61C57.6274 61 63 55.6274 63 49C63 42.3726 57.6274 37 51 37C44.3726 37 39 42.3726 39 49C39 55.6274 44.3726 61 51 61Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        id="circle"
                    />
                    <path
                        d="M63 29C63 36.4895 54.6915 44.2895 51.9015 46.6985C51.6416 46.8939 51.3252 46.9996 51 46.9996C50.6748 46.9996 50.3584 46.8939 50.0985 46.6985C47.3085 44.2895 39 36.4895 39 29C39 25.8174 40.2643 22.7652 42.5147 20.5147C44.7652 18.2643 47.8174 17 51 17C54.1826 17 57.2348 18.2643 59.4853 20.5147C61.7357 22.7652 63 25.8174 63 29Z"
                        fill="black"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M51 34C53.7614 34 56 31.7614 56 29C56 26.2386 53.7614 24 51 24C48.2386 24 46 26.2386 46 29C46 31.7614 48.2386 34 51 34Z"
                        fill="white"
                    />
                    <path
                        d="M0.473 8.161C0.473 7.413 0.641667 6.742 0.979 6.148C1.31633 5.54667 1.77467 5.07733 2.354 4.74C2.94067 4.40267 3.58967 4.234 4.301 4.234C5.137 4.234 5.86667 4.43567 6.49 4.839C7.11333 5.24233 7.568 5.81433 7.854 6.555H6.655C6.44233 6.093 6.13433 5.73733 5.731 5.488C5.335 5.23867 4.85833 5.114 4.301 5.114C3.76567 5.114 3.28533 5.23867 2.86 5.488C2.43467 5.73733 2.101 6.093 1.859 6.555C1.617 7.00967 1.496 7.545 1.496 8.161C1.496 8.76967 1.617 9.305 1.859 9.767C2.101 10.2217 2.43467 10.5737 2.86 10.823C3.28533 11.0723 3.76567 11.197 4.301 11.197C4.85833 11.197 5.335 11.076 5.731 10.834C6.13433 10.5847 6.44233 10.229 6.655 9.767H7.854C7.568 10.5003 7.11333 11.0687 6.49 11.472C5.86667 11.868 5.137 12.066 4.301 12.066C3.58967 12.066 2.94067 11.901 2.354 11.571C1.77467 11.2337 1.31633 10.768 0.979 10.174C0.641667 9.58 0.473 8.909 0.473 8.161ZM11.9731 12.099C11.4084 12.099 10.8951 11.9707 10.4331 11.714C9.9784 11.4573 9.61907 11.0943 9.35507 10.625C9.0984 10.1483 8.97007 9.59833 8.97007 8.975C8.97007 8.359 9.10207 7.81633 9.36607 7.347C9.6374 6.87033 10.0041 6.50733 10.4661 6.258C10.9281 6.00133 11.4451 5.873 12.0171 5.873C12.5891 5.873 13.1061 6.00133 13.5681 6.258C14.0301 6.50733 14.3931 6.86667 14.6571 7.336C14.9284 7.80533 15.0641 8.35167 15.0641 8.975C15.0641 9.59833 14.9247 10.1483 14.6461 10.625C14.3747 11.0943 14.0044 11.4573 13.5351 11.714C13.0657 11.9707 12.5451 12.099 11.9731 12.099ZM11.9731 11.219C12.3324 11.219 12.6697 11.1347 12.9851 10.966C13.3004 10.7973 13.5534 10.5443 13.7441 10.207C13.9421 9.86967 14.0411 9.459 14.0411 8.975C14.0411 8.491 13.9457 8.08033 13.7551 7.743C13.5644 7.40567 13.3151 7.15633 13.0071 6.995C12.6991 6.82633 12.3654 6.742 12.0061 6.742C11.6394 6.742 11.3021 6.82633 10.9941 6.995C10.6934 7.15633 10.4514 7.40567 10.2681 7.743C10.0847 8.08033 9.99307 8.491 9.99307 8.975C9.99307 9.46633 10.0811 9.88067 10.2571 10.218C10.4404 10.5553 10.6824 10.8083 10.9831 10.977C11.2837 11.1383 11.6137 11.219 11.9731 11.219ZM17.3812 3.86V12H16.3802V3.86H17.3812ZM20.0882 3.86V12H19.0872V3.86H20.0882ZM27.2943 8.755C27.2943 8.94567 27.2833 9.14733 27.2613 9.36H22.4433C22.4799 9.954 22.6816 10.4197 23.0483 10.757C23.4223 11.087 23.8733 11.252 24.4013 11.252C24.8339 11.252 25.1933 11.153 25.4793 10.955C25.7726 10.7497 25.9779 10.4783 26.0953 10.141H27.1733C27.0119 10.7203 26.6893 11.1933 26.2053 11.56C25.7213 11.9193 25.1199 12.099 24.4013 12.099C23.8293 12.099 23.3159 11.9707 22.8613 11.714C22.4139 11.4573 22.0619 11.0943 21.8053 10.625C21.5486 10.1483 21.4203 9.59833 21.4203 8.975C21.4203 8.35167 21.5449 7.80533 21.7943 7.336C22.0436 6.86667 22.3919 6.50733 22.8393 6.258C23.2939 6.00133 23.8146 5.873 24.4013 5.873C24.9733 5.873 25.4793 5.99767 25.9193 6.247C26.3593 6.49633 26.6966 6.841 26.9313 7.281C27.1733 7.71367 27.2943 8.205 27.2943 8.755ZM26.2603 8.546C26.2603 8.16467 26.1759 7.83833 26.0073 7.567C25.8386 7.28833 25.6076 7.07933 25.3143 6.94C25.0283 6.79333 24.7093 6.72 24.3573 6.72C23.8513 6.72 23.4186 6.88133 23.0593 7.204C22.7073 7.52667 22.5056 7.974 22.4543 8.546H26.2603ZM31.1016 5.873C31.6222 5.873 32.0769 5.98667 32.4656 6.214C32.8616 6.44133 33.1549 6.72733 33.3456 7.072V5.972H34.3576V12.132C34.3576 12.682 34.2402 13.1697 34.0056 13.595C33.7709 14.0277 33.4336 14.365 32.9936 14.607C32.5609 14.849 32.0549 14.97 31.4756 14.97C30.6836 14.97 30.0236 14.783 29.4956 14.409C28.9676 14.035 28.6559 13.5253 28.5606 12.88H29.5506C29.6606 13.2467 29.8879 13.54 30.2326 13.76C30.5772 13.9873 30.9916 14.101 31.4756 14.101C32.0256 14.101 32.4729 13.9287 32.8176 13.584C33.1696 13.2393 33.3456 12.7553 33.3456 12.132V10.867C33.1476 11.219 32.8542 11.5123 32.4656 11.747C32.0769 11.9817 31.6222 12.099 31.1016 12.099C30.5662 12.099 30.0786 11.967 29.6386 11.703C29.2059 11.439 28.8649 11.0687 28.6156 10.592C28.3662 10.1153 28.2416 9.57267 28.2416 8.964C28.2416 8.348 28.3662 7.809 28.6156 7.347C28.8649 6.87767 29.2059 6.51467 29.6386 6.258C30.0786 6.00133 30.5662 5.873 31.1016 5.873ZM33.3456 8.975C33.3456 8.52033 33.2539 8.12433 33.0706 7.787C32.8872 7.44967 32.6379 7.193 32.3226 7.017C32.0146 6.83367 31.6736 6.742 31.2996 6.742C30.9256 6.742 30.5846 6.83 30.2766 7.006C29.9686 7.182 29.7229 7.43867 29.5396 7.776C29.3562 8.11333 29.2646 8.50933 29.2646 8.964C29.2646 9.426 29.3562 9.82933 29.5396 10.174C29.7229 10.5113 29.9686 10.7717 30.2766 10.955C30.5846 11.131 30.9256 11.219 31.2996 11.219C31.6736 11.219 32.0146 11.131 32.3226 10.955C32.6379 10.7717 32.8872 10.5113 33.0706 10.174C33.2539 9.82933 33.3456 9.42967 33.3456 8.975ZM41.5491 8.755C41.5491 8.94567 41.5381 9.14733 41.5161 9.36H36.6981C36.7348 9.954 36.9365 10.4197 37.3031 10.757C37.6771 11.087 38.1281 11.252 38.6561 11.252C39.0888 11.252 39.4481 11.153 39.7341 10.955C40.0275 10.7497 40.2328 10.4783 40.3501 10.141H41.4281C41.2668 10.7203 40.9441 11.1933 40.4601 11.56C39.9761 11.9193 39.3748 12.099 38.6561 12.099C38.0841 12.099 37.5708 11.9707 37.1161 11.714C36.6688 11.4573 36.3168 11.0943 36.0601 10.625C35.8035 10.1483 35.6751 9.59833 35.6751 8.975C35.6751 8.35167 35.7998 7.80533 36.0491 7.336C36.2985 6.86667 36.6468 6.50733 37.0941 6.258C37.5488 6.00133 38.0695 5.873 38.6561 5.873C39.2281 5.873 39.7341 5.99767 40.1741 6.247C40.6141 6.49633 40.9515 6.841 41.1861 7.281C41.4281 7.71367 41.5491 8.205 41.5491 8.755ZM40.5151 8.546C40.5151 8.16467 40.4308 7.83833 40.2621 7.567C40.0935 7.28833 39.8625 7.07933 39.5691 6.94C39.2831 6.79333 38.9641 6.72 38.6121 6.72C38.1061 6.72 37.6735 6.88133 37.3141 7.204C36.9621 7.52667 36.7605 7.974 36.7091 8.546H40.5151ZM48.2341 12.077C47.7281 12.077 47.2734 11.989 46.8701 11.813C46.4741 11.6297 46.1624 11.3803 45.9351 11.065C45.7077 10.7423 45.5904 10.372 45.5831 9.954H46.6501C46.6867 10.3133 46.8334 10.6177 47.0901 10.867C47.3541 11.109 47.7354 11.23 48.2341 11.23C48.7107 11.23 49.0847 11.1127 49.3561 10.878C49.6347 10.636 49.7741 10.328 49.7741 9.954C49.7741 9.66067 49.6934 9.42233 49.5321 9.239C49.3707 9.05567 49.1691 8.91633 48.9271 8.821C48.6851 8.72567 48.3587 8.623 47.9481 8.513C47.4421 8.381 47.0351 8.249 46.7271 8.117C46.4264 7.985 46.1661 7.77967 45.9461 7.501C45.7334 7.215 45.6271 6.83367 45.6271 6.357C45.6271 5.939 45.7334 5.56867 45.9461 5.246C46.1587 4.92333 46.4557 4.674 46.8371 4.498C47.2257 4.322 47.6694 4.234 48.1681 4.234C48.8867 4.234 49.4734 4.41367 49.9281 4.773C50.3901 5.13233 50.6504 5.609 50.7091 6.203H49.6091C49.5724 5.90967 49.4184 5.653 49.1471 5.433C48.8757 5.20567 48.5164 5.092 48.0691 5.092C47.6511 5.092 47.3101 5.202 47.0461 5.422C46.7821 5.63467 46.6501 5.93533 46.6501 6.324C46.6501 6.60267 46.7271 6.83 46.8811 7.006C47.0424 7.182 47.2367 7.31767 47.4641 7.413C47.6987 7.501 48.0251 7.60367 48.4431 7.721C48.9491 7.86033 49.3561 7.99967 49.6641 8.139C49.9721 8.271 50.2361 8.48 50.4561 8.766C50.6761 9.04467 50.7861 9.426 50.7861 9.91C50.7861 10.284 50.6871 10.636 50.4891 10.966C50.2911 11.296 49.9977 11.5637 49.6091 11.769C49.2204 11.9743 48.7621 12.077 48.2341 12.077ZM53.4801 6.797V10.35C53.4801 10.6433 53.5424 10.8523 53.6671 10.977C53.7918 11.0943 54.0081 11.153 54.3161 11.153H55.0531V12H54.1511C53.5938 12 53.1758 11.8717 52.8971 11.615C52.6184 11.3583 52.4791 10.9367 52.4791 10.35V6.797H51.6981V5.972H52.4791V4.454H53.4801V5.972H55.0531V6.797H53.4801ZM55.8919 8.964C55.8919 8.348 56.0166 7.809 56.2659 7.347C56.5153 6.87767 56.8563 6.51467 57.2889 6.258C57.7289 6.00133 58.2166 5.873 58.7519 5.873C59.2799 5.873 59.7383 5.98667 60.1269 6.214C60.5156 6.44133 60.8053 6.72733 60.9959 7.072V5.972H62.0079V12H60.9959V10.878C60.7979 11.23 60.5009 11.5233 60.1049 11.758C59.7163 11.9853 59.2616 12.099 58.7409 12.099C58.2056 12.099 57.7216 11.967 57.2889 11.703C56.8563 11.439 56.5153 11.0687 56.2659 10.592C56.0166 10.1153 55.8919 9.57267 55.8919 8.964ZM60.9959 8.975C60.9959 8.52033 60.9043 8.12433 60.7209 7.787C60.5376 7.44967 60.2883 7.193 59.9729 7.017C59.6649 6.83367 59.3239 6.742 58.9499 6.742C58.5759 6.742 58.2349 6.83 57.9269 7.006C57.6189 7.182 57.3733 7.43867 57.1899 7.776C57.0066 8.11333 56.9149 8.50933 56.9149 8.964C56.9149 9.426 57.0066 9.82933 57.1899 10.174C57.3733 10.5113 57.6189 10.7717 57.9269 10.955C58.2349 11.131 58.5759 11.219 58.9499 11.219C59.3239 11.219 59.6649 11.131 59.9729 10.955C60.2883 10.7717 60.5376 10.5113 60.7209 10.174C60.9043 9.82933 60.9959 9.42967 60.9959 8.975ZM64.9205 6.797V10.35C64.9205 10.6433 64.9829 10.8523 65.1075 10.977C65.2322 11.0943 65.4485 11.153 65.7565 11.153H66.4935V12H65.5915C65.0342 12 64.6162 11.8717 64.3375 11.615C64.0589 11.3583 63.9195 10.9367 63.9195 10.35V6.797H63.1385V5.972H63.9195V4.454H64.9205V5.972H66.4935V6.797H64.9205ZM68.2234 4.993C68.0327 4.993 67.8714 4.927 67.7394 4.795C67.6074 4.663 67.5414 4.50167 67.5414 4.311C67.5414 4.12033 67.6074 3.959 67.7394 3.827C67.8714 3.695 68.0327 3.629 68.2234 3.629C68.4067 3.629 68.5607 3.695 68.6854 3.827C68.8174 3.959 68.8834 4.12033 68.8834 4.311C68.8834 4.50167 68.8174 4.663 68.6854 4.795C68.5607 4.927 68.4067 4.993 68.2234 4.993ZM68.7074 5.972V12H67.7064V5.972H68.7074ZM73.0424 12.099C72.4777 12.099 71.9644 11.9707 71.5024 11.714C71.0477 11.4573 70.6884 11.0943 70.4244 10.625C70.1677 10.1483 70.0394 9.59833 70.0394 8.975C70.0394 8.359 70.1714 7.81633 70.4354 7.347C70.7067 6.87033 71.0734 6.50733 71.5354 6.258C71.9974 6.00133 72.5144 5.873 73.0864 5.873C73.6584 5.873 74.1754 6.00133 74.6374 6.258C75.0994 6.50733 75.4624 6.86667 75.7264 7.336C75.9977 7.80533 76.1334 8.35167 76.1334 8.975C76.1334 9.59833 75.9941 10.1483 75.7154 10.625C75.4441 11.0943 75.0737 11.4573 74.6044 11.714C74.1351 11.9707 73.6144 12.099 73.0424 12.099ZM73.0424 11.219C73.4017 11.219 73.7391 11.1347 74.0544 10.966C74.3697 10.7973 74.6227 10.5443 74.8134 10.207C75.0114 9.86967 75.1104 9.459 75.1104 8.975C75.1104 8.491 75.0151 8.08033 74.8244 7.743C74.6337 7.40567 74.3844 7.15633 74.0764 6.995C73.7684 6.82633 73.4347 6.742 73.0754 6.742C72.7087 6.742 72.3714 6.82633 72.0634 6.995C71.7627 7.15633 71.5207 7.40567 71.3374 7.743C71.1541 8.08033 71.0624 8.491 71.0624 8.975C71.0624 9.46633 71.1504 9.88067 71.3264 10.218C71.5097 10.5553 71.7517 10.8083 72.0524 10.977C72.3531 11.1383 72.6831 11.219 73.0424 11.219ZM80.3865 5.862C81.1199 5.862 81.7139 6.08567 82.1685 6.533C82.6232 6.973 82.8505 7.611 82.8505 8.447V12H81.8605V8.59C81.8605 7.98867 81.7102 7.53033 81.4095 7.215C81.1089 6.89233 80.6982 6.731 80.1775 6.731C79.6495 6.731 79.2279 6.896 78.9125 7.226C78.6045 7.556 78.4505 8.03633 78.4505 8.667V12H77.4495V5.972H78.4505V6.83C78.6485 6.522 78.9162 6.28367 79.2535 6.115C79.5982 5.94633 79.9759 5.862 80.3865 5.862ZM85.5197 10.614L84.2877 13.573H83.6167L84.4197 10.614H85.5197ZM94.318 4.333V5.147H92.228V12H91.227V5.147H89.126V4.333H94.318ZM98.6851 8.172L101.039 12H99.9061L98.0691 9.008L96.3201 12H95.2091L97.5521 8.172L95.1981 4.333H96.3201L98.1681 7.336L99.9281 4.333H101.05L98.6851 8.172Z"
                        fill="black"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Info;
