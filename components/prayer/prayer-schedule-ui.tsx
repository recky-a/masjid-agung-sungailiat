'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import { PrayerTimes } from '@/lib/prayer-times';
import DesktopPrayerSchedule from './desktop-prayer-schedule';
import MobilePrayerSchedule from './mobile-prayer-schedule';

export default function PrayerScheduleUI({
  todayPrayerData,
  yesterdayPrayerData,
  tomorrowPrayerData,
}: {
  todayPrayerData: PrayerTimes;
  yesterdayPrayerData: PrayerTimes | null;
  tomorrowPrayerData: PrayerTimes | null;
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <DesktopPrayerSchedule
        todayPrayerData={todayPrayerData}
        yesterdayPrayerData={yesterdayPrayerData}
        tomorrowPrayerData={tomorrowPrayerData}
      />
    );
  }
  return (
    <MobilePrayerSchedule
      todayPrayerData={todayPrayerData}
      yesterdayPrayerData={yesterdayPrayerData}
      tomorrowPrayerData={tomorrowPrayerData}
    />
  );
}
