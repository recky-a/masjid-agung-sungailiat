import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PrayerTime } from '@/types/prayer-times';

interface DesktopViewProps {
  prayerTimes: PrayerTime[];
  localeLoaded: boolean;
  cachedFormattedDate: string;
  currentTimeString: string;
  timeRemaining: string;
  upcomingPrayer: PrayerTime;
}

export default function DesktopView({
  prayerTimes,
  localeLoaded,
  cachedFormattedDate,
  currentTimeString,
  timeRemaining,
  upcomingPrayer,
}: DesktopViewProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="border-primary/20 dark:border-primary/30 bg-card/95 w-full max-w-[calc(100%-8rem)] overflow-hidden rounded-lg border py-0 shadow-sm backdrop-blur-sm lg:max-w-4xl xl:max-w-5xl">
        <div className="border-primary/10 flex items-center justify-between border-b px-2 py-1">
          <div className="flex items-center gap-1">
            <h2 className="text-primary text-xs font-medium">Jadwal Sholat</h2>
            <span className="text-muted-foreground text-xs">•</span>
            <time className="text-muted-foreground text-xs">
              {localeLoaded ? cachedFormattedDate.split(',')[1] : '...'}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground font-mono text-xs">
              {currentTimeString}
            </span>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary h-5 px-1 text-xs"
            >
              {timeRemaining}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1.5 p-1.5 md:grid-cols-6 lg:gap-2 lg:p-3">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.label}
              className={cn(
                'group flex flex-col rounded border border-transparent shadow-sm transition-all duration-300 ease-in-out',
                'hover:border-primary hover:scale-[1.01] hover:shadow-md',
                'hover:bg-primary/10 hover:dark:bg-primary/20',
                upcomingPrayer.label === prayer.label
                  ? 'bg-primary text-primary-foreground hover:border-secondary'
                  : 'bg-muted text-foreground'
              )}
            >
              <div className="flex flex-col items-center justify-center p-1 text-center lg:p-2">
                <span
                  className={cn(
                    'text-xs font-medium transition-colors lg:text-sm',
                    upcomingPrayer.label === prayer.label
                      ? 'group-hover:text-primary-foreground'
                      : 'group-hover:text-primary'
                  )}
                >
                  {prayer.label}
                </span>
                {prayer.arabicName && (
                  <span
                    className="font-arabic text-xs opacity-80 transition-opacity group-hover:opacity-100 lg:text-sm"
                    lang="ar"
                    dir="rtl"
                  >
                    {prayer.arabicName}
                  </span>
                )}
                <time className="font-mono text-xs opacity-80 group-hover:opacity-100 lg:text-sm">
                  {prayer.time}
                </time>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
