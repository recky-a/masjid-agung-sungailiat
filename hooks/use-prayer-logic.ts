import { prayerNames } from '@/constants/prayer-constants';
import { PrayerTimes } from '@/lib/prayer-times';

/**
 * Custom hook for managing prayer time logic.
 * @param todayPrayerData - Prayer times for the current day.
 * @param yesterdayPrayerData - Prayer times for the previous day.
 * @param tomorrowPrayerData - Prayer times for the next day.
 * @param getCurrentTimeInMinutes - Function to get the current time in minutes.
 * @returns An object with functions and data for prayer logic.
 */
export const usePrayerLogic = (
  todayPrayerData: PrayerTimes,
  yesterdayPrayerData: PrayerTimes | null,
  tomorrowPrayerData: PrayerTimes | null,
  getCurrentTimeInMinutes: () => number
) => {
  const prayerTimeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentPrayerInfo = () => {
    const currentTime = getCurrentTimeInMinutes();

    const prayers = Object.entries(todayPrayerData).map(([name, time]) => ({
      name,
      time,
      minutes: prayerTimeToMinutes(time),
      displayName: prayerNames[name as keyof typeof prayerNames],
    }));
    prayers.sort((a, b) => a.minutes - b.minutes);

    // Case 1: Before the first prayer of the day (e.g., 2 AM)
    if (currentTime < prayers[0].minutes) {
      const currentPrayer = {
        name: "isya'",
        time: yesterdayPrayerData?.["isya'"] ?? '--:--',
        minutes: yesterdayPrayerData
          ? prayerTimeToMinutes(yesterdayPrayerData["isya'"])
          : 0,
        displayName: prayerNames["isya'"],
      };
      const nextPrayer = prayers[0];
      const timeToNext = nextPrayer.minutes - currentTime;
      return { currentPrayer, nextPrayer, timeToNext, prayers };
    }

    // Case 2: During the day, between prayers
    for (let i = 0; i < prayers.length; i++) {
      const isLastPrayer = i === prayers.length - 1;
      const prayer = prayers[i];
      const nextPrayerInList = prayers[i + 1];

      if (
        currentTime >= prayer.minutes &&
        (isLastPrayer || currentTime < nextPrayerInList.minutes)
      ) {
        const currentPrayer = prayer;
        let nextPrayer;
        let timeToNext;

        if (isLastPrayer) {
          // Case 3: After the last prayer of the day (Isya)
          if (tomorrowPrayerData) {
            const nextImsakMinutes = prayerTimeToMinutes(
              tomorrowPrayerData.imsak
            );
            nextPrayer = {
              name: 'imsak',
              time: tomorrowPrayerData.imsak,
              minutes: nextImsakMinutes,
              displayName: prayerNames.imsak,
            };
            // Time from now until midnight + time from midnight to next Imsak
            timeToNext = 24 * 60 - currentTime + nextImsakMinutes;
          } else {
            // Fallback if tomorrow's data isn't available
            nextPrayer = {
              name: 'imsak',
              displayName: 'Imsak',
              time: '--:--',
              minutes: 0,
            };
            timeToNext = 0;
          }
        } else {
          nextPrayer = nextPrayerInList;
          timeToNext = nextPrayer.minutes - currentTime;
        }

        return { currentPrayer, nextPrayer, timeToNext, prayers };
      }
    }

    // Fallback, should ideally not be reached with sorted prayer times
    return {
      currentPrayer: prayers[prayers.length - 1],
      nextPrayer: prayers[0],
      timeToNext: 0,
      prayers,
    };
  };

  const formatTimeRemaining = (minutes: number) => {
    if (minutes <= 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  const getCurrentPrayerData = (
    selectedDay: 'yesterday' | 'today' | 'tomorrow'
  ) => {
    switch (selectedDay) {
      case 'yesterday':
        return yesterdayPrayerData || todayPrayerData;
      case 'tomorrow':
        return tomorrowPrayerData || todayPrayerData;
      default:
        return todayPrayerData;
    }
  };

  const getDayLabel = (selectedDay: 'yesterday' | 'today' | 'tomorrow') => {
    switch (selectedDay) {
      case 'yesterday':
        return 'Kemarin';
      case 'tomorrow':
        return 'Besok';
      default:
        return 'Hari Ini';
    }
  };

  return {
    getCurrentPrayerInfo,
    formatTimeRemaining,
    getCurrentPrayerData,
    getDayLabel,
  };
};
