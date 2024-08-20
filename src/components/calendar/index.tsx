import clsx from "clsx";
import {Button} from "../../ui/Button";
import {pointToString} from "../../lib/utils";
import {
    CalendarCell,
} from "../../lib/CalendarBuilder";
import React from "react";
import {Cell} from "./Cell";
import {Grid} from "./Grid";
import {useCalendar} from "./hooks/useCalendar";

interface CalendarProps {
    children?: (props: CalendarCell) => React.ReactNode;
}

export function Calendar({children}: CalendarProps) {
    const isHeader = (x: number, y: number) => x === 0 || y === 0;

    const [calendar, {prevMonth, nextMonth}] = useCalendar();

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
