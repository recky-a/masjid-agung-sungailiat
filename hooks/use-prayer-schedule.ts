import { PrayerTimes } from '@/lib/prayer-times';
import { useCallback, useState } from 'react';
import { useClock } from './use-clock';
import { usePrayerLogic } from './use-prayer-logic';

export type DaySelection = 'yesterday' | 'today' | 'tomorrow';

export function usePrayerSchedule(
  todayPrayerData: PrayerTimes,
  yesterdayPrayerData: PrayerTimes | null,
  tomorrowPrayerData: PrayerTimes | null
) {
  const [selectedDay, setSelectedDay] = useState<DaySelection>('today');
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const handleDayChange = useCallback((newDay: DaySelection) => {
    setSelectedDay(newDay);
    const today = new Date();
    let date = new Date(today);

    if (newDay === 'yesterday') date.setDate(today.getDate() - 1);
    else if (newDay === 'tomorrow') date.setDate(today.getDate() + 1);

    setSelectedDate(date);
  }, []);

  const { shortTimeString, getCurrentTimeInMinutes, dateString } = useClock();

  const {
    getCurrentPrayerInfo,
    formatTimeRemaining,
    getCurrentPrayerData,
    getDayLabel,
  } = usePrayerLogic(
    todayPrayerData,
    tomorrowPrayerData,
    getCurrentTimeInMinutes
  );

  const { currentPrayer, nextPrayer, timeToNext } = getCurrentPrayerInfo();
  const prayerData = getCurrentPrayerData(
    selectedDay,
    yesterdayPrayerData,
    tomorrowPrayerData
  );

  return {
    // date & day control
    selectedDay,
    selectedDate,
    handleDayChange,

    // string formatters
    shortTimeString,
    dateString,
    formatTimeRemaining,
    getDayLabel,

    // prayer schedule
    prayerData,
    currentPrayer,
    nextPrayer,
    timeToNext,
  };
}
