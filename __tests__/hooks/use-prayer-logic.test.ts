import { usePrayerLogic } from '@/hooks/use-prayer-logic';
import { PrayerTimes } from '@/lib/prayer-times';
import { renderHook } from '@testing-library/react';

const mockTodayData: PrayerTimes = {
  imsak: '04:20',
  subuh: '04:30',
  terbit: '05:50',
  duha: '06:14',
  zuhur: '11:55',
  asar: '15:20',
  magrib: '17:55',
  "isya'": '19:10',
};

const mockTomorrowData: PrayerTimes = {
  imsak: '04:21',
  subuh: '04:31',
  terbit: '05:51',
  duha: '06:15',
  zuhur: '11:56',
  asar: '15:21',
  magrib: '17:56',
  "isya'": '19:11',
};

describe('usePrayerLogic Hook', () => {
  it('should identify Zuhur as current prayer', () => {
    const getCurrentTimeInMinutes = () => 12 * 60; // 12:00
    const { result } = renderHook(() =>
      usePrayerLogic(mockTodayData, mockTomorrowData, getCurrentTimeInMinutes)
    );
    const { currentPrayer, nextPrayer } = result.current.getCurrentPrayerInfo();

    expect(currentPrayer.name).toBe('zuhur');
    expect(nextPrayer.name).toBe('asar');
  });

  it('should identify Isya as current and Imsak (tomorrow) as next prayer', () => {
    const getCurrentTimeInMinutes = () => 22 * 60; // 22:00
    const { result } = renderHook(() =>
      usePrayerLogic(mockTodayData, mockTomorrowData, getCurrentTimeInMinutes)
    );
    const { currentPrayer, nextPrayer, timeToNext } =
      result.current.getCurrentPrayerInfo();

    expect(currentPrayer.name).toBe("isya'");
    expect(nextPrayer.name).toBe('imsak'); // from tomorrow's data
    expect(nextPrayer.time).toBe('04:21');
    // Time from 22:00 to 04:21 is 6 hours and 21 minutes = 381 minutes
    expect(timeToNext).toBe(381);
  });

  it('should handle time before the first prayer of the day', () => {
    const getCurrentTimeInMinutes = () => 2 * 60; // 02:00
    const { result } = renderHook(() =>
      usePrayerLogic(mockTodayData, mockTomorrowData, getCurrentTimeInMinutes)
    );
    // The logic correctly uses tomorrow's data after midnight.
    const { currentPrayer, nextPrayer, timeToNext } =
      result.current.getCurrentPrayerInfo();

    expect(currentPrayer.name).toBe("isya'");
    expect(nextPrayer.name).toBe('imsak');
    // Time from 02:00 to tomorrow's Imsak at 04:21 is 2 hours and 21 minutes = 141 minutes
    expect(timeToNext).toBe(141);
  });
});
