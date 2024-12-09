export const formatTimeAnnouncement = (diff: {
    hours: number | undefined;
    days: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
}) => {
    //check if undefined, but 0 is valid
    if (
        diff.hours === undefined ||
        diff.days === undefined ||
        diff.minutes === undefined ||
        diff.seconds === undefined
    )
        return '';

    const parts = [];

    if (diff.days > 0) {
        parts.push(
            `${Math.floor(diff.days)} ${diff.days === 1 ? 'day' : 'days'}`,
        );
    }
    if (diff.hours > 0) {
        parts.push(
            `${Math.floor(diff.hours)} ${diff.hours === 1 ? 'hour' : 'hours'}`,
        );
    }
    if (diff.days === 0 || diff.hours === 0) {
        if (diff.minutes > 0) {
            parts.push(
                `${Math.floor(diff.minutes)} ${diff.minutes === 1 ? 'minute' : 'minutes'}`,
            );
        }
        if (diff.days === 0 && diff.hours === 0) {
            parts.push(
                `${Math.floor(diff.seconds)} ${diff.seconds === 1 ? 'second' : 'seconds'}`,
            );
        }
    }

    const timeString = parts.join(', ');
    return `${timeString} until the event starts.`;
};

export const shouldAnnounceTime = (diff: {
    hours: number | undefined;
    days: number | undefined;
    minutes: number | undefined;
    seconds: number | undefined;
}) => {
    if (
        diff.hours === undefined ||
        diff.days === undefined ||
        diff.minutes === undefined ||
        diff.seconds === undefined
    )
        return false;
    diff.seconds = Math.floor(diff.seconds);

    // More than 7 days: announce once per day at midnight
    if (
        diff.days > 7 &&
        diff.hours === 0 &&
        diff.minutes === 0 &&
        diff.seconds === 0
    )
        return true;

    // 2-7 days: announce twice per day (at midnight and noon)
    if (
        diff.days >= 2 &&
        diff.days <= 7 &&
        diff.hours % 12 === 0 &&
        diff.minutes === 0 &&
        diff.seconds === 0
    )
        return true;

    // Last 48 hours but more than 24 hours: announce every 6 hours
    if (
        diff.days === 1 &&
        diff.hours % 6 === 0 &&
        diff.minutes === 0 &&
        diff.seconds === 0
    )
        return true;

    // Last 24 hours but more than 1 hour: announce every hour
    if (
        diff.days === 0 &&
        diff.hours >= 1 &&
        diff.minutes === 0 &&
        diff.seconds === 0
    )
        return true;

    // Last hour but more than 10 minutes: announce every 10 minutes
    if (
        diff.days === 0 &&
        diff.hours === 0 &&
        diff.minutes >= 10 &&
        diff.minutes % 10 === 0 &&
        diff.seconds === 0
    )
        return true;

    // Last 10 minutes: announce every minute
    if (
        diff.days === 0 &&
        diff.hours === 0 &&
        diff.minutes < 10 &&
        diff.seconds === 0
    )
        return true;

    return false;
};
