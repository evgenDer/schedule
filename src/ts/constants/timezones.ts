import { ITimeZone } from './types-interfaces';

export const TIMEZONES: ITimeZone[] = [
  { name: 'Europe/Minsk' },
  { name: 'Europe/Moscow' },
  { name: 'Europe/Kiev' },
  { name: 'Europe/London' },
  { name: 'Europe/Warsaw' },
  { name: 'Europe/Volgograd' },
  { name: 'Europe/Yekaterinburg' },
  { name: 'Asia/Tashkent' },
  { name: 'Asia/Tbilisi' },
];

export const DEFAULT_TIMEZONE = TIMEZONES[0];
