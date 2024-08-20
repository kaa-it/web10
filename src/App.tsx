import { useState, useEffect, useRef } from "react";
import { formatDate } from "./lib/utils";
import { Calendar } from "./components/calendar";
import "./styles.scss";

import { generateFakeData, TaskList } from "./lib/API";

import { DayTaskList } from "./components/DayTaskList";


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
