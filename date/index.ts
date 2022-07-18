/*
 * @Descripttion: 日期
 * @version: 1.0.0
 * @Author: 298591
 * @Date: 2021-06-30 19:44:34
 * @LastEditTime: 2021-06-30 20:00:04
 */

import { isDate } from '../type';

const MONTH_DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 是否闰年
 * @param y 
 * @return boolean
 */
function isLeapYear(y: number): boolean {
  y = Number(y);
  return (y % 100) ? !(y % 4) : !(y % 400);
}

/**
 * 判断日期是否是今天
 * @param today 
 * @param date 
 * @return boolean
 */
function isToday(today: Date, date?: Date): boolean {
  if (!date) {
    date = today;
    today = null;
  }
  return dateToString(toDate(today || new Date())) === dateToString(toDate(date));
}

/**
 * 是否是明天
 * @param today 
 * @param date 
 * @return boolean
 */
function isTomorrow(today: Date | string, date): boolean {
  if (!date) {
    date = today;
    today = null;
  }
  today = toDate(today || new Date());
  today = new Date(today.getTime() + 24 * 60 * 60 * 1000); // setDate 在安卓下性能差
  return dateToString(today) === dateToString(toDate(date));
}

/**
 * 月份天数
 * @param y 
 * @param m
 * @return number
 */
function getMonthDays(y: number, m: number): number {
  return m === 2 && isLeapYear(y) ? (MONTH_DAYS[m] + 1) : MONTH_DAYS[m];
}

/**
 * 小于10前面补0
 * @param n
 * @return 11/01 
 */
function fillZero(n: number): string {
  return (n > 9 ? '' : '0') + n;
}

/**
 * 字符串转成日期对象
 * @param date
 * @return Date
 */
function stringToDate(date: string): Date {
  return new Date(date.replace(/-/ig, '/'));
}

/**
 * 日期对象转成字符串
 * @param date 
 * @return string
 */
function dateToString(date: Date): string {
  return getDateInfo(date).dateStr;
}

/**
 * 转成日期对象
 * @param date
 * @return Date 
 */
function toDate(date: Date | string): Date {
  return isDate(date) ? date as Date : stringToDate(date as string);
}

/**
 * 加天数
 * @param date 
 * @param diff 
 * @return string
 */
function addDate(date: Date, diff: number): string {
  date = toDate(dateToString(date));
  date.setDate(date.getDate() + diff);
  return dateToString(date);
}

/**
 * 获取年份
 * @param date 
 * @return number
 */
function getYear(date: Date | string): number {
  return toDate(date).getFullYear();
}

/**
 * 获取月份
 * @param date
 * @return number
 */
function getMonth(date: Date | string): number {
  return toDate(date).getMonth() + 1;
}

/**
 * 获取几号
 * @param date
 * @return number
 */
function getDate(date: Date | string): number {
  return toDate(date).getDate();
}

/**
 * 获取周几
 * @param date
 * @return number
 */
function getWeekDay(date: Date | string): number {
  return toDate(date).getDay();
}

/**
 * 获取年月
 * @param date
 *  @return string
 */
function getYearAndMonth(date: Date | string): string {
  let dateObj = toDate(date);
  return [dateObj.getFullYear(), fillZero(dateObj.getMonth() + 1)].join('-');
}

interface DateInfo {
  year: number,
  month: number,
  date: number,
  day: number,
  dateObj: Date,
  dateStr: string
}
/**
 * 获取日期信息对象
 * @param date 
 */
function getDateInfo(date: Date | string): DateInfo {
  let dateObj = toDate(date);
  let dateInfo = {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    date: dateObj.getDate(),
    day: dateObj.getDay(),
    dateObj: dateObj
  };

  return {...dateInfo, dateStr: [dateInfo.year, fillZero(dateInfo.month), fillZero(dateInfo.date)].join('-')};
}

export {
  isLeapYear,
  isToday,
  isTomorrow,
  getMonthDays,
  fillZero,
  stringToDate,
  dateToString,
  toDate,
  addDate,
  getYear,
  getMonth,
  getDate,
  getWeekDay,
  getDateInfo,
  getYearAndMonth
};
