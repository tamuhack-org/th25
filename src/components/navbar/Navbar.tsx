import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    IconUsers,
} from '@tabler/icons-react';

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [animationDone, setAnimationDone] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        setAnimationDone(true);
    }, []);

    const active = open ? 'active' : '';

    return (
        <>
            {animationDone && (
                <motion.div
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="pointer-events-none fixed bottom-8 z-50 flex w-full select-none justify-center font-poppins"
                >
                    <div className="pointer-events-auto z-50 flex flex-col justify-center overflow-hidden rounded-xl border border-opacity-25 sm:hidden">
                        <div
                            className={`expand-container flex flex-col items-center justify-center gap-[6px] rounded-t-xl bg-black bg-opacity-70 px-[6px] backdrop-blur-sm ${active}`}
                        >
                            <div className="mt-[6px] flex h-full w-full flex-col items-start justify-center gap-8 rounded-lg bg-[#2b2b2b] bg-opacity-70 px-6 text-left text-sm text-white backdrop-blur-sm">
                                <motion.div
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex flex-col justify-between gap-4"
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
                            className={`flex items-center gap-4 rounded-b-xl bg-black bg-opacity-70 p-4 text-white backdrop-blur-sm ${
                                !open
                                    ? 'rounded-t-xl transition-all delay-[200ms]'
                                    : ''
                            }`}
                        >
                            <MobileButton
                                Icon={IconCalendar}
                                link="#schedule"
                                isActive={activeSection === 'schedule'}
                            />
                            <MobileButton
                                Icon={IconTrophy}
                                link="#prizes-section"
                                isActive={activeSection === 'prizes-section'}
                            />
                            <MobileButton
                                Icon={IconUserQuestion}
                                link="#faq"
                                isActive={activeSection === 'faq'}
                            />
                            <button
                                className="rounded-md border border-black bg-black p-1 text-white"
                                onClick={() => setOpen(!open)}
                            >
                                <IconCategory className="h-5 w-5" />
                            </button>
                            <a
                                href="https://register.tamuhack.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md border border-white bg-white p-1 text-black transition-all"
                            >
                                <IconEdit className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div className="pointer-events-auto hidden w-max flex-col justify-center overflow-hidden rounded-xl border border-white border-opacity-25 sm:flex">
                        <div
                            className={`expand-container flex flex-col items-center justify-center gap-[6px] rounded-t-xl bg-black bg-opacity-70 px-[6px] backdrop-blur-sm ${active}`}
                        >
                            <div className="mt-[6px] flex h-full w-full flex-row items-center gap-16 rounded-lg bg-[#2b2b2b] bg-opacity-70 px-6 py-6 text-left text-sm text-white backdrop-blur-sm">
                                <motion.div
                                    animate={{ opacity: open ? 1 : 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="flex h-full flex-col justify-start gap-3"
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
                                    className="flex h-full flex-col justify-start gap-3"
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
                            className={`flex flex-col gap-[6px] rounded-b-xl bg-black bg-opacity-70 p-[6px] backdrop-blur-sm ${
                                !open
                                    ? 'rounded-t-xl transition-all delay-[200ms]'
                                    : ''
                            }`}
                        >
                            <div className="flex items-center">
                                <div className="flex gap-[6px] rounded-lg bg-[#2b2b2b] p-[6px] motion-safe:scroll-smooth">
                                    <NavButton
                                        text="Schedule"
                                        link="#schedule"
                                        isActive={activeSection === 'schedule'}
                                    />
                                    <NavButton
                                        text="Prizes"
                                        link="#prizes-section"
                                        isActive={
                                            activeSection === 'prizes-section'
                                        }
                                    />
                                    <NavButton
                                        text="FAQ"
                                        link="#faq"
                                        isActive={activeSection === 'faq'}
                                    />
                                    <button
                                        className="flex flex-row items-center justify-center gap-2 rounded-lg bg-[#fab7dc] px-5 text-sm font-semibold text-black"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <p>Resources</p>
                                        <span
                                            className={`flip ${open ? 'arrow-open' : 'arrow-close'}`}
                                        >
                                            <IconChevronDown className="h-5 w-5" />
                                        </span>
                                    </button>
                                    <CTANavButton
                                        text="Apply"
                                        link="https://register.tamuhack.com/"
                                    />
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

export default Navbar;
