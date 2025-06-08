export interface AladhanResponse {
  code: number;
  status: string;
  data: AladhanCalendarDay[];
}

export interface AladhanCalendarDay {
  timings: AladhanTimings;
  date: DateInfo;
  meta: Meta;
}

export interface AladhanTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
}

export interface DateInfo {
  readable: string;
  timestamp: string;
  gregorian: GregorianDate;
  hijri: HijriDate;
}

export interface Designation {
  abbreviated: string;
  expanded: string;
}

export interface Weekday {
  en: string;
  ar?: string;
}

export interface GregorianMonth {
  number: number;
  en: string;
}

export interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: GregorianMonth;
  year: string;
  designation: Designation;
  lunarSighting: boolean;
}

export interface HijriMonth {
  number: number;
  en: string;
  ar: string;
  days: number;
}

export interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: HijriMonth;
  year: string;
  designation: Designation;
  holidays: string[];
  adjustedHolidays: string[];
  method: string;
}

export interface Params {
  Fajr: number;
  Isha: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Method {
  id: number;
  name: string;
  params: Params;
  location: Location;
}

export interface Offset {
  Imsak: number;
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Maghrib: number;
  Sunset: number;
  Isha: number;
  Midnight: number;
}

export interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: Method;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Offset;
}

// LakuApik Types
export interface LakuApikDailyTimings {
  ashr: string;
  dhuha: string;
  dzuhur: string;
  imsyak: string;
  isya: string;
  magrib: string;
  shubuh: string;
  terbit: string;
  tanggal: string;
}

export type LakuApikResponse = LakuApikDailyTimings[];
