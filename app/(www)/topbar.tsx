import { ThemeToggle } from "@/components/theme-toggle";
import PrayerTimes from "./prayer-times";
import SearchBar from "./search-bar";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between p-4 gap-2 w-full max-w-full">
      <ThemeToggle />
      <PrayerTimes />
      <SearchBar />
    </div>
  );
}
