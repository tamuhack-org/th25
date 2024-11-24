import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';

const Timer = () => {
    const [now, setNow] = useState<DateTime | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // const eventDate = DateTime.fromISO('2024-11-24T15:59');

    useEffect(() => {
        setNow(DateTime.now());
        intervalRef.current = setInterval(() => {
            setNow(DateTime.now());
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const calculateTimeLeft = () => {
        const eventDate = DateTime.fromISO('2024-11-24T15:08', {
            zone: 'America/Chicago',
        });
        if (!now)
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        const diff = eventDate
            .diff(now, ['days', 'hours', 'minutes', 'seconds'])
            .toObject();
        if (eventDate < now) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            return { days: '00', hours: '00', minutes: '00', seconds: '00' };
        }
        return {
            days: String(diff.days || 0).padStart(2, '0'),
            hours: String(diff.hours || 0).padStart(2, '0'),
            minutes: String(diff.minutes || 0).padStart(2, '0'),
            seconds: String(Math.floor(diff.seconds || 0)).padStart(2, '0'),
        };
    };

    const { days, hours, minutes, seconds } = calculateTimeLeft();

    return (
        <div
            role="timer"
            className="flex max-w-fit flex-col items-end font-serif"
        >
            <span className="text-6xl italic">
                {days}:{hours}:{minutes}:{seconds}
            </span>
            <p className="text-2xl">until hacking begins.</p>
        </div>
    );
};

export default Timer;
