import React, { useEffect, useState } from 'react';

interface ScheduleItem {
    date: Date;
    description: string;
    eventName: string;
    location: string;
    tags: string[];
    id: string;
}

const Schedule: React.FC = () => {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            const fetchResult = await fetch(
                'https://team.tamuhack.org/api/th25',
            ).then((res) => res.json());
            setScheduleItems(fetchResult);
        };
        fetchSchedule();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const toggleFilter = (filter: string) => {
        setActiveFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter],
        );
    };

    function isEventCurrent(item: ScheduleItem): boolean {
        // No schedule items (just in case)
        if (!scheduleItems) return false;

        const eventIndex = scheduleItems.findIndex((i) => i.id === item.id);
        if (eventIndex === -1) return false;

        const eventDate = new Date(item.date);
        if (currentTime < eventDate) return false;

        const nextEvent = scheduleItems[eventIndex + 1];
        if (!nextEvent) return true;
        const nextEventDate = new Date(nextEvent.date);

        return currentTime < nextEventDate;
    }

    return (
        <div id="schedule" className="z-10 flex w-full flex-col font-poppins">
            <div className="mb-8 flex flex-col w-fit">
                <div className="mb-2 flex items-end">
                    <h2 className="font-poppins text-3xl lg:text-8xl">
                        Schedule
                    </h2>
                    <span className="rotate-270 mb-2 ml-2 text-8xl">↘</span>
                </div>
                <div className="mt-3 w-full grid p-2 place-items-center rounded-full bg-black text-base font-semibold">
                    <p className="uppercase text-white">
                        Find the hardware schedule <a href='#' className='underline'>Here</a>
                    </p>
                </div>

                <div className="hidden lg:flex absolute right-0 top-0 items-start gap-4">
                    <img 
                        src="/schedule_guy.png" 
                        alt="Schedule mascot" 
                        className="w-32 h-32"
                    />
                    <div className="bg-white p-4 rounded-xl border-2 border-black max-w-xs">
                        <p className="text-sm">
                            Times are subject to change. Check back here for live updates!
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6 rounded-lg border border-black p-4 lg:hidden lg:border-0 lg:p-0">
                <h3 className="mb-2 text-lg lg:hidden">Filters</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        'Required',
                        'Company Events',
                        'Food',
                        'Workshops',
                        'For Fun',
                    ].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-8">
                <div className="flex w-full flex-col lg:w-[45%]">
                    <div className="overflow-hidden rounded-2xl border-4 border-black">
                        <h3 className="w-full bg-pink-300 px-4 py-2 text-lg text-white sm:text-2xl lg:text-4xl">
                            Saturday
                        </h3>
                        <div className="relative bg-white p-6">
                            <div className="-z-2 absolute bottom-0 left-24 top-0 hidden w-3 bg-black lg:block" />
                            <div className="flex flex-col gap-4">
                            {!scheduleItems || !scheduleItems.filter((item) => {
                                    const date = new Date(item.date);
                                    const isDayMatch = date.getDay() === 6;
                                    const tagMatch =
                                        activeFilters.length === 0 ||
                                        item.tags.some((tag) =>
                                            activeFilters.includes(tag),
                                        );
                                    return isDayMatch && tagMatch;
                                }).length ? (
                                    <div className="flex items-center justify-center h-40">
                                        <p className="text-gray-500 text-lg">Coming Soon!</p>
                                    </div>
                                ) : ( scheduleItems
                                    ?.filter((item) => {
                                        const date = new Date(item.date);
                                        const isDayMatch = date.getDay() === 6;
                                        const tagMatch =
                                            activeFilters.length === 0 ||
                                            item.tags.some((tag) =>
                                                activeFilters.includes(tag),
                                            );
                                        return isDayMatch && tagMatch;
                                    })
                                    .sort(
                                        (a, b) =>
                                            new Date(a.date).getTime() -
                                            new Date(b.date).getTime(),
                                    )
                                    .map((item) => (
                                        <div key={item.id}>
                                            <div className="flex items-start lg:hidden">
                                                <div className="mr-4 mt-1 w-[85px] shrink-0 text-sm text-gray-600">
                                                    {new Date(
                                                        item.date,
                                                    ).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="font-medium text-black">
                                                        {item.eventName}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {item.location}
                                                    </div>
                                                    {item.description && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="hidden lg:flex">
                                                <div className="w-24 shrink-0 origin-right -rotate-12 transform text-sm text-gray-600">
                                                    {new Date(
                                                        item.date,
                                                    ).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>

                                                <div className="flex">
                                                    <div
                                                        className={`z-10 shrink-0 rounded-full border-4 border-black ${
                                                            isEventCurrent(item)
                                                                ? '-ml-[29px] h-6 w-6 bg-pink-400'
                                                                : '-ml-7 h-5 w-5 bg-blue-100'
                                                        }`}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <div className="font-medium text-black">
                                                        {item.eventName}
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-600">
                                                        {item.location}
                                                    </div>
                                                    {item.description && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                  )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-[10%] lg:flex-col lg:justify-start lg:gap-2 lg:px-2 lg:pt-20">
                    {[
                        'Required',
                        'Company Events',
                        'Food',
                        'Workshops',
                        'For Fun',
                    ].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`rounded-lg px-2 py-1 text-center text-sm transition-colors ${
                                activeFilters.includes(filter)
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="flex w-full flex-col lg:w-[45%]">
                    <div className="overflow-hidden rounded-2xl border-4 border-black">
                        <h3 className="w-full bg-pink-300 px-4 py-2 text-lg text-white sm:text-2xl lg:text-4xl">
                            Sunday
                        </h3>
                        <div className="relative bg-white p-6">
                            <div className="-z-2 absolute bottom-0 left-24 top-0 hidden w-3 bg-black lg:block" />

                            <div className="flex flex-col gap-6">
                            {!scheduleItems || !scheduleItems.filter((item) => {
                                    const date = new Date(item.date);
                                    const isDayMatch = date.getDay() === 6;
                                    const tagMatch =
                                        activeFilters.length === 0 ||
                                        item.tags.some((tag) =>
                                            activeFilters.includes(tag),
                                        );
                                    return isDayMatch && tagMatch;
                                }).length ? (
                                    <div className="flex items-center justify-center h-40">
                                        <p className="text-gray-500 text-lg">Coming Soon!</p>
                                    </div>
                                ) : ( scheduleItems
                                    ?.filter((item) => {
                                        const date = new Date(item.date);
                                        const isDayMatch = date.getDay() === 0;

                                        const tagMatch =
                                            activeFilters.length === 0 ||
                                            item.tags.some((tag) =>
                                                activeFilters.includes(tag),
                                            );

                                        return isDayMatch && tagMatch;
                                    })
                                    .sort(
                                        (a, b) =>
                                            new Date(a.date).getTime() -
                                            new Date(b.date).getTime(),
                                    )
                                    .map((item) => (
                                        <div key={item.id}>
                                            <div className="flex items-start lg:hidden">
                                                <div className="mr-4 mt-1 w-[85px] shrink-0 text-sm text-gray-600">
                                                    {new Date(
                                                        item.date,
                                                    ).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="font-medium text-black">
                                                        {item.eventName}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {item.location}
                                                    </div>
                                                    {item.description && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="hidden lg:flex">
                                                <div className="w-24 shrink-0 origin-right -rotate-12 transform text-sm text-gray-600">
                                                    {new Date(
                                                        item.date,
                                                    ).toLocaleTimeString(
                                                        'en-US',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </div>

                                                <div className="flex">
                                                    <div
                                                        className={`z-10 shrink-0 rounded-full border-4 border-black ${
                                                            isEventCurrent(item)
                                                                ? '-ml-[29px] h-6 w-6 bg-pink-400'
                                                                : '-ml-7 h-5 w-5 bg-blue-100'
                                                        }`}
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <div className="font-medium text-black">
                                                        {item.eventName}
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-600">
                                                        {item.location}
                                                    </div>
                                                    {item.description && (
                                                        <div className="mt-1 text-sm text-gray-600">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                  )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
