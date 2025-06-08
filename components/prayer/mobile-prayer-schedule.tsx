'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  prayerColors,
  prayerGlows,
  prayerIcons,
  prayerNames,
} from '@/constants/prayer-constants';
import { usePrayerSchedule } from '@/hooks/use-prayer-schedule';
import { PrayerTimes } from '@/lib/prayer-times';
import {
  Calendar,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';

export default function MobilePrayerSchedule({
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-muted flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
        >
          <Calendar className="text-muted-foreground h-5 w-5" />
          <span>Jadwal Sholat</span>
          <ChevronDownIcon className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-background w-[95vw] max-w-md rounded-lg border p-4 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
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
          <div className="flex-1 text-center">
            <p className="text-sm font-semibold">{getDayLabel(selectedDay)}</p>
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

        {/* Prayer Grid */}
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(prayerData).map(([prayer, time]) => {
            const Icon = prayerIcons[prayer];
            const isCurrent =
              selectedDay === 'today' && currentPrayer.name === prayer;
            return (
              <div
                key={prayer}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center text-xs transition-all ${
                  isCurrent
                    ? `bg-gradient-to-br ${prayerColors[prayer]} text-white shadow-md ${prayerGlows[prayer]}`
                    : 'bg-muted border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="mb-1 h-5 w-5" />
                <div>{prayerNames[prayer as keyof typeof prayerNames]}</div>
                <div className="font-mono text-sm">{time}</div>
              </div>
            );
          })}
        </div>

        {/* Prayer Status */}
        {selectedDay === 'today' && (
          <div className="bg-muted/30 mt-4 rounded-md p-3 text-sm">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="text-muted-foreground h-4 w-4" />
              <span className="font-medium">Status Sholat</span>
            </div>
            <div className="flex justify-between">
              <span>Sekarang:</span>
              <span className="text-primary font-bold">
                {currentPrayer.displayName}
              </span>
            </div>
            <div className="text-muted-foreground flex justify-between">
              <span>Menuju:</span>
              <span>
                {nextPrayer.displayName} ({formatTimeRemaining(timeToNext)})
              </span>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
