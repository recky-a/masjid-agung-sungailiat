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
import { useLayoutEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

// SEO-optimized PrayerCard component dengan bahasa Indonesia
function PrayerCard({
  prayer,
  time,
  isCurrent,
  onRef,
  date,
}: {
  prayer: string;
  time: string;
  isCurrent: boolean;
  onRef: (el: HTMLElement | null) => void;
  date: string;
}) {
  const Icon = prayerIcons[prayer as keyof typeof prayerIcons];
  const prayerDisplayName = prayerNames[prayer as keyof typeof prayerNames];

  return (
    <article
      data-slot="prayer-times"
      ref={isCurrent ? onRef : null}
      // SEO: Added semantic attributes and structured data dalam bahasa Indonesia
      itemScope
      itemType="https://schema.org/Event"
      role="article"
      aria-label={`Waktu sholat ${prayerDisplayName}: ${time} pada tanggal ${date}`}
      className={`flex flex-shrink-0 snap-center flex-col items-center gap-1 rounded-xl border p-3 shadow-sm transition-all duration-300 ${
        isCurrent
          ? `bg-gradient-to-br ${prayerColors[prayer]} font-semibold text-white shadow-md ${prayerGlows[prayer]}`
          : 'bg-muted border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300'
      } hover:scale-[1.03] hover:shadow-lg`}
    >
      {/* SEO: Added structured data for search engines dalam bahasa Indonesia */}
      <meta itemProp="name" content={`Sholat ${prayerDisplayName}`} />
      <meta itemProp="startDate" content={`${date}T${time}:00`} />
      <meta
        itemProp="eventAttendanceMode"
        content="https://schema.org/MixedEventAttendanceMode"
      />
      <meta itemProp="category" content="Acara Keagamaan" />
      <meta itemProp="inLanguage" content="id" />

      <Icon
        className="h-6 w-6"
        aria-hidden="true"
        role="img"
        aria-label={`Ikon sholat ${prayerDisplayName}`}
      />
      <span
        className="text-xs tracking-wide"
        itemProp="name"
        role="heading"
        aria-level={3}
      >
        {prayerDisplayName}
      </span>
      <time
        className="font-mono text-sm"
        itemProp="startTime"
        dateTime={`${date}T${time}:00`}
        aria-label={`Waktu sholat: ${time}`}
      >
        {time}
      </time>
    </article>
  );
}

// Define DaySelection type for clarity and type safety
type DaySelection = 'yesterday' | 'today' | 'tomorrow';

// SEO-optimized DateNavigation component dengan bahasa Indonesia
function DateNavigation({
  selectedDay,
  onDayChange,
  getDayLabel,
  dateString,
  selectedDate,
}: {
  selectedDay: DaySelection;
  onDayChange: (day: DaySelection) => void;
  getDayLabel: (day: DaySelection) => string;
  dateString: (date: Date) => string;
  selectedDate: Date;
}) {
  const handlePrevious = () => {
    if (selectedDay === 'today') onDayChange('yesterday');
    else if (selectedDay === 'tomorrow') onDayChange('today');
  };

  const handleNext = () => {
    if (selectedDay === 'yesterday') onDayChange('today');
    else if (selectedDay === 'today') onDayChange('tomorrow');
  };

  const currentDateISO = selectedDate.toISOString().split('T')[0];

  return (
    <nav
      className="flex flex-shrink-0 items-center md:gap-1 lg:gap-2"
      aria-label="Navigasi tanggal jadwal sholat"
      role="navigation"
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={handlePrevious}
        disabled={selectedDay === 'yesterday'}
        aria-label="Lihat jadwal sholat hari sebelumnya"
        title="Hari sebelumnya"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </Button>

      <div className="text-center font-semibold lg:min-w-[130px]">
        <p
          className="md:text-xs lg:text-sm xl:text-base"
          role="heading"
          aria-level={2}
        >
          {getDayLabel(selectedDay)}
        </p>
        <time
          className="text-muted-foreground md:text-[0.65rem] lg:text-xs"
          dateTime={currentDateISO}
          aria-label={`Tanggal yang dipilih: ${dateString(selectedDate)}`}
        >
          {dateString(selectedDate)}
        </time>
      </div>

      <Button
        size="icon"
        variant="ghost"
        onClick={handleNext}
        disabled={selectedDay === 'tomorrow'}
        aria-label="Lihat jadwal sholat hari berikutnya"
        title="Hari berikutnya"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}

// SEO-optimized PrayerStatus component dengan bahasa Indonesia
function PrayerStatus({
  currentPrayer,
  nextPrayer,
  timeToNext,
  formatTimeRemaining,
}: {
  currentPrayer: { displayName: string };
  nextPrayer: { displayName: string };
  timeToNext: number;
  formatTimeRemaining: (time: number) => string;
}) {
  return (
    <aside
      aria-label="Status sholat saat ini dan informasi sholat berikutnya"
      className="ml-auto flex min-w-[180px] flex-col items-end gap-1 text-right"
      role="complementary"
    >
      <div className="text-primary flex items-center gap-1 font-semibold">
        <Clock className="h-5 w-5" aria-hidden="true" />
        <span role="heading" aria-level={2}>
          Status Sholat
        </span>
      </div>
      <p aria-live="polite">
        Sekarang: <strong>{currentPrayer.displayName}</strong>
      </p>
      <p
        className="text-muted-foreground"
        aria-live="polite"
        aria-label={`Sholat berikutnya: ${nextPrayer.displayName} dalam ${formatTimeRemaining(timeToNext)}`}
      >
        Menuju: {nextPrayer.displayName} ({formatTimeRemaining(timeToNext)})
      </p>
    </aside>
  );
}

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

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const activePrayerTimeRef = useRef<HTMLElement | null>(null);

  // Simplified scroll function
  const scrollToActiveElement = () => {
    if (activePrayerTimeRef.current) {
      requestAnimationFrame(() => {
        activePrayerTimeRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      });
    }
  };

  // Simplified ref callback
  const setActivePrayerRef = (el: HTMLElement | null) => {
    activePrayerTimeRef.current = el;
  };

  // Handle mouse wheel scrolling for the ScrollArea
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scrollContainer = scrollAreaRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]'
    );
    if (scrollContainer) {
      scrollContainer.scrollLeft += e.deltaY;
    }
  };

  useLayoutEffect(() => {
    const timeoutId = setTimeout(scrollToActiveElement, 100);
    return () => clearTimeout(timeoutId);
  }, [selectedDay, currentPrayer.name]);

  const prayerEntries = Object.entries(prayerData);
  const currentDateISO = selectedDate.toISOString().split('T')[0];

  return (
    <header
      aria-label="Jadwal sholat Islam untuk desktop"
      className="flex items-center border-b bg-white shadow-sm select-none md:gap-2 md:px-2 md:py-2 md:text-xs lg:gap-6 lg:px-6 lg:py-3 lg:text-sm dark:bg-gray-900"
      role="banner"
      // SEO: Added structured data for the entire prayer schedule dalam bahasa Indonesia
      itemScope
      itemType="https://schema.org/Schedule"
    >
      {/* SEO: Hidden structured data for search engines dalam bahasa Indonesia */}
      <meta itemProp="name" content="Jadwal Sholat Harian" />
      <meta
        itemProp="description"
        content="Jadwal waktu sholat Islam menampilkan lima waktu sholat harian dengan status terkini"
      />
      <meta itemProp="category" content="Jadwal Keagamaan" />
      <meta
        itemProp="keywords"
        content="waktu sholat, jadwal sholat, waktu salat, jadwal salat, sholat lima waktu"
      />
      <meta itemProp="inLanguage" content="id" />

      {/* Navigasi tanggal */}
      <DateNavigation
        selectedDay={selectedDay}
        onDayChange={handleDayChange}
        getDayLabel={getDayLabel}
        dateString={dateString}
        selectedDate={selectedDate}
      />

      {/* Jadwal Sholat */}
      <div onWheel={handleWheel} role="main" aria-label="Jadwal waktu sholat">
        <ScrollArea className="md:w-48 lg:w-80 xl:w-full" ref={scrollAreaRef}>
          <section
            aria-label={`Jadwal sholat untuk ${getDayLabel(selectedDay)}, ${dateString(selectedDate)}`}
            className="flex snap-x snap-mandatory items-center scroll-smooth md:gap-3 lg:gap-6"
            role="region"
            aria-live="polite"
          >
            <h2 className="sr-only">
              Jadwal Waktu Sholat Islam untuk {getDayLabel(selectedDay)},{' '}
              {dateString(selectedDate)}
            </h2>
            {prayerEntries.map(([prayer, time]) => {
              const isCurrent =
                selectedDay === 'today' && currentPrayer.name === prayer;

              return (
                <PrayerCard
                  key={prayer}
                  prayer={prayer}
                  time={time}
                  isCurrent={isCurrent}
                  onRef={setActivePrayerRef}
                  date={currentDateISO}
                />
              );
            })}
          </section>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Status Sholat */}
      {selectedDay === 'today' && (
        <PrayerStatus
          currentPrayer={currentPrayer}
          nextPrayer={nextPrayer}
          timeToNext={timeToNext}
          formatTimeRemaining={formatTimeRemaining}
        />
      )}
    </header>
  );
}
