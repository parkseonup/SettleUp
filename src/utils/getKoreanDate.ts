import { getDate, getDay, getMonth } from '@seonup/use-calendar';

const days = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * @param date "YYYY-MM-DD" 형태의 문자열
 * @returns "YYYY년 MM월 DD일 D요일" 형태의 문자열
 */
export const getKoreanDate = (date: string) => {
  const _date = new Date(date);

  return `${_date.getFullYear()}년 ${getMonth(_date) + 1}월 ${getDate(_date)}일 ${
    days[getDay(_date)]
  }요일`;
};
