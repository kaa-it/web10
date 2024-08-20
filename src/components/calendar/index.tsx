import {useRef, useState} from "react";
import clsx from "clsx";
import {Button} from "../../ui/Button";
import {pointToString} from "../../lib/utils";
import {
    CalendarMonthTable,
    CalendarBuilder,
    CalendarCell,
} from "../../lib/CalendarBuilder";
import {MonthCalendar} from "../../lib/Calendar";
import React from "react";
import {Cell} from "./Cell";
import {Grid} from "./Grid";

interface CalendarProps {
    children?: (props: CalendarCell) => React.ReactNode;
}

export function Calendar({children}: CalendarProps) {
    const instance = useRef<MonthCalendar>(new MonthCalendar());

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

    const isHeader = (x: number, y: number) => x === 0 || y === 0;

    return (
        <section className="calendar">
            <nav className="controls">
                <Button name="prev" className="yellow" onClick={prevMonth}>
                    «
                </Button>
                <span className="current-date">{calendar.label}</span>
                <Button name="next" className="yellow" onClick={nextMonth}>
                    »
                </Button>
            </nav>
            <div className="layers">
                <Grid
                    tag="form"
                    width={calendar.width}
                    height={calendar.height}
                    className={clsx("layer", "base")}
                >
                    {({x, y, index}) => (
                        <Cell
                            tag="button"
                            key={pointToString(x, y)}
                            x={x}
                            y={y}
                            className={clsx("day", calendar.table[index].className, {header: isHeader(x, y)})}
                        >
                            {children && !isHeader(x, y)
                                ? children(calendar.table[index])
                                : calendar.table[index].value}
                        </Cell>
                    )}
                </Grid>
            </div>
        </section>
    );
}
