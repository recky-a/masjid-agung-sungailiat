'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { getCurrentTimeSungailiat } from '@/lib/utils';
import { PrayerTime } from '@/types/prayer-times';
import { format, Locale } from 'date-fns';
import { id } from 'date-fns/locale'; // Default Indonesian locale
import { useEffect, useMemo, useState } from 'react';
import DesktopView from './desktop-view';
import MobileView from './mobile-view';

// Dummy data for UI preview - in a real app, this might be fetched or calculated
const prayerTimes: PrayerTime[] = [
  { label: 'Fajr', arabicName: 'الفجر', time: '05:00' },
  { label: 'Syuruq', arabicName: 'الشروق', time: '06:15' },
  { label: 'Dhuhr', arabicName: 'الظهر', time: '12:00' },
  { label: 'Asr', arabicName: 'العصر', time: '15:30' },
  { label: 'Maghrib', arabicName: 'المغرب', time: '18:45' },
  { label: 'Isha', arabicName: 'العشاء', time: '20:00' },
];

// Placeholder for upcoming prayer and time remaining logic
// In a real app, these would be dynamic based on current time and prayerTimes array
const upcomingPrayer = prayerTimes[2]; // Example: Dhuhr
const timeRemaining = '1h 15m'; // Example: time until Dhuhr

export default function PrayerTimes() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [currentSungailiatTime, setCurrentSungailiatTime] = useState(() =>
    getCurrentTimeSungailiat()
  );
  const [activeLocale, setActiveLocale] = useState<Locale>(id); // Default to Indonesian
  const [localeLoaded, setLocaleLoaded] = useState(true); // True for 'id' as it's pre-loaded

  // Effect for real-time clock update
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentSungailiatTime(getCurrentTimeSungailiat());
    }, 1000); // Update every second

    return () => clearInterval(clockInterval); // Cleanup interval on unmount
  }, []);

  // Effect for locale detection and dynamic loading
  useEffect(() => {
    // Initial state is 'id' and localeLoaded = true.
    // We only proceed to load if a different language is detected.
    const browserLang = navigator.language.toLowerCase(); // e.g., "en-us", "en", "id-id", "id"

    // Helper function to perform the loading
    const attemptLoadLocale = async () => {
      let newLocale: Locale | null = null;
      let localeSuccessfullyDetermined = false;

      try {
        if (browserLang.startsWith('en')) {
          const module = await import('date-fns/locale/en-US');
          newLocale = module.enUS; // Access the named export 'enUS'
          localeSuccessfullyDetermined = true;
        } else if (browserLang.startsWith('ar')) {
          const module = await import('date-fns/locale/ar-SA');
          newLocale = module.arSA; // Access the named export 'arSA'
          localeSuccessfullyDetermined = true;
        }
        // Add more language checks and dynamic imports as needed:
        // else if (browserLang.startsWith("fr")) {
        //   const module = await import("date-fns/locale/fr");
        //   newLocale = module.fr;
        //   localeSuccessfullyDetermined = true;
        // }
        // ... other languages
        else if (browserLang.startsWith('id')) {
          // Indonesian is the default, already loaded
          newLocale = id;
          localeSuccessfullyDetermined = true;
        }

        if (localeSuccessfullyDetermined && newLocale) {
          setActiveLocale(newLocale);
        } else {
          // Fallback to Indonesian if no specific match, or if newLocale is null
          // This also handles cases where a dynamic import might technically succeed
          // but doesn't yield the expected locale object (e.g. module.someExport was undefined)
          setActiveLocale(id);
        }
      } catch (error) {
        console.error(
          `Failed to load locale for ${browserLang}, falling back to Indonesian (id):`,
          error
        );
        setActiveLocale(id); // Fallback to Indonesian on any error
      } finally {
        setLocaleLoaded(true); // Indicate that loading attempt (success or fallback) is complete
      }
    };

    // Check if the detected browser language would result in a locale different from the current 'id'
    // This avoids unnecessarily setting localeLoaded to false and then true if 'id' is already correct.
    if (
      (browserLang.startsWith('en') && activeLocale.code !== 'en-US') ||
      (browserLang.startsWith('ar') && activeLocale.code !== 'ar-SA') ||
      // Add more conditions for other locales you support if they aren't 'id'
      (!browserLang.startsWith('id') && // If not Indonesian
        !browserLang.startsWith('en') && // And not English
        !browserLang.startsWith('ar') && // And not Arabic (and so on for other handled locales)
        activeLocale !== id) // And current locale is not 'id'
    ) {
      setLocaleLoaded(false); // Set to false only when an actual load attempt for a NEW locale is needed
      attemptLoadLocale();
    } else {
      // If the browser language is Indonesian, or an unhandled one (defaults to 'id'),
      // and 'id' is already active, ensure localeLoaded is true.
      if (activeLocale !== id && browserLang.startsWith('id')) {
        setActiveLocale(id); // Explicitly set to id if browser is id and current isn't (edge case)
      }
      setLocaleLoaded(true);
    }
  }, []); // Run once on mount (activeLocale is a dependency for the check, but we only want mount behavior)

  // Memoized current time string (HH:mm:ss)
  // This will recompute every second because currentSungailiatTime changes every second
  const currentTimeString = useMemo(() => {
    return format(currentSungailiatTime, 'HH:mm:ss');
  }, [currentSungailiatTime]);

  // State for the cached formatted date string (e.g., "Selasa, 21 Mei 2025")
  // This will only recompute when the day or locale actually changes.
  const [cachedFormattedDate, setCachedFormattedDate] = useState<string>('');
  const [prevDayKey, setPrevDayKey] = useState<string>('');
  const [prevLocaleCode, setPrevLocaleCode] = useState<string>('');

  useEffect(() => {
    if (!localeLoaded || !activeLocale || !activeLocale.code) {
      setCachedFormattedDate('Loading date...');
      return;
    }

    const currentDayKey = format(currentSungailiatTime, 'yyyy-MM-dd');
    const currentLocaleCode = activeLocale.code;

    // Only re-format the date string if the day or locale has changed
    if (currentDayKey !== prevDayKey || currentLocaleCode !== prevLocaleCode) {
      setCachedFormattedDate(
        format(currentSungailiatTime, 'EEEE, dd MMMM yyyy', {
          locale: activeLocale,
        })
      );
      setPrevDayKey(currentDayKey);
      setPrevLocaleCode(currentLocaleCode);
    }
  }, [
    currentSungailiatTime,
    activeLocale,
    localeLoaded,
    prevDayKey,
    prevLocaleCode,
  ]);

  if (!isDesktop) {
    return (
      <MobileView
        prayerTimes={prayerTimes}
        localeLoaded={localeLoaded}
        cachedFormattedDate={cachedFormattedDate}
        currentTimeString={currentTimeString}
        timeRemaining={timeRemaining}
        upcomingPrayer={upcomingPrayer}
      />
    );
  }

  return (
    <DesktopView
      prayerTimes={prayerTimes}
      localeLoaded={localeLoaded}
      cachedFormattedDate={cachedFormattedDate}
      currentTimeString={currentTimeString}
      timeRemaining={timeRemaining}
      upcomingPrayer={upcomingPrayer}
    />
  );
}
