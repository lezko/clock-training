import {ITime} from 'types/ITime';

const HOURS = 12;
const MINUTES = 60;
const SECONDS = 60;
const SECS_IN_HALF_DAY = HOURS * MINUTES * SECONDS;

export function generateTime(): ITime {
    const r = Math.floor(Math.random() * (SECS_IN_HALF_DAY + 1));
    const h = Math.floor(r / (MINUTES * SECONDS));
    const m = Math.floor((r / MINUTES) % MINUTES);
    const s = Math.floor((r) % SECONDS);
    return {h, m, s};
}

function toSeconds(time: ITime) {
    return time.h * MINUTES * SECONDS + time.m * SECONDS + (time.s || 0);
}

export function compareTime(t1: ITime, t2: ITime, error: number) {
    return Math.abs(toSeconds(t1) - toSeconds(t2)) <= error;
}