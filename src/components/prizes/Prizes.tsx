import { StaticImageData } from 'next/image';
import software1 from '../../../public/prizes/software1.png';
import software2 from '../../../public/prizes/software2.png';
import software3 from '../../../public/prizes/software3.png';
import hardware1 from '../../../public/prizes/hardware1.png';
import hardware2 from '../../../public/prizes/hardware2.png';
import hardware3 from '../../../public/prizes/hardware3.png';
import PrizeGrid from './PrizeGrid';
import localFont from 'next/font/local';

const belgiano = localFont({ src: '../../pages/fonts/Belgiano.woff' });

export type Prize = {
    title: string;
    description: string;
    prize: string;
    image?: StaticImageData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const softwarePrizesWithSponsors: Prize[] = [
    {
        title: '1st Place Software',
        description: 'First place software track.',
        prize: 'Prize: Electric Scooter',
        image: software1,
    },
    {
        title: '2nd Place Software',
        description: 'Second place software track.',
        prize: 'Prize: Sony XM4 Headphones',
        image: software2,
    },
    {
        title: '3rd Place Software',
        description: 'Third place software track.',
        prize: 'Prize: 165Hz Monitors',
        image: software3,
    },
    {
        title: 'Best Design',
        description:
            'In the world of hacking and engineering, a product must not only work well, but also provide the best user experience possible. Best hack that demonstrates clear design and usability intentions.',
        prize: 'Prize: KODAK Portable Photo Printer',
    },
    {
        title: 'Best Beginner Software Hack',
        description:
            'Best software hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
    },
    {
        title: 'American Airlines Challenge',
        description: 'More details coming soon!',
        prize: 'Prize: TBA',
    },
    {
        title: 'Toyota Challenge',
        description:
            "Toyota is the leader in making some of the best-selling, fuel efficient and top-quality automobiles in the world. As part of the hackathon, develop a web or mobile solution that helps people to easily shop for Toyota's vehicles by searching, comparing, and finding their dream cars based on several personal preferences including costs to finance and/or lease a vehicle.",
        prize: '1st Place: $500 Amazon Gift Card\n2nd Place: $350 Amazon Gift Card\n3rd Place: $150 Amazon Gift Card',
    },
];

const softwarePrizesWithoutSponsors: Prize[] = [
    {
        title: '1st Place Software',
        description: 'First place software track.',
        prize: 'Prize: Electric Scooter',
        image: software1,
    },
    {
        title: '2nd Place Software',
        description: 'Second place software track.',
        prize: 'Prize: Sony XM4 Headphones',
        image: software2,
    },
    {
        title: '3rd Place Software',
        description: 'Third place software track.',
        prize: 'Prize: 165Hz Monitors',
        image: software3,
    },
    {
        title: 'Best Design',
        description:
            'In the world of hacking and engineering, a product must not only work well, but also provide the best user experience possible. Best hack that demonstrates clear design and usability intentions.',
        prize: 'Prize: KODAK Portable Photo Printer',
    },
    {
        title: 'Best Beginner Software Hack',
        description:
            'Best software hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
    },
    {
        title: 'Sponsor Challenges',
        description: 'More details coming soon!',
        prize: 'Prize: TBA',
    },
];

const hardwarePrizes: Prize[] = [
    {
        title: '1st Place Hardware',
        description: 'First place hardware track.',
        prize: 'Prize: Amazon Smart TV',
        image: hardware1,
    },
    {
        title: '2nd Place Hardware',
        description: 'Second place hardware track.',
        prize: 'Prize: Raspberry Pi 4',
        image: hardware2,
    },
    {
        title: '3rd Place Hardware',
        description: 'Third place hardware track.',
        prize: 'Prize: Drone with Camera',
        image: hardware3,
    },
    {
        title: 'Best Beginner Hardware Hack',
        description:
            'Best hardware hack created by first-time hackers at TAMUhack. (Must have at least 2 first-timers to qualify)',
        prize: 'Prize: Anker Power Bank',
    },
    {
        title: 'Best Medical Hack',
        description:
            'The Best Medical Device Hack is an open-ended challenge aimed at improving or revolutionizing the medical and healthcare fields. Participants can design a new device or enhance an existing one to address real-world medical needs, from patient care to diagnostics. Creativity an impact on the healthcare industry are key.',
        prize: 'Prize: JBL Flip 5',
    },
    {
        title: 'Best IoT Device Hack',
        description:
            'The Best IoT Device Hack challenges participants to innovate within the Internet of Things (IoT) space. Whether designing a new connected device or modifying an existing one, the goal is to enhance everyday experiences or solve pressing challenges through smarter interconnected systems. Projects can span industries from home automation to industrial monitoring, allowing great creativity and flexibility!',
        prize: 'Prize: Portable Monitor',
    },
];

const Prizes = () => {
    return (
        <div className="flex w-full flex-col gap-60 pb-48">
            <div className="flex w-full">
                <PrizeGrid prizes={softwarePrizesWithoutSponsors} />
            </div>
            <div className="flex w-full flex-col items-center gap-8">
                <h2
                    className={`text-5xl text-white sm:text-6xl ${belgiano.className} text-center`}
                >
                    Hardware Prizes
                </h2>
                <p className="text-center font-poppins text-lg text-white sm:text-xl">
                    Participants can choose to compete in the hardware track to
                    be eligible for these prizes.
                </p>
                <PrizeGrid prizes={hardwarePrizes} />
            </div>
        </div>
    );
};

export default Prizes;
