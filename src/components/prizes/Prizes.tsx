import Image, { StaticImageData } from 'next/image';
import software1 from '../../../public/prizes/software1.png';
import software2 from '../../../public/prizes/software2.png';
import software3 from '../../../public/prizes/software3.png';
import hardware1 from '../../../public/prizes/hardware1.png';
import hardware2 from '../../../public/prizes/hardware2.png';
import hardware3 from '../../../public/prizes/hardware3.png';
import PrizeGrid from './PrizeGrid';
import localFont from 'next/font/local';
import bigBubble from '../../../public/big_bubble.png';
import medBubble from '../../../public/med_bubble.png';

const belgiano = localFont({ src: '../../pages/fonts/Belgiano.woff' });

export type Prize = {
    title: string;
    description: string;
    prize: string;
    image?: StaticImageData;
    references?: {
        title: string;
        url: string;
    }[];
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
            'Best software hack created by first-time hackers. (Must have at least 2 first-timers at a hackathon to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
    },
    {
        title: 'American Airlines Challenge',
        description:
            'Create a solution for the airline industry, be it passenger experience, employee experience, or operational efficiencies',
        prize: '1st Place: AAdvantage 75k miles\n2nd Place: AAdvantage 50k miles\n3rd Place: AAdvantage 25k miles',
    },
    {
        title: 'Arize AI Challenge',
        description:
            'Build your own GenAI application and evaluate it in Arize Phoenix. It can be anything application you find fun, quirky or even useful.',
        prize: 'Prize: $100 Amazon Gift Card',
        references: [
            {
                title: 'Challenge Details and Resources',
                url: 'https://dented-spinach-319.notion.site/tamuhack-arize-ai-181e2cab7d238029b2bcd26428a04c1b',
            },
        ],
    },
    {
        title: 'ARM Challenge',
        description:
            'Develop a solution to improve disaster preparedness, response, or post-event analysis, leveraging the power of the Arm GitHub Copilot Extension. Examples include water usage monitoring, drought prediction dashboards, communication apps for response teams, or damage assessments. Submissions using Arm technology, such as a Raspberry Pi or Arm-based server, will be given preference.\n\nNote: This challenge can include both software and hardware components.',
        prize: '1st Place: Sony Noise-cancelling Wireless Headphones\n2nd Place: Arm Developer Program Swag Bundle',
    },
    {
        title: 'AWS Challenge',
        description:
            'Create an innovative solution that leverages AI/ML to address a real-world challenge in one of the following industries:\n\nHealthcare: Use AI to develop a solution to improve patient care, streamline administrative processes, or advance medical research\n\nSustainability: Use AI to develop a solution to enhance energy efficiency, reduce waste, or optimize resource management.\n\nEducation: Use AI to develop a solution to personalize learning experiences, improve accessibility, or enhance skill development.\n\nBonus points for utilizing AWS services such as Amazon Bedrock, Amazon Rekognition, Amazon Polly, or AWS IoT for a broader impact.',
        prize: '1st Place: $75 Amazon Gift Card\n2nd Place: $50 Amazon Gift Card\n3rd Place: $25 Amazon Gift Card',
    },
    {
        title: 'Capital One Challenge',
        description:
            "Best Financial Hack - Capital One's track challenges hackers to develop the Best Financial Hack. Participants will harness their creativity and technical skills to design and innovate tools that will help with anything related to finance.",
        prize: 'Prize: $250 Amazon Gift Card',
    },
    {
        title: 'PIMCO Challenge',
        description: "Develop a hack that promotes good financial behavior, participants should focus on specific financial goals tailored to students or young professionals. Incorporating gamification elements, like rewards systems and peer challenges, can make the process engaging and motivating. Whether you choose to focus on saving, investing, building credit, financial literacy, or anything else you dream up, from our perspective, when you combine finance with technology, the sky's the limit.",
        prize: '1st Place: $80 Amazon Gift Card\n2nd Place: $40 Amazon Gift Card',
    },
    {
        title: 'Toyota Challenge',
        description:
            "Toyota is the leader in making some of the best-selling, fuel efficient and top-quality automobiles in the world. As part of the hackathon, develop a web or mobile solution that helps people to easily shop for Toyota's vehicles by searching, comparing, and finding their dream cars based on several personal preferences including costs to finance and/or lease a vehicle.",
        prize: '1st Place: $500 Amazon Gift Card\n2nd Place: $350 Amazon Gift Card\n3rd Place: $150 Amazon Gift Card',
    },
    {
        title: 'USAA Challenge',
        description:
            'As it pertains to financial services, utilize a Generative AI (or any other model of your choosing) and transform the output you receive in a novel and interesting way prior to returning it to the end user Bonus points for incorporating AI agents, anomaly detection, natural language understanding, or predictive analytics.',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            'Best software hack created by first-time hackers. (Must have at least 2 first-timers at a hackathon to qualify)',
        prize: 'Prize: JBL Clip 5 Bluetooth Speaker',
    },
    {
        title: 'Sponsor Challenges',
        description: 'More details coming soon!',
        prize: 'Prize: TBA',
    },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            'Best hardware hack created by first-time hackers. (Must have at least 2 first-timers at a hackathon to qualify)',
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
    {
        title: 'ARM Challenge',
        description:
            'Develop a solution to improve disaster preparedness, response, or post-event analysis, leveraging the power of the Arm GitHub Copilot Extension. Examples include water usage monitoring, drought prediction dashboards, communication apps for response teams, or damage assessments. Submissions using Arm technology, such as a Raspberry Pi or Arm-based server, will be given preference.\n\nNote: This challenge can include both software and hardware components.',
        prize: '1st Place: Sony Noise-cancelling Wireless Headphones\n2nd Place: Arm Developer Program Swag Bundle',
    },
];

const Prizes = () => {
    return (
        <div className="flex w-full flex-col gap-60 pb-12 sm:pb-48">
            <div className="flex w-full">
                <div className="relative w-full">
                    <Image
                        src={medBubble}
                        alt="Medium bubble"
                        className="absolute left-6 top-6 z-10 w-8 rotate-12 opacity-85 sm:w-12"
                    />
                    <Image
                        src={bigBubble}
                        alt="Big bubble"
                        className="absolute bottom-6 right-6 z-20 w-16 rotate-45 opacity-85 sm:w-24"
                    />
                    <PrizeGrid prizes={softwarePrizesWithSponsors} />
                </div>
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
                <div className="relative w-full">
                    <Image
                        src={medBubble}
                        alt="Medium bubble"
                        className="absolute left-6 top-6 z-10 w-8 -rotate-12 opacity-85 sm:w-12"
                    />
                    <Image
                        src={bigBubble}
                        alt="Big bubble"
                        className="absolute bottom-6 right-6 z-20 w-12 -rotate-45 opacity-85 sm:w-16"
                    />
                    <PrizeGrid prizes={hardwarePrizes} />
                </div>
            </div>
        </div>
    );
};

export default Prizes;
