import { getPrayerScheduleByDay } from '@/lib/prayer-times';
import fs from 'fs/promises';

// Mock successful fetch
global.fetch = jest.fn();
const mockedFetch = fetch as jest.Mock;

// This mock data is for a single day.
const mockLakuapikDataForDay8 = {
  tanggal: '2025-06-08',
  imsyak: '04:23',
  shubuh: '04:33',
  terbit: '05:52',
  dhuha: '06:16',
  dzuhur: '11:56',
  ashr: '15:21',
  magrib: '17:57',
  isya: '19:11',
};

// We create a full month array (sparse) and place the mock data at the correct index for day 8.
// This correctly simulates the structure of the actual JSON file.
const mockLakuapikMonthData = new Array(30).fill(null);
mockLakuapikMonthData[7] = mockLakuapikDataForDay8; // Index 7 for the 8th day.

const mockAladhanData = {
  code: 200,
  status: 'OK',
  data: [
    {
      timings: {
        Fajr: '04:31 (WIB)',
        Sunrise: '05:54 (WIB)',
        Dhuhr: '11:55 (WIB)',
        Asr: '15:20 (WIB)',
        Maghrib: '17:55 (WIB)',
        Isha: '19:10 (WIB)',
        Imsak: '04:21 (WIB)',
      },
      date: { gregorian: { day: '08' } },
    },
  ],
};

describe('Prayer Times Logic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should return prayer schedule from local Lakuapik file', async () => {
    // Use the full month mock data
    const readFileSpy = jest
      .spyOn(fs, 'readFile')
      .mockResolvedValue(JSON.stringify(mockLakuapikMonthData));
    const date = new Date('2025-06-08T00:00:00.000Z');
    const schedule = await getPrayerScheduleByDay(date);

    expect(schedule).not.toBeNull();
    expect(schedule?.subuh).toBe('04:33');
    expect(schedule?.duha).toBe('06:16');
    expect(readFileSpy).toHaveBeenCalledWith(
      expect.stringContaining('lakuapik'),
      'utf8'
    );
    readFileSpy.mockRestore();
  });

  it('should fall back to local Aladhan file if Lakuapik fails', async () => {
    const readFileSpy = jest
      .spyOn(fs, 'readFile')
      .mockRejectedValueOnce(new Error('File not found'))
      .mockResolvedValueOnce(JSON.stringify(mockAladhanData));
    const date = new Date('2025-06-08T00:00:00.000Z');
    const schedule = await getPrayerScheduleByDay(date);

    expect(schedule).not.toBeNull();
    expect(schedule?.subuh).toBe('04:31');
    expect(schedule?.duha).toBe('06:18');
    expect(readFileSpy).toHaveBeenCalledTimes(2);
    readFileSpy.mockRestore();
  });

  it('should fall back to fetching from API if local files fail', async () => {
    const readFileSpy = jest
      .spyOn(fs, 'readFile')
      .mockRejectedValue(new Error('File not found'));
    // Use the full month mock data for the API response
    mockedFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockLakuapikMonthData),
    });
    const date = new Date('2025-06-08T00:00:00.000Z');
    const schedule = await getPrayerScheduleByDay(date);

    expect(schedule).not.toBeNull();
    expect(schedule?.subuh).toBe('04:33');
    expect(mockedFetch).toHaveBeenCalledWith(
      expect.stringContaining('lakuapik'),
      expect.any(Object)
    );
    readFileSpy.mockRestore();
  });
});
