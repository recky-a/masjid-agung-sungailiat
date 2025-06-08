'use client';

import {
  prayerColors,
  prayerGlows,
  prayerIcons,
  prayerNames,
} from '@/constants/prayer-constants';
import { usePrayerSchedule } from '@/hooks/use-prayer-schedule';
import { PrayerTimes } from '@/lib/prayer-times';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '../ui/button';

export default function DesktopPrayerSchedule({
  todayPrayerData,
  yesterdayPrayerData,
  tomorrowPrayerData,
}: {
  todayPrayerData: PrayerTimes;
  yesterdayPrayerData: PrayerTimes | null;
  tomorrowPrayerData: PrayerTimes | null;
}) {
  const {
    selectedDay,
    selectedDate,
    handleDayChange,
    dateString,
    getDayLabel,
    prayerData,
    currentPrayer,
    nextPrayer,
    timeToNext,
    formatTimeRemaining,
  } = usePrayerSchedule(
    todayPrayerData,
    yesterdayPrayerData,
    tomorrowPrayerData
  );

  return (
    <nav
      aria-label="Jadwal sholat desktop"
      className="flex items-center gap-6 border-b bg-white px-6 py-3 text-sm shadow-sm select-none dark:bg-gray-900"
    >
      {/* Navigasi tanggal */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            if (selectedDay === 'today') handleDayChange('yesterday');
            else if (selectedDay === 'tomorrow') handleDayChange('today');
          }}
          disabled={selectedDay === 'yesterday'}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-[130px] text-center font-semibold">
          <p>{getDayLabel(selectedDay)}</p>
          <p className="text-muted-foreground text-xs">
            {dateString(selectedDate)}
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            if (selectedDay === 'yesterday') handleDayChange('today');
            else if (selectedDay === 'today') handleDayChange('tomorrow');
          }}
          disabled={selectedDay === 'tomorrow'}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Jadwal Sholat */}
      <section
        aria-label="Jadwal sholat"
        className="flex flex-grow flex-wrap items-center gap-6"
      >
        {Object.entries(prayerData).map(([prayer, time]) => {
          const Icon = prayerIcons[prayer as keyof typeof prayerIcons];
          const isCurrent =
            selectedDay === 'today' && currentPrayer.name === prayer;

          return (
            <article
              key={prayer}
              className={`flex flex-col items-center gap-1 rounded-xl border p-3 shadow-sm transition-all duration-300 ${
                isCurrent
                  ? `bg-gradient-to-br ${prayerColors[prayer]} font-semibold text-white shadow-md ${prayerGlows[prayer]}`
                  : 'bg-muted border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300'
              } hover:scale-[1.03] hover:shadow-lg`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs tracking-wide">
                {prayerNames[prayer as keyof typeof prayerNames]}
              </span>
              <span className="font-mono text-sm">{time}</span>
            </article>
          );
        })}
      </section>

      {/* Status Sholat */}
      {selectedDay === 'today' && (
        <aside
          aria-label="Status sholat"
          className="ml-auto flex min-w-[180px] flex-col items-end gap-1 text-right"
        >
          <div className="text-primary flex items-center gap-1 font-semibold">
            <Clock className="h-5 w-5" />
            <span>Status Sholat</span>
          </div>
          <p>
            Sekarang: <strong>{currentPrayer.displayName}</strong>
          </p>
          <p className="text-muted-foreground">
            Menuju: {nextPrayer.displayName} ({formatTimeRemaining(timeToNext)})
          </p>
        </aside>
      )}
    </nav>
  );
}
