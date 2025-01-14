import Image, { StaticImageData } from 'next/image';
import rainman from '../../../public/rainman.png';
import bigChallenges from '../../../public/prizes_text_1.svg';
import biggerPrizes from '../../../public/prizes_text_2.svg';
import prizesLine from '../../../public/prizes_line.svg';
import PrizeGrid from './PrizeGrid';

export type Prize = {
    title: string;
    description: string;
    prize: string;
    image: StaticImageData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const softwarePrizesWithSponsors: Prize[] = [
    {
        title: '1st Place Software',
        description: 'First place software track.',
        prize: 'Prize: Electric Scooter',
        image: rainman,
    },
    {
        title: '2nd Place Software',
        description: 'Second place software track.',
        prize: 'Prize: Sony XM4 Headphones',
        image: rainman,
    },
    {
        title: '3rd Place Software',
        description: 'Third place software track.',
        prize: 'Prize: 165Hz Monitors',
        image: rainman,
    },
    {
        title: 'Best Design',
        description:
            'In the world of hacking and engineering, a product must not only work well, but also provide the best user experience possible. Best hack that demonstrates clear design and usability intentions.',
        prize: 'Prize: KODAK Portable Photo Printer',
        image: rainman,
    },
    {
        title: 'Best Beginner Software Hack',
        description:
            'Best software hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
        image: rainman,
    },
    {
        title: 'American Airlines Challenge',
        description: 'More details coming soon!',
        prize: 'Prize: TBA',
        image: rainman,
    },
    {
        title: 'Toyota Challenge',
        description:
            "Toyota is the leader in making some of the best-selling, fuel efficient and top-quality automobiles in the world. As part of the hackathon, develop a web or mobile solution that helps people to easily shop for Toyota's vehicles by searching, comparing, and finding their dream cars based on several personal preferences including costs to finance and/or lease a vehicle.",
        prize: '1st Place: $500 Amazon Gift Card\n2nd Place: $350 Amazon Gift Card\n3rd Place: $150 Amazon Gift Card',
        image: rainman,
    },
];

const softwarePrizesWithoutSponsors: Prize[] = [
    {
        title: '1st Place Software',
        description: 'First place software track.',
        prize: 'Prize: Electric Scooter',
        image: rainman,
    },
    {
        title: '2nd Place Software',
        description: 'Second place software track.',
        prize: 'Prize: Sony XM4 Headphones',
        image: rainman,
    },
    {
        title: '3rd Place Software',
        description: 'Third place software track.',
        prize: 'Prize: 165Hz Monitors',
        image: rainman,
    },
    {
        title: 'Best Design',
        description:
            'In the world of hacking and engineering, a product must not only work well, but also provide the best user experience possible. Best hack that demonstrates clear design and usability intentions.',
        prize: 'Prize: KODAK Portable Photo Printer',
        image: rainman,
    },
    {
        title: 'Best Beginner Software Hack',
        description:
            'Best software hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
        image: rainman,
    },
    {
        title: 'Sponsor Challenges',
        description: 'More details coming soon!',
        prize: 'Prize: TBA',
        image: rainman,
    },
];

const hardwarePrizes: Prize[] = [
    {
        title: '1st Place Hardware',
        description: 'First place hardware track.',
        prize: 'Prize: Amazon Smart TV',
        image: rainman,
    },
    {
        title: '2nd Place Hardware',
        description: 'Second place hardware track.',
        prize: 'Prize: Raspberry Pi 4',
        image: rainman,
    },
    {
        title: '3rd Place Hardware',
        description: 'Third place hardware track.',
        prize: 'Prize: Drone with Camera',
        image: rainman,
    },
    {
        title: 'Best Beginner Hardware Hack',
        description:
            'Best hardware hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: Anker Power Bank',
        image: rainman,
    },
    {
        title: 'Best Medical Hack',
        description:
            'The Best Medical Device Hack is an open-ended challenge aimed at improving or revolutionizing the medical and healthcare fields. Participants can design a new device or enhance an existing one to address real-world medical needs, from patient care to diagnostics. Creativity an impact on the healthcare industry are key.',
        prize: 'Prize: JBL Flip 5',
        image: rainman,
    },
    {
        title: 'Best IoT Device Hack',
        description:
            'The Best IoT Device Hack challenges participants to innovate within the Internet of Things (IoT) space. Whether designing a new connected device or modifying an existing one, the goal is to enhance everyday experiences or solve pressing challenges through smarter interconnected systems. Projects can span industries from home automation to industrial monitoring, allowing great creativity and flexibility!',
        prize: 'Prize: Portable Monitor',
        image: rainman,
    },
];

const Prizes = () => {
    return (
        <div className="flex w-full flex-col gap-64 pb-48">
            <div className="relative flex w-full flex-col items-center justify-center">
                <Image src={prizesLine} alt="Prizes" className="w-full" />
                <div className="absolute flex w-full flex-col gap-16">
                    <div className="flex-start flex w-full">
                        <Image
                            src={bigChallenges}
                            alt="Big Challenges"
                            className="w-4/5"
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <Image
                            src={biggerPrizes}
                            alt="Bigger Prizes"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <div className="-mt-96 flex w-full justify-end">
                <PrizeGrid
                    direction="right"
                    prizes={softwarePrizesWithoutSponsors}
                />
            </div>
            <div className="flex w-full justify-start">
                <PrizeGrid direction="left" prizes={hardwarePrizes} />
            </div>
        </div>
    );
};

export default Prizes;
