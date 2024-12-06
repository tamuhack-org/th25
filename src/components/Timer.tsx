import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { formatTimeAnnouncement, shouldAnnounceTime } from './timerUtils';
import localFont from 'next/font/local';
import { twMerge } from 'tailwind-merge';

const swily = localFont({ src: '../pages/fonts/SwilyBright.otf' });
const kis = localFont({ src: '../pages/fonts/adobe-kis-vf-default-roman.ttf' });

const Timer = ({ className }: { className?: string }) => {
    const [now, setNow] = useState<DateTime | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [ariaLiveText, setAriaLiveText] = useState<string | null>(null);
    const eventDate = DateTime.fromISO('2025-01-25T08:00', {
        zone: 'America/Chicago',
    });

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
        if (!now)
            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
            };
        const diff = eventDate
            .diff(now, ['days', 'hours', 'minutes', 'seconds'])
            .toObject();
        if (eventDate < now) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            //prevent infinite rerenders
            if (ariaLiveText !== 'The event has started.')
                setAriaLiveText('The event has started.');
            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
            };
        }
        if (!diff)
            return {
                days: '00',
                hours: '00',
                minutes: '00',
                seconds: '00',
            };

        // Set aria-live text
        const announcementDiff = {
            hours: diff.hours,
            days: diff.days,
            minutes: diff.minutes,
            seconds: diff.seconds,
        };
        const shouldAnnounce = shouldAnnounceTime(announcementDiff);
        const announcement = formatTimeAnnouncement(announcementDiff);
        if (
            (shouldAnnounce && announcement !== ariaLiveText) ||
            ariaLiveText === null
        ) {
            setAriaLiveText(announcement);
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
            className={twMerge(
                'hidden max-w-fit flex-col items-end font-serif lg:flex',
                className,
            )}
            aria-label="Countdown until TAMUhack 2025 starts"
        >
            <span className={`pr-4 text-2xl lg:text-6xl ${swily.className}`}>
                {days}:{hours}:{minutes}:{seconds}
            </span>
            <p className={`-mt-4 text-lg lg:text-2xl ${kis.className}`}>
                until hacking begins.
            </p>
            <p className="sr-only" aria-live="polite" aria-atomic="true">
                {ariaLiveText}
            </p>
        </div>
    );
};

export default Timer;
