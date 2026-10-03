const WEEKDAY_PL = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
const MONTH_PL = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
];

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return `${date.getDate()} ${MONTH_PL[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatWeekdayDate(date = new Date()): string {
  return `${WEEKDAY_PL[date.getDay()]}, ${date.getDate()} ${MONTH_PL[date.getMonth()]}`;
}

export function daysUntil(isoDate?: string): number | null {
  if (!isoDate) {
    return null;
  }

  const target = new Date(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function greetingForNow(date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) {
    return 'Dzień dobry';
  }
  if (hour < 18) {
    return 'Cześć';
  }
  return 'Dobry wieczór';
}
