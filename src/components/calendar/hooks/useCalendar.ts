import {useRef, useState} from "react";
import {MonthCalendar} from "../../../lib/Calendar";
import {
    CalendarBuilder,
    CalendarMonthTable,
} from "../../../lib/CalendarBuilder";

type CalendarHookState = [
    CalendarMonthTable,
    {
        prevMonth: () => void,
        nextMonth: () => void,
    },
];

export const useCalendar = (
    year?: number,
    month?: number
): CalendarHookState => {
    const instance = useRef<MonthCalendar>(new MonthCalendar(year, month));

    const rebuildCalendar = () => {
        const builder = new CalendarBuilder(instance.current);
        return builder.getMonthTable();
    };

    const [calendar, setCurrent] = useState<CalendarMonthTable>(rebuildCalendar);

    const nextMonth = () => {
        instance.current.next();
        setCurrent(rebuildCalendar());
    };

    const prevMonth = () => {
        instance.current.prev();
        setCurrent(rebuildCalendar());
    };

    return [calendar, {prevMonth, nextMonth}];
};