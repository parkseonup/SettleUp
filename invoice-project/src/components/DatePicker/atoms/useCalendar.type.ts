export type MonthSatus = 'thisMonth' | 'otherMonth';

/**
 * - showData: 'YYYY-MM-DD'. 출력하고 싶은 날짜. 전달된 날짜가 없을 경우 오늘 날짜를 기준으로 출력된다.
 * - showFixedNumberOfWeeks: 출력하고 싶은 주 수. 주 수를 전달하면 주 수만큼 고정된 길이의 배열 데이터를 반환하고, 전달된 값이 없을 경우 해당 달의 주 수만큼 유동적인 길이의 배열 데이터를 반환한다.
 * - locale: 국가. 전달된 국가가 없을 경우 사용자의 위치를 인식하여 출력한다.
 */
export interface UseCalendarProps {
  showDate?: string;
  showFixedNumberOfWeeks?: number;
  locale?: string;
}

export interface WeekDay {
  key: number;
  value: string;
}

export type WeekDays = WeekDay[];

export interface DailyDate {
  key: string;
  value: Date;
  status: MonthSatus;
}

export type WeeklyDate = DailyDate[];

export type MonthlyDate = {
  key: string;
  value: WeeklyDate;
}[];

export interface CalendarData {
  headers: {
    current: {
      year: number;
      month: number;
    };
    weekStart: number;
    weekDays: WeekDays;
  };
  body: {
    value: MonthlyDate;
    today: Date;
  };
  view: {
    changeWeekStart: (day: number) => void;
    movePrevMonth: () => void;
    moveNextMonth: () => void;
  };
}
