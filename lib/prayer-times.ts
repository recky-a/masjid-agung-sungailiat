// lib/prayer-times.ts

import { DHUHA_OFFSET_MINUTES } from '@/constants/prayer-constants';
import { AladhanCalendarDay, LakuApikDailyTimings } from '@/types/api';
import fs from 'fs/promises';
import path from 'path';

/**
 * The final, locale-specific prayer time format (Kemenag).
 */
export interface PrayerTimes {
  imsak: string;
  subuh: string;
  terbit: string;
  duha: string;
  zuhur: string;
  asar: string;
  magrib: string;
  "isya'": string;
}

const mosqueCoordinates = {
  latitude: -1.8810974841213086,
  longitude: 106.10406820828352,
};

/**
 * Dynamically generates API endpoints for the given year and month.
 */
const getApiEndpoints = (year: string, month: string) => ({
  aladhan: `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${mosqueCoordinates.latitude}&longitude=${mosqueCoordinates.longitude}`,
  lakuapik: `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/sungailiat/${year}/${month.padStart(2, '0')}.json`,
});

/**
 * Maps raw data from either Al-Adhan or Lakuapik to the standard PrayerTimes interface.
 */
const mapToLocaleFormat = (
  dailyData: AladhanCalendarDay | LakuApikDailyTimings,
  source: 'aladhan' | 'lakuapik'
): PrayerTimes => {
  if (source === 'aladhan') {
    const timings = (dailyData as AladhanCalendarDay).timings;
    const sunriseTime = timings.Sunrise.split(' ')[0];

    // --- Start of Dhuha Time Calculation ---
    const [sunriseHours, sunriseMinutes] = sunriseTime.split(':').map(Number);
    const dhuhaDate = new Date();
    dhuhaDate.setHours(sunriseHours, sunriseMinutes, 0, 0);
    dhuhaDate.setMinutes(dhuhaDate.getMinutes() + DHUHA_OFFSET_MINUTES);
    const dhuhaTime = `${dhuhaDate.getHours().toString().padStart(2, '0')}:${dhuhaDate.getMinutes().toString().padStart(2, '0')}`;
    // --- End of Dhuha Time Calculation ---

    return {
      imsak: timings.Imsak.split(' ')[0],
      subuh: timings.Fajr.split(' ')[0],
      terbit: sunriseTime,
      duha: dhuhaTime,
      zuhur: timings.Dhuhr.split(' ')[0],
      asar: timings.Asr.split(' ')[0],
      magrib: timings.Maghrib.split(' ')[0],
      "isya'": timings.Isha.split(' ')[0],
    };
  } else {
    const timings = dailyData as LakuApikDailyTimings;
    return {
      imsak: timings.imsyak,
      subuh: timings.shubuh,
      terbit: timings.terbit,
      duha: timings.dhuha,
      zuhur: timings.dzuhur,
      asar: timings.ashr,
      magrib: timings.magrib,
      "isya'": timings.isya,
    };
  }
};

/**
 * Reads the monthly prayer schedule from local JSON files.
 */
async function readPrayerScheduleFromFile(year: string, month: string) {
  const paddedMonth = month.padStart(2, '0');
  const basePath = path.join(process.cwd(), 'data', 'prayer-schedule');
  const lakuapikPath = path.join(
    basePath,
    'lakuapik',
    `${year}-${paddedMonth}.json`
  );
  const aladhanPath = path.join(
    basePath,
    'aladhan',
    `${year}-${paddedMonth}.json`
  );

  try {
    const fileContents = await fs.readFile(lakuapikPath, 'utf8');
    const data = JSON.parse(fileContents);
    console.log('✅ Read data from local primary source: Lakuapik JSON');
    return { data, source: 'lakuapik' as const };
  } catch {
    console.warn('🟡 Local primary source failed. Attempting fallback...');
    try {
      const fileContents = await fs.readFile(aladhanPath, 'utf8');
      const result = JSON.parse(fileContents);
      console.log('✅ Read data from local fallback source: Aladhan JSON');
      return { data: result.data || result, source: 'aladhan' as const };
    } catch {
      console.error('🔴 Local fallback source failed.');
      return null;
    }
  }
}

/**
 * Fetches the monthly prayer schedule from remote APIs.
 */
async function fetchPrayerScheduleFromApi(year: string, month: string) {
  const endpoints = getApiEndpoints(year, month);
  const cacheConfig = { next: { revalidate: 86400 } }; // Revalidate once a day

  try {
    const response = await fetch(endpoints.lakuapik, cacheConfig);
    if (!response.ok)
      throw new Error(`Lakuapik API failed: ${response.status}`);
    const data = await response.json();
    console.log('✅ Fetched data from remote primary source: Lakuapik API');
    return { data, source: 'lakuapik' as const };
  } catch {
    console.warn('🟡 Remote primary source failed. Attempting fallback...');
    try {
      const response = await fetch(endpoints.aladhan, cacheConfig);
      if (!response.ok)
        throw new Error(`Al-Adhan API failed: ${response.status}`);
      const result = await response.json();
      if (result.code !== 200) throw new Error('Al-Adhan API returned non-200');
      console.log('✅ Fetched data from remote fallback source: Al-Adhan API');
      return { data: result.data, source: 'aladhan' as const };
    } catch {
      console.error('🔴 Remote fallback source failed.');
      return null;
    }
  }
}

/**
 * Finds daily prayer data from a monthly schedule.
 * IMPROVEMENT: This function is now more robust.
 */
function findDailyData(
  monthlyData: (AladhanCalendarDay | LakuApikDailyTimings)[],
  source: 'aladhan' | 'lakuapik',
  date: Date
) {
  const day = date.getDate();
  if (source === 'aladhan') {
    return (monthlyData as AladhanCalendarDay[]).find(
      (d) => parseInt(d.date.gregorian.day, 10) === day
    );
  } else {
    // IMPROVEMENT: Find by matching date string instead of relying on array index.
    const targetDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // FIX: Add a check for `d` to prevent accessing properties on null.
    return (monthlyData as LakuApikDailyTimings[]).find(
      (d) => d && d.tanggal === targetDate
    );
  }
}

export async function getPrayerScheduleByDay(
  date: Date
): Promise<PrayerTimes | null> {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();

  let monthlySchedule = await readPrayerScheduleFromFile(year, month);

  if (!monthlySchedule) {
    console.log('🔄 Local sources failed, attempting to fetch from API...');
    monthlySchedule = await fetchPrayerScheduleFromApi(year, month);
  }

  if (!monthlySchedule) {
    console.error('🔴 All data sources failed for the requested month');
    return null;
  }

  const { data, source } = monthlySchedule;
  const dailyData = findDailyData(data, source, date);

  if (!dailyData) {
    console.error(
      `Could not find schedule for ${date.toDateString()} in the fetched data.`
    );
    return null;
  }

  return mapToLocaleFormat(dailyData, source);
}

// ... rest of the file is unchanged
/**
 * Gets TODAY's prayer schedule.
 */
export async function getTodaysPrayerSchedule(): Promise<PrayerTimes | null> {
  return getPrayerScheduleByDay(new Date());
}

/**
 * Gets YESTERDAY's prayer schedule.
 */
export async function getYesterdaysPrayerSchedule(): Promise<PrayerTimes | null> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getPrayerScheduleByDay(yesterday);
}

/**
 * Gets TOMORROW's prayer schedule.
 */
export async function getTomorrowsPrayerSchedule(): Promise<PrayerTimes | null> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getPrayerScheduleByDay(tomorrow);
}
