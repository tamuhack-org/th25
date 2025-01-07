import localFont from "next/font/local";
import Image from "next/image";
import { Prize } from "./Prizes";

const swily = localFont({ src: '../../pages/fonts/SwilyBright.otf' });

interface PrizeGridProps {
  direction: 'left' | 'right';
  prizes: Prize[];
}

const PrizeGrid = ({ direction, prizes }: PrizeGridProps) => {
  return (
    <div className={`bg-[rgb(255,255,255,0.15)] border border-white p-4 grid grid-cols-4 gap-4 w-full ${direction === 'right' ? 'xl:-skew-x-3 xl:-skew-y-3 xl:-rotate-3 xl:-mr-16' : 'xl:skew-x-3 xl:skew-y-3 xl:rotate-3 xl:-ml-16'}`} style={{ backdropFilter: 'blur(10px)' }}>
      <div className="col-span-4 bg-[#F5BFE4] p-4 sm:p-8 flex flex-col sm:flex-row items-center gap-4 font-poppins">
        <Image src={prizes[0].image} alt={prizes[0].prize} className="max-w-48" />
        <div className="flex flex-col gap-2 justify-center w-full">
          <h2 className={`${swily.className} font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-8xl`}>{prizes[0].title}</h2>
          <p className="sm:text-lg md:text-2xl">{prizes[0].description}</p>
          <p className="md:text-lg font-semibold">{prizes[0].prize}</p>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 bg-[#CCE9FF] p-4 flex flex-col sm:flex-row items-center gap-4 font-poppins">
        <Image src={prizes[1].image} alt={prizes[1].prize} className="max-w-32" />
        <div className="flex flex-col gap-2 justify-center w-full">
          <h2 className={`${swily.className} font-semibold text-3xl sm:text-4xl lg:text-5xl`}>{prizes[1].title}</h2>
          <p className="md:text-lg">{prizes[1].description}</p>
          <p className="font-medium">{prizes[1].prize}</p>
        </div>
      </div>
      <div className="col-span-4 md:col-span-2 bg-[#CCE9FF] p-4 flex flex-col sm:flex-row items-center gap-4 font-poppins">
        <Image src={prizes[2].image} alt={prizes[2].prize} className="max-w-32" />
        <div className="flex flex-col gap-2 justify-center w-full">
          <h2 className={`${swily.className} font-semibold text-3xl sm:text-4xl lg:text-5xl`}>{prizes[2].title}</h2>
          <p className="md:text-lg">{prizes[2].description}</p>
          <p className="font-medium">{prizes[1].prize}</p>
        </div>
      </div>
      <div className="col-span-4">
        <div className="col-span-3 gap-4 grid grid-cols-3 font-poppins w-full">
          {prizes.slice(3).map((prize, i) => (
            <div className="col-span-3 md:col-span-1 bg-white p-4 flex flex-col sm:flex-row md:flex-col items-center gap-4 font-poppins" key={i}>
              <Image src={prize.image} alt={prize.prize} className="max-w-32" />
              <div className="flex flex-col gap-6 justify-between w-full h-full">
                <div className="flex flex-col gap-2 justify-start">
                  <h2 className={`${swily.className} font-semibold text-2xl sm:text-3xl lg:text-4xl`}>{prize.title}</h2>
                  <p className="text-sm sm:text-base">{prize.description}</p>
                </div>
                <p className="font-medium whitespace-pre-wrap">{prize.prize}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrizeGrid;
