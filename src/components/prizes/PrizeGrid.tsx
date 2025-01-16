import localFont from 'next/font/local';
import Image from 'next/image';
import { Prize } from './Prizes';

const swily = localFont({ src: '../../pages/fonts/SwilyBright.otf' });

interface PrizeGridProps {
    prizes: Prize[];
}

const PrizeGrid = ({ prizes }: PrizeGridProps) => {
    return (
        <div
            className="grid w-full grid-cols-4 gap-4 border border-white bg-[rgb(255,255,255,0.05)] p-4 rounded-lg"
            style={{ backdropFilter: 'blur(10px)' }}
        >
            <div className="col-span-4 flex flex-col items-center gap-4 border-8 border-white bg-white rounded-md font-poppins sm:flex-row p-1 xl:hover:-translate-y-1 xl:hover:translate-x-1 xl:hover:shadow-md transition-all">
                <div className={`flex flex-col items-center w-full gap-4 border-16 bg-[#F5BFE4] rounded-md p-4 font-poppins sm:flex-row sm:p-8`}>
                    {prizes[0].image && (
                        <Image
                            src={prizes[0].image}
                            alt={prizes[0].prize}
                            className="max-w-48"
                        />
                    )}
                    <div className="flex w-full flex-col justify-center gap-2">
                        <h2
                            className={`${swily.className} text-4xl font-semibold sm:text-5xl lg:text-6xl xl:text-8xl`}
                        >
                            {prizes[0].title}
                        </h2>
                        <p className="sm:text-lg md:text-2xl">
                            {prizes[0].description}
                        </p>
                        <p className="font-semibold md:text-lg">
                            {prizes[0].prize}
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-span-4 flex flex-col items-center gap-4 bg-[#CCE9FF] rounded-md p-4 font-poppins sm:flex-row md:col-span-2 xl:hover:-translate-y-1 xl:hover:translate-x-1 xl:hover:shadow-md transition-all">
                {prizes[1].image && (
                    <Image
                        src={prizes[1].image}
                        alt={prizes[1].prize}
                        className="max-w-32"
                    />
                )}
                <div className="flex w-full flex-col justify-center gap-2">
                    <h2
                        className={`${swily.className} text-3xl font-semibold sm:text-4xl lg:text-5xl`}
                    >
                        {prizes[1].title}
                    </h2>
                    <p className="md:text-lg">{prizes[1].description}</p>
                    <p className="font-medium">{prizes[1].prize}</p>
                </div>
            </div>
            <div className="col-span-4 flex flex-col items-center gap-4 bg-[#CCE9FF] rounded-md p-4 font-poppins sm:flex-row md:col-span-2 xl:hover:-translate-y-1 xl:hover:translate-x-1 xl:hover:shadow-md transition-all">
                {prizes[2].image && (
                    <Image
                        src={prizes[2].image}
                        alt={prizes[2].prize}
                        className="max-w-32"
                    />
                )}
                <div className="flex w-full flex-col justify-center gap-2">
                    <h2
                        className={`${swily.className} text-3xl font-semibold sm:text-4xl lg:text-5xl`}
                    >
                        {prizes[2].title}
                    </h2>
                    <p className="md:text-lg">{prizes[2].description}</p>
                    <p className="font-medium">{prizes[2].prize}</p>
                </div>
            </div>
            <div className="col-span-4">
                <div className="col-span-3 grid w-full grid-cols-3 gap-4 font-poppins">
                    {prizes.slice(3).map((prize, i) => (
                        <div
                            className="col-span-3 flex flex-col items-center gap-4 bg-white rounded-md p-4 font-poppins sm:flex-row md:col-span-1 md:flex-col xl:hover:-translate-y-1 xl:hover:translate-x-1 xl:hover:shadow-md transition-all"
                            key={i}
                        >
                            {prize.image && (
                                <Image
                                    src={prize.image}
                                    alt={prize.prize}
                                    className="max-w-32"
                                />
                            )}
                            <div className="flex h-full w-full flex-col justify-between gap-6">
                                <div className="flex flex-col justify-start gap-2">
                                    <h2
                                        className={`${swily.className} text-2xl font-semibold sm:text-3xl lg:text-4xl`}
                                    >
                                        {prize.title}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        {prize.description}
                                    </p>
                                </div>
                                <p className="whitespace-pre-wrap font-medium">
                                    {prize.prize}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrizeGrid;
