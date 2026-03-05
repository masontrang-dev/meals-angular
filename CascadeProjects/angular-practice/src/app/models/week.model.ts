import { MealPlan } from './meal-plan.model';

export interface WeekIdentifier {
  year: number;
  weekNumber: number; // 1-52 (or 53 in some years)
  startDate: Date;
  endDate: Date;
}

export interface WeeklyMealPlan {
  week: WeekIdentifier;
  meals: MealPlan;
}

/**
 * Get the current week identifier
 */
export function getCurrentWeek(): WeekIdentifier {
  const now = new Date();
  return getWeekFromDate(now);
}

/**
 * Get week identifier from a specific date
 */
export function getWeekFromDate(date: Date): WeekIdentifier {
  const year = date.getFullYear();
  const weekNumber = getWeekNumber(date);
  const { startDate, endDate } = getWeekBounds(date);
  
  return {
    year,
    weekNumber,
    startDate,
    endDate
  };
}

/**
 * Get week identifier offset by a number of weeks
 */
export function getWeekOffset(week: WeekIdentifier, offset: number): WeekIdentifier {
  const startDate = new Date(week.startDate);
  startDate.setDate(startDate.getDate() + (offset * 7));
  
  return getWeekFromDate(startDate);
}

/**
 * Format week range as a readable string
 * Example: "Jan 1 - Jan 7, 2024"
 */
export function formatWeekRange(week: WeekIdentifier): string {
  const startMonth = week.startDate.toLocaleDateString('en-US', { month: 'short' });
  const startDay = week.startDate.getDate();
  const endMonth = week.endDate.toLocaleDateString('en-US', { month: 'short' });
  const endDay = week.endDate.getDate();
  const year = week.year;
  
  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  }
}

/**
 * Get week key for storage
 * Format: "2024-W01"
 */
export function getWeekKey(week: WeekIdentifier): string {
  const weekStr = week.weekNumber.toString().padStart(2, '0');
  return `${week.year}-W${weekStr}`;
}

/**
 * Calculate ISO week number for a date
 * ISO 8601: Week starts on Monday, Week 1 is the week with the first Thursday
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

/**
 * Get the start (Monday) and end (Sunday) dates of the week containing the given date
 */
function getWeekBounds(date: Date): { startDate: Date; endDate: Date } {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  
  const startDate = new Date(d.setDate(diff));
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);
  
  return { startDate, endDate };
}

/**
 * Check if two weeks are the same
 */
export function isSameWeek(week1: WeekIdentifier, week2: WeekIdentifier): boolean {
  return week1.year === week2.year && week1.weekNumber === week2.weekNumber;
}

/**
 * Check if a week is in the past
 */
export function isWeekInPast(week: WeekIdentifier): boolean {
  const now = new Date();
  return week.endDate < now;
}

/**
 * Check if a week is in the future
 */
export function isWeekInFuture(week: WeekIdentifier): boolean {
  const now = new Date();
  return week.startDate > now;
}

/**
 * Check if a week is the current week
 */
export function isCurrentWeek(week: WeekIdentifier): boolean {
  const current = getCurrentWeek();
  return isSameWeek(week, current);
}
