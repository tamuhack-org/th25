import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CTANavButton from './CTANavButton';
import NavButton from './NavButton';
import ResourceButton from './ResourceButton';
import MobileButton from './MobileButton';
import {
    IconBrandDiscord,
    IconBrandSpotify,
    IconChevronDown,
    IconHelp,
    IconLicense,
    IconNotebook,
    IconScale,
    IconEdit,
    IconCalendar,
    IconUserQuestion,
    IconTrophy,
    IconCategory,
    IconBrandGit,
    IconWorld,
    IconCpu,
    IconExclamationCircle,
    IconUsers
} from '@tabler/icons-react'


const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        setAnimationDone(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    } else if (activeSection === entry.target.id) {
                        setActiveSection('')
                    }
                });
            },
            { threshold: [0, 1] }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const active = open ? 'active' : '';

    return (
        <>
            {animationDone && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex w-full justify-center fixed bottom-8 font-poppins select-none
                    z-50 pointer-events-none"
                >
                    <div
                        className="flex flex-col sm:hidden justify-center z-50 pointer-events-auto
                        border border-opacity-25 rounded-xl overflow-hidden"
                    >
                        <div
                            className={`flex flex-col items-center justify-center gap-[6px] bg-black
                            bg-opacity-70 backdrop-blur-sm rounded-t-xl expand-container px-[6px] ${active}`}
                        >
                            <div
                                className="flex flex-col justify-center items-start mt-[6px] bg-[#2b2b2b]
                                bg-opacity-70 px-6 backdrop-blur-sm rounded-lg w-full h-full text-white text-sm
                                text-left gap-8"
                            >
                                <motion.div
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex flex-col gap-4 justify-between"
                                >
                                    <ResourceButton
                                        text="Hacker Guide"
                                        link="https://drive.google.com/file/d/1LH0qNhCGSjjXyUuk_xUZzM5xzK8Zxsba/view?usp=sharing"
                                        Icon={IconNotebook}
                                    />
                                    <ResourceButton
                                        text="Discord"
                                        link="https://discord.gg/RyyVcm4gFJ"
                                        Icon={IconBrandDiscord}
                                    />
                                    <ResourceButton
                                        text="Devpost"
                                        link="https://thx.devpost.com"
                                        Icon={IconScale}
                                    />
                                    <ResourceButton
                                        text="HelpR"
                                        link="https://helpr.tamuhack.org"
                                        Icon={IconHelp}
                                    />
                                    <ResourceButton
                                        text="Code of Conduct"
                                        link="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*19bpx84*_ga*NDgxNjY1Mzk0LjE3MDIxODA5Njk.*_ga_E5KT6TC4TK*MTcwMjcwNzc3NC40LjAuMTcwMjcwNzc3NC4wLjAuMA.."
                                        Icon={IconLicense}
                                    />
                                    <ResourceButton
                                        text="Intro to Git"
                                        link="https://docs.google.com/presentation/d/17tD4eOPL54v6YPEZE57gkOrtEo9LA_r4U0bAOBRGRSo/edit?usp=sharing"
                                        Icon={IconBrandGit}
                                    />
                                    <ResourceButton
                                        text="Intro to Web Dev"
                                        link="https://docs.google.com/presentation/d/16moIOAhsbH5qlyeWv0xfH73XT_hk0TJ-b6xct3njT5U/edit?usp=sharing"
                                        Icon={IconWorld}
                                    />
                                    <ResourceButton
                                        text="Intro to Hardware"
                                        link="https://docs.google.com/presentation/d/1PGyzuwHUsFabeBiMDdyGySel6rtKnuKERMko81i1Lb0/edit?usp=sharing"
                                        Icon={IconCpu}
                                    />
                                    <ResourceButton
                                        text="Misconduct Reporting"
                                        link="http://tamuhack.org/misconduct"
                                        Icon={IconExclamationCircle}
                                    />
                                    <ResourceButton
                                        text="Team Formation"
                                        link="https://tamuhack.org/team-formation"
                                        Icon={IconUsers}
                                    />
                                </motion.div>
                            </div>
                        </div>
                        <div
                            className={`flex items-center gap-4 rounded-b-xl bg-black bg-opacity-70
                            backdrop-blur-sm p-4 text-white ${!open
                                    ? 'rounded-t-xl transition-all delay-[200ms]'
                                    : ''}`}
                        >
                            <MobileButton Icon={IconCalendar} link="#schedule" isActive={activeSection === 'schedule'} />
                            <MobileButton Icon={IconTrophy} link="#prizes-section" isActive={activeSection === 'prizes-section'} />
                            <MobileButton Icon={IconUserQuestion} link="#faq" isActive={activeSection === 'faq'} />
                            <button
                                className="p-1 bg-black rounded-md text-white border border-black"
                                onClick={() => setOpen(!open)}
                            >
                                <IconCategory className="w-5 h-5" />
                            </button>
                            <a
                                href='https://register.tamuhack.com/'
                                className='p-1 rounded-md transition-all bg-white text-black border border-white'
                            >
                                <IconEdit className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="hidden sm:flex flex-col justify-center w-max pointer-events-auto
                        border border-white border-opacity-25 rounded-xl overflow-hidden"
                    >
                        <div
                            className={`flex flex-col items-center justify-center gap-[6px] bg-black
                bg-opacity-70 backdrop-blur-sm rounded-t-xl expand-container px-[6px] ${active}`}
                        >
                            <div
                                className="flex flex-row items-center bg-[#2b2b2b] mt-[6px] bg-opacity-70 px-6
                    py-6 backdrop-blur-sm rounded-lg w-full h-full text-white text-sm text-left
                    gap-16"
                            >
                                <motion.div
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex flex-col gap-3 justify-start h-full"
                                >
                                    <ResourceButton
                                        text="Hacker Guide"
                                        link="https://drive.google.com/file/d/1LH0qNhCGSjjXyUuk_xUZzM5xzK8Zxsba/view?usp=sharing"
                                        Icon={IconNotebook}
                                    />
                                    <ResourceButton
                                        text="Discord"
                                        link="https://discord.gg/RyyVcm4gFJ"
                                        Icon={IconBrandDiscord}
                                    />
                                    <ResourceButton
                                        text="Intro to Git"
                                        link="https://docs.google.com/presentation/d/17tD4eOPL54v6YPEZE57gkOrtEo9LA_r4U0bAOBRGRSo/edit?usp=sharing"
                                        Icon={IconBrandGit}
                                    />
                                    <ResourceButton
                                        text="Intro to Hardware"
                                        link="https://docs.google.com/presentation/d/1PGyzuwHUsFabeBiMDdyGySel6rtKnuKERMko81i1Lb0/edit?usp=sharing"
                                        Icon={IconCpu}
                                    />
                                    <ResourceButton
                                        text="Team Formation"
                                        link="https://tamuhack.org/team-formation"
                                        Icon={IconUsers}
                                    />
                                </motion.div>
                                <motion.div
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex flex-col gap-3 justify-start h-full"
                                >
                                    <ResourceButton
                                        text="Devpost"
                                        link="https://thx.devpost.com"
                                        Icon={IconScale}
                                    />
                                    <ResourceButton
                                        text="HelpR"
                                        link="https://helpr.tamuhack.org"
                                        Icon={IconHelp}
                                    />
                                    <ResourceButton
                                        text="Code of Conduct"
                                        link="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*19bpx84*_ga*NDgxNjY1Mzk0LjE3MDIxODA5Njk.*_ga_E5KT6TC4TK*MTcwMjcwNzc3NC40LjAuMTcwMjcwNzc3NC4wLjAuMA.."
                                        Icon={IconLicense}
                                    />
                                    <ResourceButton
                                        text="Intro to Web Dev"
                                        link="https://docs.google.com/presentation/d/16moIOAhsbH5qlyeWv0xfH73XT_hk0TJ-b6xct3njT5U/edit?usp=sharing"
                                        Icon={IconWorld}
                                    />

                                    <ResourceButton
                                        text="Misconduct Reporting"
                                        link="http://tamuhack.org/misconduct"
                                        Icon={IconExclamationCircle}
                                    />
                                </motion.div>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col bg-black bg-opacity-70 backdrop-blur-sm p-[6px]
                                    gap-[6px] rounded-b-xl ${!open
                                    ? 'rounded-t-xl transition-all delay-[200ms]'
                                    : ''}`}
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex p-[6px] gap-[6px] bg-[#2b2b2b] rounded-lg motion-safe:scroll-smooth"
                                >
                                    <NavButton text="Schedule" link="#schedule" isActive={activeSection === 'schedule'} />
                                    <NavButton text="Prizes" link="#prizes-section" isActive={activeSection === 'prizes-section'} />
                                    <NavButton text="FAQ" link="#faq" isActive={activeSection === 'faq'} />
                                    <button
                                        className="flex flex-row justify-center items-center 
                                        px-5 rounded-lg bg-[#fab7dc] text-black
                                        font-semibold text-sm gap-2"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <p>Resources</p>
                                        <span className={`flip ${open ? 'arrow-open' : 'arrow-close'}`}>
                                            <IconChevronDown className="w-5 h-5" />
                                        </span>
                                    </button>
                                    <CTANavButton text="Apply" link="https://register.tamuhack.com/" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <style jsx>{`
                .expand-container {
                    position: relative;
                    overflow: hidden;
                    height: 0px;
                    transition: height 0.25s ease;
                    text-align: center;
                }

                .expand-container.active {
                    height: 200px;
                }

                @media (max-width: 640px) {
                    .expand-container.active {
                        height: 400px;
                    }
                }

                .arrow-close {
                    animation: flip-icon 0.25s ease-in-out;
                    transform: rotateX(180deg);
                }

                .arrow-open {
                    animation: flip-icon-close 0.25s ease-in-out;
                    transform: rotateX(0deg);
                }

                @keyframes flip-icon {
                    0% {
                        transform: rotateX(0deg);
                    }
                    100% {
                        transform: rotateX(180deg);
                    }
                }

                @keyframes flip-icon-close {
                    0% {
                        transform: rotateX(180deg);
                    }
                    100% {
                        transform: rotateX(0deg);
                    }
                }    
            `}</style>
        </>
    );
};

export default Navbar
