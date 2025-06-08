import { ThemeToggle } from '@/components/theme-toggle';
import PrayerSchedule from './prayer-schedule';
import SearchBar from './search-bar';

export default function Topbar() {
  return (
    <div className="flex w-full max-w-full items-center justify-between gap-2 p-4">
      <ThemeToggle />
      <PrayerSchedule />
      <SearchBar />
    </div>
  );
}
