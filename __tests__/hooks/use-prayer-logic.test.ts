import { usePrayerLogic } from '@/hooks/use-prayer-logic';
import { PrayerTimes } from '@/lib/prayer-times';
import { renderHook } from '@testing-library/react';

// Mock data for three consecutive days
const mockYesterdayData: PrayerTimes = {
  imsak: '04:19',
  subuh: '04:29',
  terbit: '05:49',
  duha: '06:13',
  zuhur: '11:54',
  asar: '15:19',
  magrib: '17:54',
  "isya'": '19:09', // Yesterday's Isya is at 1149 minutes
};

const mockTodayData: PrayerTimes = {
  imsak: '04:20', // Today's Imsak is at 260 minutes
  subuh: '04:30',
  terbit: '05:50',
  duha: '06:14',
  zuhur: '11:55', // 715 minutes
  asar: '15:20', // 920 minutes
  magrib: '17:55',
  "isya'": '19:10', // 1150 minutes
};

const mockTomorrowData: PrayerTimes = {
  imsak: '04:21', // Tomorrow's Imsak is at 261 minutes
  subuh: '04:31',
  terbit: '05:51',
  duha: '06:15',
  zuhur: '11:56',
  asar: '15:21',
  magrib: '17:56',
  "isya'": '19:11',
};

describe('usePrayerLogic Hook', () => {
  it('should identify Zuhur as the current prayer and Asar as the next', () => {
    // Mock current time to 12:00 (720 minutes)
    const getCurrentTimeInMinutes = () => 12 * 60;
    const { result } = renderHook(() =>
      usePrayerLogic(
        mockTodayData,
        mockYesterdayData,
        mockTomorrowData,
        getCurrentTimeInMinutes
      )
    );
    const { currentPrayer, nextPrayer, timeToNext } =
      result.current.getCurrentPrayerInfo();

    expect(currentPrayer.name).toBe('zuhur');
    expect(nextPrayer.name).toBe('asar');
    expect(timeToNext).toBe(200); // 920 (Asar) - 720 (now)
  });

  it('should identify Isya as current and Imsak (tomorrow) as next prayer', () => {
    // Mock current time to 22:00 (1320 minutes)
    const getCurrentTimeInMinutes = () => 22 * 60;
    const { result } = renderHook(() =>
      usePrayerLogic(
        mockTodayData,
        mockYesterdayData,
        mockTomorrowData,
        getCurrentTimeInMinutes
      )
    );
    const { currentPrayer, nextPrayer, timeToNext } =
      result.current.getCurrentPrayerInfo();

    expect(currentPrayer.name).toBe("isya'");
    expect(currentPrayer.time).toBe('19:10');
    expect(nextPrayer.name).toBe('imsak');
    expect(nextPrayer.time).toBe('04:21'); // From tomorrow's data

    // Time from 22:00 to 04:21 is 6 hours and 21 minutes
    // (24*60 - 1320) + 261 = 120 + 261 = 381 minutes
    expect(timeToNext).toBe(381);
  });

  it('should identify Isya (yesterday) as current and Imsak (today) as next prayer', () => {
    // Mock current time to 02:00 (120 minutes)
    const getCurrentTimeInMinutes = () => 2 * 60;
    const { result } = renderHook(() =>
      usePrayerLogic(
        mockTodayData,
        mockYesterdayData,
        mockTomorrowData,
        getCurrentTimeInMinutes
      )
    );
    const { currentPrayer, nextPrayer, timeToNext } =
      result.current.getCurrentPrayerInfo();

    // The current prayer is technically still Isya from the previous day.
    expect(currentPrayer.name).toBe("isya'");
    expect(currentPrayer.time).toBe('19:09'); // From yesterday's data

    // The next prayer is Imsak of the current day.
    expect(nextPrayer.name).toBe('imsak');
    expect(nextPrayer.time).toBe('04:20');

    // Time from 02:00 to 04:20 is 2 hours and 20 minutes
    expect(timeToNext).toBe(140); // 260 (Imsak) - 120 (now)
  });
});
