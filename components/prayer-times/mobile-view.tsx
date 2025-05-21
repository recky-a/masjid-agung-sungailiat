import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PrayerTime } from '@/types/prayer-times';
import { ChevronDown, Clock, MapPin } from 'lucide-react';

interface MobileViewProps {
  prayerTimes: PrayerTime[];
  localeLoaded: boolean;
  cachedFormattedDate: string;
  currentTimeString: string;
  timeRemaining: string;
  upcomingPrayer: PrayerTime;
}

export default function MobileView({
  prayerTimes,
  localeLoaded,
  cachedFormattedDate,
  currentTimeString,
  timeRemaining,
  upcomingPrayer,
}: MobileViewProps) {
  return (
    <div
      className="w-full"
      aria-label="Jadwal sholat Sungailiat, Kabupaten Bangka"
    >
      <div className="text-muted-foreground mb-2 text-center text-sm">
        <time>{localeLoaded ? cachedFormattedDate : 'Loading date...'}</time>
        <div className="mt-1 flex items-center justify-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>Sungailiat, Kabupaten Bangka (WIB)</span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-primary/20 dark:border-primary/30 flex h-auto w-full items-center justify-center gap-6 rounded-xl border bg-gradient-to-r p-3 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-1">
              <Clock className="text-primary h-5 w-5" />
              <span className="letter-spacing-tight font-medium text-wrap">
                Waktu Sholat Berikutnya
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-primary font-bold">{upcomingPrayer.label}</p>
                <time className="text-muted-foreground text-sm">
                  {upcomingPrayer.time}
                </time>
              </div>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary ml-1 text-xs"
              >
                {timeRemaining}
              </Badge>
              <ChevronDown className="text-muted-foreground ml-1 h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="border-primary/20 dark:border-primary/30 bg-card/95 mt-1.5 w-[calc(100dvw-2rem)] max-w-md rounded-xl border shadow-lg backdrop-blur-sm"
          align="center"
        >
          <CardHeader className="p-3 pb-0">
            <CardTitle className="flex flex-col items-center justify-center gap-1 text-center text-lg">
              <span className="text-primary">Jadwal Sholat</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {currentTimeString} WIB
                </Badge>
                <span className="text-muted-foreground text-xs">
                  Sungailiat, Bangka
                </span>
              </div>
            </CardTitle>
          </CardHeader>

          <DropdownMenuSeparator className="bg-primary/10" />

          <div className="grid gap-1 p-2">
            {prayerTimes.map((prayer) => (
              <DropdownMenuItem
                key={`prayer-${prayer.label}`}
                className={cn(
                  'group flex items-center justify-between rounded-xl p-4 shadow-sm transition-all duration-300 ease-in-out',
                  'bg-muted border border-transparent dark:bg-zinc-900',
                  'hover:border-primary hover:scale-[1.01] hover:shadow-md',
                  'hover:bg-primary/10 hover:dark:bg-primary/20',
                  upcomingPrayer.label === prayer.label
                    ? '!bg-primary !text-primary-foreground hover:border-secondary'
                    : 'text-foreground'
                )}
              >
                <div className="flex flex-col">
                  <span
                    className={cn(
                      'group-hover:text-primary font-semibold tracking-wide transition-colors',
                      upcomingPrayer.label === prayer.label
                        ? 'group-hover:text-primary-foreground'
                        : 'group-hover:text-primary'
                    )}
                  >
                    {prayer.label}
                  </span>
                  {prayer.arabicName && (
                    <span
                      className="font-arabic text-xs opacity-80 transition-opacity group-hover:opacity-100"
                      lang="ar"
                      dir="rtl"
                    >
                      {prayer.arabicName}
                    </span>
                  )}
                </div>
                <time className="font-mono text-sm opacity-80 group-hover:opacity-100">
                  {prayer.time}
                </time>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
