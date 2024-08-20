import { Table } from "./Table";
import { axis2D, index } from "./utils";
import { MonthCalendar, CalendarDay } from "./Calendar";
import clsx from "clsx";

export type CalendarCell = {
  value: string;
  date: Date | null;
  className: string;
};

export type CalendarMonthValue = [number, number];

export type CalendarMonthTable = {
  label: string,
  width: number,
  height: number,
  table: CalendarCell[]
};

export interface ICalendar {
  currentYear: number;
  currentMonth: number;
  currentMonthName: string;
  calendarDays: CalendarDay[];
  getWeek(day: number): number;
  getWeekDayName(day: number): string;
  prevMonth: ICalendar;
  nextMonth: ICalendar;
}

export class CalendarBuilder {
  static readonly WIDTH = 8;
  static readonly HEIGHT = 6;
  protected table: Table<CalendarCell>;
  
  constructor(protected calendar: ICalendar) {
    this.table = new Table<CalendarCell>(
      CalendarBuilder.WIDTH, 
      CalendarBuilder.HEIGHT, 
      this.onCellInit.bind(this));
  }

  getMonthTable(): CalendarMonthTable {
    return {
      label: this.getLabel(),
      width: CalendarBuilder.WIDTH,
      height: CalendarBuilder.HEIGHT,
      table: this.table.dump()
    }
  }

  protected getLabel(): string {
    return [
      this.calendar.currentMonthName,
      this.calendar.currentYear
    ].join(" ");
  }

  protected onCellInit(_: unknown, cellIndex?: number): CalendarCell {
    // для универсальности функции getValue индекс объявлен как опциональный
    // но так как вызов происходит из fillArray, то он есть всегда
    // конвертируем индекс в координаты
    const [x, y] = axis2D(cellIndex!, CalendarBuilder.WIDTH);
    // дни к нам приходят плоским массивом, 
    // но мы будем с ним работать как с таблицей 7×5, 
    // то есть на 1 меньше всего календаря
    const days = this.calendar.calendarDays;

    // чтобы понять в какой половине таблицы мы работаем
    const middleIndex = Math.floor((CalendarBuilder.WIDTH * CalendarBuilder.HEIGHT) / 2);

    // объявляем и инициализируем дефолтные значения
    let value = String(cellIndex || "");
    let className = "";
    let date: Date | null = null;

    // угловая ячейка, в ней ничего нет
    if (x === 0 && y === 0) value = "";
    // первая строка, заголовки с днями недели
    else if (y === 0 && x !== 0) value = this.calendar.getWeekDayName(x - 1);
    // первая колонка, заголовки с номерами недель
    else if (x === 0 && y !== 0) {
      // нужно получить данные для первого дня недели
      // координаты транслируем из таблицы 8×6 в 7×5
      const [day, isCurrentMonth] = days[index(x,y - 1, 7)];
      if (isCurrentMonth) {
        // с текущим месяцем просто получаем номер недели
        value = String(this.calendar.getWeek(day) + 1);
      } else {
        // перед актуальными датам добавлены дни предыдущего месяца, 
        // а после следующего, так что проверка на середину поможет
        // понять какой нам нужен
        if (cellIndex! < middleIndex) {
          value = String(this.calendar.prevMonth.getWeek(day) + 1);
        } else {
          value = String(this.calendar.nextMonth.getWeek(day) + 1);
        }
      }
    }
    else {
      // это уже непосредственно ячейки с календарными днями, получаем данные
      const [day, isCurrentMonth] = days[index(x - 1,y - 1, 7)];
      value = String(day);
      className = isCurrentMonth 
        ? 'day in-range' // дни в диапазоне выбранного месяца
        : 'day out-of-range'; // дни соседних месяцев

      // пользователь данных нашей таблицы не захочет сам вычислять дату,
      // здесь выполнить это вычисление удобнее
      if (isCurrentMonth) {
        date = new Date(
          this.calendar.currentYear, 
          this.calendar.currentMonth, 
          day
        );
      } else {
        date = (cellIndex! < middleIndex) ? new Date(
          this.calendar.prevMonth.currentYear, 
          this.calendar.prevMonth.currentMonth, 
          day
        ) : new Date(
          this.calendar.nextMonth.currentYear, 
          this.calendar.nextMonth.currentMonth, 
          day
        )
      }
    }

    // если это любая из заголовочных ячеек докинем CSS-класс
    className = clsx(className, {
      "header": x === 0 || y === 0 // если значение true, то класс будет добавлен
    });

    return {
      value,
      date,
      className
    };
  }
}