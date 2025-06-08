import { prayerNames } from '@/constants/prayer-constants';
import { PrayerTimes } from '@/lib/prayer-times';

export const usePrayerLogic = (
  todayPrayerData: PrayerTimes,
  tomorrowPrayerData: PrayerTimes | null,
  getCurrentTimeInMinutes: () => number
) => {
  const getCurrentPrayerInfo = () => {
    const currentTime = getCurrentTimeInMinutes();

    const isAfterMidnight = currentTime < 180; // kurang dari 03.00, anggap hari sudah berganti

    const activePrayerData =
      isAfterMidnight && tomorrowPrayerData
        ? tomorrowPrayerData
        : todayPrayerData;

    const prayers = Object.entries(activePrayerData).map(([name, time]) => {
      const [hours, minutes] = time.split(':').map(Number);
      return {
        name,
        time,
        minutes: hours * 60 + minutes,
        displayName: prayerNames[name as keyof typeof prayerNames],
      };
    });

    prayers.sort((a, b) => a.minutes - b.minutes);

    let currentPrayer = prayers[0];
    let nextPrayer = prayers[1];
    let timeToNext = 0;

    for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      let next = prayers[i + 1];

      if (
        currentTime >= prayer.minutes &&
        (i === prayers.length - 1 || currentTime < prayers[i + 1].minutes)
      ) {
        currentPrayer = prayer;

        if (i === prayers.length - 1 && tomorrowPrayerData) {
          const [nextImsakHours, nextImsakMinutes] = tomorrowPrayerData.imsak
            .split(':')
            .map(Number);
          const nextImsakTotalMinutes = nextImsakHours * 60 + nextImsakMinutes;

          nextPrayer = {
            name: 'imsak',
            time: tomorrowPrayerData.imsak,
            minutes: nextImsakTotalMinutes,
            displayName: 'Imsak',
          };
          timeToNext = 24 * 60 - currentTime + nextImsakTotalMinutes;
        } else {
          next = prayers[i + 1] || prayers[0];
          nextPrayer = next;
          timeToNext = next.minutes - currentTime;
        }

        return { currentPrayer, nextPrayer, timeToNext, prayers };
      }
    }

    // fallback: jika waktu sekarang sebelum waktu imsak pertama
    if (currentTime < prayers[0].minutes) {
      currentPrayer = prayers[prayers.length - 1];
      nextPrayer = prayers[0];
      timeToNext = prayers[0].minutes - currentTime;
    }

    return { currentPrayer, nextPrayer, timeToNext, prayers };
  };

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}j ${mins}m`;
    }
    return `${mins}m`;
  };

  const getCurrentPrayerData = (
    selectedDay: 'yesterday' | 'today' | 'tomorrow',
    yesterdayPrayerData: PrayerTimes | null,
    tomorrowPrayerData: PrayerTimes | null
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
