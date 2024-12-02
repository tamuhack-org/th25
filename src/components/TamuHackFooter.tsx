import localFont from "next/font/local";

const belgiano = localFont({ src: '../pages/fonts/Belgiano.ttf' });

const TamuhackFooter = () => {
    const resources = [
        {
            name: 'Hacker Guide',
            link: 'https://drive.google.com/file/d/1LH0qNhCGSjjXyUuk_xUZzM5xzK8Zxsba/view?usp=sharing',
        },
        {
            name: 'HelpR',
            link: 'https://helpr.tamuhack.org/',
        },
        {
            name: 'Code of Conduct',
            link: 'https://static.mlh.io/docs/mlh-code-of-conduct.pdf',
        },
        {
            name: 'Misconduct Reporting',
            link: 'https://tamuhack.org/misconduct',
        },
        {
            name: 'Team Formation',
            link: 'https://tamuhack.org/team-formation',
        },
        {
            name: 'Devpost',
            link: 'https://thx.devpost.com',
        },
    ];

    const socials = [
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/tamuhack',
        },
        {
            name: 'TikTok',
            link: 'https://www.tiktok.com/@tamuhack',
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/company/tamuhack',
        },
        {
            name: 'Discord',
            link: 'https://discord.gg/VZyKP4JcC3',
        },
    ];

    const otherHackathons = [
        {
            name: 'TAMU Datathon',
            link: 'https://tamudatathon.com/',
        },
        {
            name: 'HackTX',
            link: 'https://hacktx.com/',
        },
        {
            name: 'HackUTD',
            link: 'https://hackutd.co/',
        },
        {
            name: 'HackUNT',
            link: 'https://www.unthackathon.com/',
        },
        {
            name: 'RowdyHacks',
            link: 'https://rowdyhacks.org/',
        },
        {
            name: 'HackRice',
            link: 'https://www.hackrice.com/',
        },
    ];

    const workshops = [
        {
            name: 'Intro to Git',
            link: 'https://docs.google.com/presentation/d/17tD4eOPL54v6YPEZE57gkOrtEo9LA_r4U0bAOBRGRSo/edit?usp=sharing',
        },
        {
            name: 'Intro to Web Dev',
            link: 'https://docs.google.com/presentation/d/16moIOAhsbH5qlyeWv0xfH73XT_hk0TJ-b6xct3njT5U/edit?usp=sharing',
        },
        {
            name: 'Intro to Hardware',
            link: 'https://docs.google.com/presentation/d/1PGyzuwHUsFabeBiMDdyGySel6rtKnuKERMko81i1Lb0/edit?usp=sharing',
        },
    ];

    //TODO: Might want to chaneg this to be a h3, depending on hierarchy
    const LinkSection = ({
        title,
        items,
    }: {
        title: string;
        items: { name: string; link: string }[];
    }) => (
        <div role="region" aria-label={title} className="font-poppins">
            <h2 className="mb-2 text-base font-light">{title}</h2>
            <nav aria-label={`${title} navigation`}>
                <ul className="list-none p-0">
                    {items.map((item, index) => (
                        <li key={index} className="mb-2">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="rounded text-lg font-medium transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`${item.name} (opens in new tab)`}
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

    return (
        <>
            <footer className="items-center lg:flex lg:justify-between font-poppins">
                <div className="text-center opacity-90 lg:text-start">
                    <p className="font-poppins mb-0 text-2xl font-semibold">
                        Sign up to our newsletter
                    </p>
                    <p className="font-poppins font-light">
                        Stay connected! Sign up for our mailing list for events,
                        updates, and more.
                    </p>
                </div>
                <form
                    action="https://tamuhack.us9.list-manage.com/subscribe/post?u=ba74e26a78411ab40af6384c5&amp;id=2f4969eb6d"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                    noValidate
                    className="flex flex-col items-center justify-start gap-2 lg:flex-row lg:items-stretch"
                >
                    <div className="flex w-full flex-row items-stretch justify-center gap-3 py-4 max-[320px]:flex-col max-[320px]:justify-stretch lg:flex-none lg:gap-5">
                        <label htmlFor="mce-EMAIL" className="hidden">
                            Email Address
                        </label>
                        <input
                            type="text"
                            name="EMAIL"
                            placeholder="Enter your email address"
                            className="w-64 rounded-lg border bg-[rgba(217,217,217,0.09)] px-4 py-2 2xl:w-96 border-black"
                            id="mce-EMAIL"
                        />
                        <button className="clear">
                            <input
                                type="submit"
                                value="Subscribe"
                                name="subscribe"
                                id="mc-embedded-subscribe"
                                className="h-full cursor-pointer rounded-lg border border-black px-4 py-2 text-base font-bold transition-colors duration-200 hover:bg-[#e3b8dd] hover:text-[#1b0000]"
                            />
                        </button>
                    </div>
                    <div aria-hidden="true" className="absolute -left-[5000px]">
                        <input
                            type="text"
                            name="b_43a795784ca963e25903a0da6_9937fe4fc5"
                            tabIndex={-1}
                            defaultValue=""
                        />
                    </div>
                </form>
            </footer>

            <div className="text-dark my-8 justify-between opacity-90 lg:my-16 lg:flex">
                <div className="lg:w-1/5">
                    <p className={`mb-8 text-3xl font-semibold ${belgiano.className}`}>
                        TAMUhack 2025
                    </p>
                    <p className="font-poppins font-base mb-8 text-xl">
                        This site is under construction. Please check back later!
                    </p>
                </div>
                <div className="flex flex-grow flex-wrap justify-start gap-12 lg:justify-end">
                    <LinkSection title="Hacker Resources" items={resources} />
                    <LinkSection title="Socials" items={socials} />
                    <LinkSection
                        title="Other Hackathons"
                        items={otherHackathons}
                    />
                    <LinkSection title="Workshops" items={workshops} />
                </div>
            </div>

            <footer className="bottom-0 font-poppins">
                <div className="bg-dark mx-8 h-[3px] rounded-xl bg-opacity-5" />
                <p className="text-dark mx-8 py-3 text-sm font-light">
                    Interested in sponsoring? Reach out to us at{' '}
                    <a className="underline" href="mailto:sponsor@tamuhack.com">
                        sponsor@tamuhack.com
                    </a>
                    .
                </p>
            </footer>
        </>
    );
};

export default TamuhackFooter;
