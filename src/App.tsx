import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { axis2D, fillArray, formatDate, pointToString } from "./lib/utils";
import "./styles.scss";
import { Button } from "./ui/Button";
import { generateFakeData, TaskList } from "./lib/API";

import { MonthCalendar } from "./lib/Calendar";
import { CalendarMonthTable, CalendarBuilder, CalendarCell } from "./lib/CalendarBuilder";
import { DayTaskList } from "./components/DayTaskList";


export interface GridCSS extends CSSProperties {
  '--w': number;
  '--h': number;
}

interface CalendarProps {
  children?: (props: CalendarCell) => React.ReactNode
}

function Calendar({ children }: CalendarProps) {
  const instance = useRef<MonthCalendar>(new MonthCalendar());
  
  const rebuildCalendar = () => {
    const builder = new CalendarBuilder(instance.current);
    return builder.getMonthTable(); 
  }
  
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

  const cells: string[] = fillArray(calendar.width * calendar.height, '');

  return (
    <section className="calendar">
        <nav className="controls">
          <Button name="prev" className="yellow" onClick={prevMonth}>«</Button>
          <span className="current-date">{calendar.label}</span>
          <Button name="next" className="yellow" onClick={nextMonth}>»</Button>
        </nav>
        <div className="layers">
          <form 
            className={clsx('layer', 'base')}
            style={{
              '--w': calendar.width,
              '--h': calendar.height
            } as GridCSS}
          >
            {cells.map((_, index) => {
              const [x, y] = axis2D(index, calendar.width);
              return <button
                key={pointToString(x, y)}
                className={clsx(
                  'cell', 'day', 
                  calendar.table[index].className, {
                    header: isHeader(x, y)
                  }
                )}
                data-x={x}
                data-y={y}
              >
                {(children && !isHeader(x, y)) 
                  ? children(calendar.table[index]) 
                  : calendar.table[index].value}
              </button>
            })}
          </form>
        </div>
    </section>
  );
}

export default function App() {
  const [taskList, setTaskList] = useState<TaskList>({});

  useEffect(() => {
    generateFakeData()
    .then(result => {
      setTaskList(result);
    })
    .catch(err => {
      console.error(`Can not load tasks:`, err);
    })
  }, []);

  return (
    <div className="App">
      <Calendar>
      {({ value, date }) => <>
        <span>{value}</span>
        <DayTaskList items={taskList[formatDate(date!)] || []} />
      </>}
      </Calendar>
    </div>
  );
}
