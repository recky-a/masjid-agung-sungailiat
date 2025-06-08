// constants/prayer-constants.ts
import {
  AlarmClock,
  Cloud,
  CloudSun,
  LucideIcon,
  Moon,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
} from 'lucide-react';
export const SUNGAILIAT_TIMEZONE = 'Asia/Jakarta';
export const DHUHA_OFFSET_MINUTES = 24;

export const prayerNames = {
  imsak: 'Imsak',
  subuh: 'Subuh',
  terbit: 'Terbit',
  duha: 'Duha',
  zuhur: 'Zuhur',
  asar: 'Asar',
  magrib: 'Magrib',
  "isya'": 'Isya',
};

export const prayerIcons: Record<string, LucideIcon> = {
  imsak: AlarmClock,
  subuh: Sunrise,
  terbit: CloudSun,
  duha: Sparkles,
  zuhur: Sun,
  asar: Cloud,
  magrib: Sunset,
  "isya'": Moon,
};

export const prayerColors: Record<string, string> = {
  imsak: 'from-slate-700 via-gray-600 to-slate-800',
  subuh: 'from-sky-500 via-indigo-500 to-purple-500',
  terbit: 'from-yellow-300 via-orange-300 to-rose-300',
  duha: 'from-yellow-400 via-amber-400 to-orange-400',
  zuhur: 'from-lime-400 via-green-400 to-teal-400',
  asar: 'from-amber-500 via-orange-500 to-red-400',
  magrib: 'from-pink-500 via-rose-500 to-purple-500',
  "isya'": 'from-indigo-700 via-purple-800 to-blue-800',
};

export const prayerGlows: Record<string, string> = {
  imsak: 'shadow-slate-500/40',
  subuh: 'shadow-indigo-400/30',
  terbit: 'shadow-yellow-400/30',
  duha: 'shadow-orange-300/30',
  zuhur: 'shadow-green-300/30',
  asar: 'shadow-red-400/30',
  magrib: 'shadow-pink-500/30',
  "isya'": 'shadow-purple-600/30',
};
