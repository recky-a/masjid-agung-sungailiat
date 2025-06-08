import PrayerScheduleUI from '@/components/prayer/prayer-schedule-ui';
import {
  getTodaysPrayerSchedule,
  getTomorrowsPrayerSchedule,
  getYesterdaysPrayerSchedule,
} from '@/lib/prayer-times';

export default async function PrayerSchedule() {
  const [todayPrayerData, yesterdayPrayerData, tomorrowPrayerData] =
    await Promise.all([
      getTodaysPrayerSchedule(),
      getYesterdaysPrayerSchedule(),
      getTomorrowsPrayerSchedule(),
    ]);

  if (!todayPrayerData) {
    return (
      <div className="text-center text-red-500">
        <p>Tidak dapat memuat waktu sholat. Silakan coba lagi nanti.</p>
      </div>
    );
  }

  return (
    <PrayerScheduleUI
      todayPrayerData={todayPrayerData}
      yesterdayPrayerData={yesterdayPrayerData}
      tomorrowPrayerData={tomorrowPrayerData}
    />
  );
}
