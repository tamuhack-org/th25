import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface ScheduleItem {
    date: Date;
    description: string;
    eventName: string;
    location: string;
    tags: Tag[];
    id: string;
}

interface Tag {
    value: string;
    label: string;
}

const filterToTagMapping = {
    Required: 'Required',
    Sponsor: 'Company Events',
    Meal: 'Food',
    Workshop: 'Workshops',
    Social: 'For Fun',
};

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
        ScrollTrigger.refresh();
    }, [scheduleItems]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const toggleFilter = (displayName: string) => {
        const tagValue = Object.entries(filterToTagMapping).find(
            (entry) => entry[1] === displayName,
        )?.[0];
        if (tagValue) {
            setActiveFilters((prev) =>
                prev.includes(tagValue)
                    ? prev.filter((f) => f !== tagValue)
                    : [...prev, tagValue],
            );
        }
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
        <section
            id="schedule"
            className="z-10 flex w-full flex-col font-poppins"
        >
            <div className="mb-6 flex w-full flex-col lg:max-2xl:mb-4">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col items-stretch lg:pr-40">
                        {/* Want to put units here so that the svg scales  */}
                        <div className="mb-2 flex items-end text-4.5xl xxs:text-5.5xl xs:text-6xl md:text-6.5xl xl:text-7.5xl 2xl:text-8.5xl">
                            <h2 className="font-poppins font-semibold">
                                Schedule
                            </h2>
                            <svg
                                width="1em"
                                height="1em"
                                viewBox="0 0 128 128"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24.8194 87.301L24.8193 87.1405L77.2246 87.0693L77.2766 36.9228L77.4444 36.9227L90.5704 49.4764L90.5332 99.7929L37.9503 99.85L24.8194 87.301Z"
                                    fill="black"
                                />
                                <path
                                    d="M35.688 38.9553L81.751 83.01L72.9822 91.4044L26.9192 47.3498L35.688 38.9553Z"
                                    fill="black"
                                />
                            </svg>
                        </div>
                        <div className="mt-0 grid w-fit place-items-center rounded-full bg-black px-6 py-1 text-xxs font-semibold tracking-wider xxs:px-8 xxs:text-xs xs:text-sm md:px-12 lg:px-7 lg:text-base xl:px-20 2xl:px-36">
                            <p className="uppercase text-white">
                                Find the hardware schedule{' '}
                                <a href="#" className="underline">
                                    HERE
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-start gap-4 lg:flex">
                        <Image
                            src="/schedule_guy.png"
                            alt="Schedule mascot"
                            width={176}
                            height={144}
                            className="h-32 w-40 xl:h-36 xl:w-44"
                        />
                        <div className="max-w-xs rounded-xl border-2 border-black bg-white p-4">
                            <p className="text-sm">
                                Times are subject to change. Check back here for
                                live updates!
                            </p>
                        </div>
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
                        <h3 className="w-full border-b-4 border-black bg-pink-300 px-4 py-2 text-lg font-semibold text-white sm:text-2xl lg:py-3 lg:text-4xl">
                            Saturday
                        </h3>
                        <div className="relative bg-white p-6">
                            <div className="-z-2 absolute bottom-0 left-24 top-0 hidden w-3 bg-black lg:block" />
                            <div className="flex flex-col gap-4">
                                {!scheduleItems ||
                                    !scheduleItems.filter((item) => {
                                        const date = new Date(item.date);
                                        const isDayMatch = date.getDay() === 6;
                                        return isDayMatch;
                                    }).length ? (
                                    <div className="flex h-40 items-center justify-center">
                                        <p className="text-lg text-gray-500">
                                            Coming Soon!
                                        </p>
                                    </div>
                                ) : (
                                    scheduleItems
                                        ?.filter((item) => {
                                            const date = new Date(item.date);
                                            const isDayMatch =
                                                date.getDay() === 6;
                                            return isDayMatch;
                                        })
                                        .sort(
                                            (a, b) =>
                                                new Date(a.date).getTime() -
                                                new Date(b.date).getTime(),
                                        )
                                        .map((item) => {
                                            const tagMatch =
                                                activeFilters.length === 0 ||
                                                item.tags.some((tag) =>
                                                    activeFilters.includes(
                                                        tag.label,
                                                    ),
                                                );

                                            const opacity = tagMatch
                                                ? ''
                                                : 'opacity-40';
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={opacity}
                                                >
                                                    <div className="flex items-start lg:hidden">
                                                        <div className="mr-4 mt-1 w-[85px] shrink-0 text-sm text-gray-600 opacity-30">
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
                                                            <div className="font-semibold text-black">
                                                                {item.eventName}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {item.location}
                                                            </div>
                                                            {item.description && (
                                                                <div className="mt-1 text-sm text-gray-600">
                                                                    {
                                                                        item.description
                                                                    }
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
                                                                className={`z-10 shrink-0 rounded-full border-4 border-black ${isEventCurrent(
                                                                    item,
                                                                )
                                                                    ? '-ml-[29px] h-6 w-6 bg-pink-400'
                                                                    : '-ml-7 h-5 w-5 bg-blue-100'
                                                                    } ${!tagMatch ? 'hidden' : ''}`}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <div className="font-semibold text-black">
                                                                {item.eventName}
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-600">
                                                                {item.location}
                                                            </div>
                                                            {item.description && (
                                                                <div className="mt-1 text-sm text-gray-600">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden px-0 lg:flex lg:w-[10%] lg:flex-col lg:justify-start lg:gap-3 lg:pt-20 xl:px-2">
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
                            className={`rounded-lg px-2 py-3 text-center text-sm transition-colors ${activeFilters.includes(
                                Object.entries(filterToTagMapping).find(
                                    (entry) => entry[1] === filter,
                                )?.[0] || '',
                            )
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
                        <h3 className="w-full border-b-4 border-black bg-pink-300 px-4 py-2 text-lg font-semibold text-white sm:text-2xl lg:py-3 lg:text-4xl">
                            Sunday
                        </h3>
                        <div className="relative bg-white p-6">
                            <div className="-z-2 absolute bottom-0 left-24 top-0 hidden w-3 bg-black lg:block" />

                            <div className="flex flex-col gap-6">
                                {!scheduleItems ||
                                    !scheduleItems.filter((item) => {
                                        const date = new Date(item.date);
                                        const isDayMatch = date.getDay() === 6;
                                        return isDayMatch;
                                    }).length ? (
                                    <div className="flex h-40 items-center justify-center">
                                        <p className="text-lg text-gray-500">
                                            Coming Soon!
                                        </p>
                                    </div>
                                ) : (
                                    scheduleItems
                                        ?.filter((item) => {
                                            const date = new Date(item.date);
                                            const isDayMatch =
                                                date.getDay() === 0;

                                            return isDayMatch;
                                        })
                                        .sort(
                                            (a, b) =>
                                                new Date(a.date).getTime() -
                                                new Date(b.date).getTime(),
                                        )
                                        .map((item) => {
                                            const tagMatch =
                                                activeFilters.length === 0 ||
                                                item.tags.some((tag) =>
                                                    activeFilters.includes(
                                                        tag.label,
                                                    ),
                                                );

                                            const opacity = tagMatch
                                                ? ''
                                                : 'opacity-40';
                                            return (
                                                <div
                                                    key={item.id}
                                                    className={opacity}
                                                >
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
                                                            <div className="font-semibold text-black">
                                                                {item.eventName}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {item.location}
                                                            </div>
                                                            {item.description && (
                                                                <div className="mt-1 text-sm text-gray-600">
                                                                    {
                                                                        item.description
                                                                    }
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
                                                                className={`z-10 shrink-0 rounded-full border-4 border-black ${isEventCurrent(
                                                                    item,
                                                                )
                                                                    ? '-ml-[29px] h-6 w-6 bg-pink-400'
                                                                    : '-ml-7 h-5 w-5 bg-blue-100'
                                                                    } ${!tagMatch ? 'hidden' : ''}`}
                                                            />
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <div className="font-semibold text-black">
                                                                {item.eventName}
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-600">
                                                                {item.location}
                                                            </div>
                                                            {item.description && (
                                                                <div className="mt-1 text-sm text-gray-600">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Schedule;
