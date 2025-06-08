import PrayerScheduleUI from '@/components/prayer/prayer-schedule-ui';
import { PrayerTimes } from '@/lib/prayer-times';
import { fireEvent, render, screen, within } from '@testing-library/react';

// Mock the useMediaQuery hook
jest.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: jest.fn(),
}));

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

const mockYesterdayData: PrayerTimes = {
  imsak: '04:19',
  subuh: '04:29',
  terbit: '05:49',
  duha: '06:13',
  zuhur: '11:54',
  asar: '15:19',
  magrib: '17:54',
  "isya'": '19:09',
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

describe('PrayerScheduleUI', () => {
  beforeEach(() => {
    // Mock useMediaQuery to return true (desktop view)
    (
      require('@/hooks/use-media-query').useMediaQuery as jest.Mock
    ).mockReturnValue(true);
    // Mock date to a specific time for consistent results
    jest.useFakeTimers().setSystemTime(new Date('2025-06-08T12:00:00'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the desktop prayer schedule correctly for today', () => {
    render(
      <PrayerScheduleUI
        todayPrayerData={mockTodayData}
        yesterdayPrayerData={mockYesterdayData}
        tomorrowPrayerData={mockTomorrowData}
      />
    );

    expect(screen.getByText('11:55')).toBeInTheDocument();
    expect(screen.getByText('Hari Ini')).toBeInTheDocument();

    // Check current prayer status (12:00 is during Zuhur)
    const statusSection = screen.getByLabelText('Status sholat');
    // Check that "Zuhur" is bold within the status section
    const currentPrayer = within(statusSection).getByText('Zuhur');
    expect(currentPrayer).toBeInTheDocument();
    expect(currentPrayer.tagName).toBe('STRONG');
    expect(within(statusSection).getByText(/Menuju: Asar/)).toBeInTheDocument();
  });

  it('switches to tomorrow view on button click', () => {
    render(
      <PrayerScheduleUI
        todayPrayerData={mockTodayData}
        yesterdayPrayerData={mockYesterdayData}
        tomorrowPrayerData={mockTomorrowData}
      />
    );

    const nextDayButton = screen.getAllByRole('button')[1]; // Second button is the next day button
    fireEvent.click(nextDayButton);

    // Check if tomorrow's data is now visible
    expect(screen.getByText('Besok')).toBeInTheDocument();
    expect(screen.getByText('11:56')).toBeInTheDocument(); // Tomorrow's zuhur
  });

  it('switches to yesterday view on button click', () => {
    render(
      <PrayerScheduleUI
        todayPrayerData={mockTodayData}
        yesterdayPrayerData={mockYesterdayData}
        tomorrowPrayerData={mockTomorrowData}
      />
    );

    const prevDayButton = screen.getAllByRole('button')[0]; // First button is the prev day button
    fireEvent.click(prevDayButton);

    // Check if yesterday's data is now visible
    expect(screen.getByText('Kemarin')).toBeInTheDocument();
    expect(screen.getByText('11:54')).toBeInTheDocument(); // Yesterday's zuhur
  });
});
