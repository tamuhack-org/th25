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
      const fetchResult = await fetch('https://team.tamuhack.org/api/hh24-new').then((res) => res.json());
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
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const isEventCurrent = (item: ScheduleItem) => {
    const eventDate = new Date(item.date);
    const eventIndex = scheduleItems?.findIndex(i => i.id === item.id);
    const nextEvent = scheduleItems?.[eventIndex + 1];
    const nextEventDate = nextEvent ? new Date(nextEvent.date) : null;

    const isStarted = currentTime >= eventDate;
    const isBeforeNext = nextEventDate ? currentTime < nextEventDate : true;

    return isStarted && isBeforeNext;
};

  return (
    <div id="schedule" className="flex flex-col z-10 w-full">
      <div className="mb-8">
        <div className="flex items-end mb-2">
          <h2 className="font-serif text-3xl lg:text-8xl">Schedule</h2>
          <span className="text-8xl rotate-270 ml-2 mb-2">↘</span>
        </div>
        <button className="bg-black text-white px-6 py-3 rounded-full text-sm">
          FIND THE HARDWARE SCHEDULE <span className="font-bold">HERE</span>
        </button>
      </div>

      <div className="rounded-lg border border-black p-4 mb-6 lg:border-0 lg:p-0 lg:hidden">
        <h3 className="text-lg mb-2 lg:hidden">Filters</h3>
        <div className="flex flex-wrap gap-2">
          {['Required', 'Company Events', 'Food', 'Workshops', 'For Fun'].map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row  gap-3 sm:gap-4 lg:gap-8 w-full">

        <div className="flex flex-col w-full lg:w-[45%]">
        <div className="border-4 border-black rounded-2xl overflow-hidden">
            <h3 className="w-full bg-pink-300 text-white py-2 px-4 text-lg sm:text-2xl lg:text-4xl">
            Saturday
            </h3>
            <div className="bg-white p-6 relative">
            <div className="absolute top-0 bottom-0 left-24 w-3 bg-black -z-2 hidden lg:block"/>
            <div className="flex flex-col gap-4">
                {scheduleItems?.filter((item) => {
                    const date = new Date(item.date);
                    const isDayMatch = date.getDay() === 6;
                    const tagMatch = activeFilters.length === 0 || 
                      item.tags.some(tag => activeFilters.includes(tag));
                    return isDayMatch && tagMatch;
                })
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((item) => (
                  <div key={item.id}>

                  <div className="flex lg:hidden items-start">
                  <div className="w-[85px] shrink-0 text-gray-600 text-sm mr-4 mt-1">
                    {new Date(item.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                    <div className="flex flex-col">
                      <div className="text-black font-medium">{item.eventName}</div>
                      <div className="text-gray-600 text-sm">{item.location}</div>
                      {item.description && (
                        <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                      )}
                    </div>
                  </div>
      
                  <div className="hidden lg:flex">
                    <div className="w-24 shrink-0 text-gray-600 text-sm transform -rotate-12 origin-right">
                      {new Date(item.date).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    
                    <div className="flex">
                      <div className={`shrink-0 border-4 border-black rounded-full z-10
                        ${isEventCurrent(item) 
                          ? 'w-6 h-6 -ml-[29px] bg-pink-400' 
                          : 'w-5 h-5 -ml-7 bg-blue-100'
                        }`}
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="text-black font-medium">{item.eventName}</div>
                      <div className="text-gray-600 text-sm mt-1">{item.location}</div>
                      {item.description && (
                        <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
        </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:w-[10%] lg:px-2 lg:justify-start lg:pt-20 lg:gap-2">
          {['Required', 'Company Events', 'Food', 'Workshops', 'For Fun'].map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-2 py-1 rounded-lg text-sm text-center transition-colors
                ${activeFilters.includes(filter) 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>


        <div className="flex flex-col w-full lg:w-[45%]">
          <div className="border-4 border-black rounded-2xl overflow-hidden">
            <h3 className="w-full bg-pink-300 text-white py-2 px-4 text-lg sm:text-2xl lg:text-4xl">
              Sunday
            </h3>
            <div className="bg-white p-6 relative">

                <div className="absolute top-0 bottom-0 left-24 w-3 bg-black -z-2 hidden lg:block"/>
                
                <div className="flex flex-col gap-6">
                  {scheduleItems?.filter((item) => {
                      const date = new Date(item.date);
                      const isDayMatch = date.getDay() === 0; 

                      const tagMatch = activeFilters.length === 0 || 
                        item.tags.some(tag => activeFilters.includes(tag));

                      return isDayMatch && tagMatch;
                  })
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((item) => (
                  <div key={item.id}>
                    
                  <div className="flex lg:hidden items-start">
                  <div className="w-[85px] shrink-0 text-gray-600 text-sm mr-4 mt-1">
                    {new Date(item.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                    <div className="flex flex-col">
                      <div className="text-black font-medium">{item.eventName}</div>
                      <div className="text-gray-600 text-sm">{item.location}</div>
                      {item.description && (
                        <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                      )}
                    </div>
                  </div>
      
                <div className="hidden lg:flex">
                  <div className="w-24 shrink-0 text-gray-600 text-sm transform -rotate-12 origin-right">
                    {new Date(item.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  
                  <div className="flex">
                    <div className={`shrink-0 border-4 border-black rounded-full z-10
                      ${isEventCurrent(item) 
                        ? 'w-6 h-6 -ml-[29px] bg-pink-400' 
                        : 'w-5 h-5 -ml-7 bg-blue-100'
                      }`}
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="text-black font-medium">{item.eventName}</div>
                    <div className="text-gray-600 text-sm mt-1">{item.location}</div>
                    {item.description && (
                      <div className="text-gray-600 text-sm mt-1">{item.description}</div>
                    )}
                  </div>
                </div>
                </div>
              ))}
                </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Schedule;