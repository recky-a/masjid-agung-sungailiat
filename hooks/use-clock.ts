import { SUNGAILIAT_TIMEZONE } from '@/constants/prayer-constants';
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useClock = () => {
  const [time, setTime] = useState(() => new Date());
  const refInterval = useRef<NodeJS.Timeout | null>(null);

  const timeString = useCallback(
    (date: Date) => format(new TZDate(date, SUNGAILIAT_TIMEZONE), 'HH:mm:ss'),
    []
  );

  const dateString = useCallback(
    (customDate?: Date) =>
      format(
        new TZDate(customDate || time, SUNGAILIAT_TIMEZONE),
        'EEEE, dd MMMM yyyy',
        { locale: id }
      ),
    [time]
  );

  const shortTimeString = useCallback(
    (date: Date) => format(new TZDate(date, SUNGAILIAT_TIMEZONE), 'HH:mm'),
    []
  );

  const islamicDateString = useCallback((date: Date) => {
    return format(new TZDate(date, SUNGAILIAT_TIMEZONE), 'dd MMM yyyy');
  }, []);

  const getCurrentTimeInMinutes = useCallback(() => {
    const now = new Date();
    const timeInSungailiat = format(
      new TZDate(now, SUNGAILIAT_TIMEZONE),
      'HH:mm'
    );
    const [hours, minutes] = timeInSungailiat.split(':').map(Number);
    return hours * 60 + minutes;
  }, []);

  useEffect(() => {
    refInterval.current = setInterval(() => {
      setTime(() => new Date());
    }, 1000);
    return () => {
      if (refInterval.current) {
        clearInterval(refInterval.current);
      }
    };
  }, []);

  return {
    time,
    timeString: timeString(time),
    shortTimeString: shortTimeString(time),
    dateString,
    islamicDateString: islamicDateString(time),
    getCurrentTimeInMinutes,
    timezone: SUNGAILIAT_TIMEZONE,
  };
};
