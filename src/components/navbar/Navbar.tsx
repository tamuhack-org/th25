import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import CTANavButton from './CTANavButton';
import NavButton from './NavButton';
import ResourceButton from './ResourceButton';
import MobileButton from './MobileButton';
import {
    IconBrandDiscord,
    IconChevronUp,
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
    IconDeviceIpadCog,
    IconDeviceDesktop,
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const navbarRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef(null);
    const active = open ? 'active' : '';

    const { contextSafe } = useGSAP(() => {
        gsap.set(arrowRef.current, { rotationX: 0 });
        gsap.set('.resources', { autoAlpha: 0 });

        gsap.to(navbarRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
        });

        const sections = ['schedule', 'prizes', 'faq'];

        sections.forEach((section) => {
            ScrollTrigger.create({
                trigger: `#${section}`,
                start: 'top bottom',
                end: 'bottom bottom',
                onEnter: () => setActiveSection(section),
                onEnterBack: () => setActiveSection(section),
                onLeave: () => setActiveSection(''),
                onLeaveBack: () => setActiveSection(''),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const toggleExpand = contextSafe(() => {
        setOpen(!open);
        gsap.to(arrowRef.current, {
            rotationX: open ? 0 : 180,
            duration: 0.25,
            ease: 'power2.inOut',
        });
        gsap.to('.resources', {
            autoAlpha: open ? 0 : 1,
            duration: 0.15,
            ease: 'power2.out',
        });
    });

    return (
        <>
            <div
                ref={navbarRef}
                className="pointer-events-none fixed bottom-8 z-50 flex w-full translate-y-12 select-none justify-center font-poppins opacity-0"
            >
                <div className="pointer-events-auto z-50 flex flex-col justify-center overflow-hidden rounded-xl border border-opacity-25 sm:hidden">
                    <div
                        className={`expand-container flex h-0 flex-col items-center justify-center gap-[6px] rounded-t-xl bg-black bg-opacity-70 px-[6px] backdrop-blur-sm ${active}`}
                    >
                        <div className="mt-[6px] flex h-full w-full flex-col items-start justify-center gap-8 rounded-lg bg-[#2b2b2b] bg-opacity-70 px-6 text-left text-sm text-white backdrop-blur-sm">
                            <div className="resources flex flex-col justify-between gap-4">
                                <ResourceButton
                                    text="Software Hacker Guide"
                                    link="/starter_guide.png"
                                    Icon={IconNotebook}
                                />
                                <ResourceButton
                                    text="Hardware Hacker Guide"
                                    link="/hardware_starter_guide.png"
                                    Icon={IconDeviceIpadCog}
                                />
                                <ResourceButton
                                    text="Discord"
                                    link="https://tamuhack.org/discord"
                                    Icon={IconBrandDiscord}
                                />
                                <ResourceButton
                                    text="Devpost"
                                    link="https://tamuhack.org/devpost"
                                    Icon={IconScale}
                                />
                                <ResourceButton
                                    text="HelpR"
                                    link="https://tamuhack.org/help"
                                    Icon={IconHelp}
                                />
                                <ResourceButton
                                    text="Team Formation"
                                    link="https://tamuhack.org/team-formation"
                                    Icon={IconUsers}
                                />
                                <ResourceButton
                                    text="Intro to Hackathons"
                                    link="https://docs.google.com/presentation/d/1r142lnKlA043jyYcFnjSFebxcm52usJ9MIVpLyUWQI4/edit?usp=sharing"
                                    Icon={IconDeviceDesktop}
                                />
                                <ResourceButton
                                    text="Intro to Git"
                                    link="https://tamuhack.org/git"
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
                                    text="Code of Conduct"
                                    link="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*19bpx84*_ga*NDgxNjY1Mzk0LjE3MDIxODA5Njk.*_ga_E5KT6TC4TK*MTcwMjcwNzc3NC40LjAuMTcwMjcwNzc3NC4wLjAuMA.."
                                    Icon={IconLicense}
                                />
                            </div>
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
                            link="#prizes"
                            isActive={activeSection === 'prizes'}
                        />
                        <MobileButton
                            Icon={IconUserQuestion}
                            link="#faq"
                            isActive={activeSection === 'faq'}
                        />
                        <button
                            className="rounded-md border border-[#fab7dc] bg-[#fab7dc] p-1 text-black"
                            onClick={toggleExpand}
                        >
                            <IconCategory className="h-5 w-5" />
                        </button>
                        <a
                            href="https://register.tamuhack.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-[#CCE9FF] bg-[#CCE9FF] p-1 text-black transition-all"
                        >
                            <IconEdit className="h-5 w-5" />
                        </a>
                    </div>
                </div>
                <div className="pointer-events-auto hidden w-max flex-col justify-center overflow-hidden rounded-xl border border-white border-opacity-25 sm:flex">
                    <div
                        className={`expand-container flex h-0 flex-col items-center justify-center gap-[6px] rounded-t-xl bg-black bg-opacity-70 px-[6px] backdrop-blur-sm ${active}`}
                    >
                        <div className="mt-[6px] flex h-full w-full flex-row items-center gap-16 rounded-lg bg-[#2b2b2b] bg-opacity-70 px-6 py-6 text-left text-sm text-white backdrop-blur-sm">
                            <div className="resources flex h-full flex-col justify-start gap-3">
                                <ResourceButton
                                    text="Software Hacker Guide"
                                    link="https://tamuhack.org/guide"
                                    Icon={IconNotebook}
                                />
                                <ResourceButton
                                    text="Discord"
                                    link="https://tamuhack.org/discord"
                                    Icon={IconBrandDiscord}
                                />
                                <ResourceButton
                                    text="HelpR"
                                    link="https://tamuhack.org/help"
                                    Icon={IconHelp}
                                />
                                <ResourceButton
                                    text="Intro to Hackathons"
                                    link="https://docs.google.com/presentation/d/1r142lnKlA043jyYcFnjSFebxcm52usJ9MIVpLyUWQI4/edit?usp=sharing"
                                    Icon={IconDeviceDesktop}
                                />
                                <ResourceButton
                                    text="Intro to Git"
                                    link="https://tamuhack.org/git"
                                    Icon={IconBrandGit}
                                />
                                <ResourceButton
                                    text="Misconduct Reporting"
                                    link="http://tamuhack.org/misconduct"
                                    Icon={IconExclamationCircle}
                                />
                            </div>
                            <div className="resources flex h-full flex-col justify-start gap-3">
                                <ResourceButton
                                    text="Hardware Hacker Guide"
                                    link="https://drive.google.com/file/d/1dbUNP6fdD9rV7lx8Smzf0GGQQsWfuzmV/view?usp=sharing"
                                    Icon={IconDeviceIpadCog}
                                />
                                <ResourceButton
                                    text="Devpost"
                                    link="https://tamuhack.org/devpost"
                                    Icon={IconScale}
                                />
                                <ResourceButton
                                    text="Team Formation"
                                    link="https://tamuhack.org/team-formation"
                                    Icon={IconUsers}
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
                                    text="Code of Conduct"
                                    link="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*19bpx84*_ga*NDgxNjY1Mzk0LjE3MDIxODA5Njk.*_ga_E5KT6TC4TK*MTcwMjcwNzc3NC40LjAuMTcwMjcwNzc3NC4wLjAuMA.."
                                    Icon={IconLicense}
                                />
                            </div>
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
                                    link="#prizes"
                                    isActive={activeSection === 'prizes'}
                                />
                                <NavButton
                                    text="FAQ"
                                    link="#faq"
                                    isActive={activeSection === 'faq'}
                                />
                                <button
                                    className="flex flex-row items-center justify-center gap-2 rounded-lg bg-[#fab7dc] px-5 text-sm font-semibold text-black"
                                    onClick={toggleExpand}
                                >
                                    <p>Resources</p>
                                    <span ref={arrowRef}>
                                        <IconChevronUp className="h-5 w-5" />
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
            </div>

            <style jsx>{`
                .expand-container {
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    transition: height 0.25s ease-out;
                }

                @media (max-width: 640px) {
                    .expand-container.active {
                        height: 460px;
                    }
                }

                @media (min-width: 641px) {
                    .expand-container.active {
                        height: 230px;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;
