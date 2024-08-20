import React from "react";
import { declOfNum } from "../lib/utils";

export type DayTaskListProps = {
  items: string[];
  show?: number;
}

export function DayTaskList({ items, show = 1 }: DayTaskListProps) {
  const amount = items.length - 1;
  const label = declOfNum(amount, ['задача', 'задачи', 'задач']);
  const more = <li>{`Еще ${amount} ${label}`}</li>;

  return items.length ? (
    <ul className="task-list">
      {items.slice(0, show).map((item, index) => <li key={index}>{item}</li>)}
      {items.length > show ? more : null}
    </ul>
  ) : null;
}