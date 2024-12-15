import TamuhackFooter from '@/components/TamuHackFooter';
import Header from '@/components/Header';
import Timer from '@/components/Timer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import HomeImage from '@/../public/home_image.png';



interface ScheduleItem {
    date: Date;
    description: string;
    eventName: string;
    location: string;
    tags: string[];
    id: string;
  };

export default function Home() {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>();

    useEffect(() => {
        const fetchSchedule = async () => {
          const fetchResult = await fetch('https://team.tamuhack.org/api/hh24-new').then((res) => res.json());
          setScheduleItems(fetchResult);
        }
        fetchSchedule();
      }, []);

      
    return (
        <div className="mx-auto max-w-[2000px] px-8">
            <Header />
            <main className="mt-12 min-h-screen lg:mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h1 className="text-center font-serif text-5xl lg:text-left lg:text-8xl">
                            TAMUHACK
                        </h1>
                        <h2 className="text-center font-serif text-xl lg:text-left lg:text-3xl">
                            January 25-26, 2025 @ MSC 2300
                        </h2>
                        <div className="mt-6 flex justify-center items-start mx-auto lg:hidden gap-4">
                            <Link
                                href="#"
                                className="rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                            >
                                Apply
                            </Link>
                            <Link
                                href="#"
                                className="rounded-xl border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
                            >
                                Mentor
                            </Link>
                        </div>
                        <div className="mt-6 hidden text-sm lg:block">
                            <span className="rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#b1dcfb]">
                                24 Hours
                            </span>
                            <span className="ml-4 rounded-full border-2 border-black bg-white px-3 py-1 transition-colors hover:bg-[#e3b8dd]">
                                Hardware &amp; Software
                            </span>
                        </div>
                        <Timer />
                    </div>
                    <Image
                        src={HomeImage}
                        alt="Reflection of College Station in a puddle"
                        width={800}
                        height={600}
                        placeholder="empty"
                    />
                </div>
            </main>

            {/*schedule*/}
            <div id="schedule" className="flex z-10 w-full max-w-[1200px] h-full">
            <h2 className="font-serif text-3xl lg:text-8xl">Schedule</h2>

            <div className="flex flex-row gap-2 sm:gap-3 lg:gap-6 w-full">
            <h3 className="w-full font-serif text-center max-[425px]:text-[12px] text-lg sm:text-2xl lg:text-4xl">Saturday</h3>
            <div className="flex flex-col gap-1">
                {scheduleItems?.filter((item) => {
                    const date = new Date(item.date);
                    return date.getDay() === 6;
                }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => (
                    <div key={item.id} className="flex flex-col w-full p-4 bg-white border border-black rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">{item.eventName}</h3>
                        <p>{item.description}</p>
                        <p>{item.location}</p>
                        <p>{new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                
                ))}
            </div>
                
                </div>
                <div className="flex flex-row gap-2 sm:gap-3 lg:gap-6 w-full">
                    <h3 className="w-full font-serif text-center max-[425px]:text-[12px] text-lg sm:text-2xl lg:text-4xl">Sunday</h3>
                    <div className="flex flex-col gap-1">
                    {scheduleItems?.filter((item) => {
                        const date = new Date(item.date);
                        return date.getDay() === 0;
                    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((item) => (
                        <div key={item.id} className="flex flex-col w-full p-4 bg-white border border-black rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">{item.eventName}</h3>
                            <p>{item.description}</p>
                            <p>{item.location}</p>
                            <p>{new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            <TamuhackFooter />
        </div>
    );
}
