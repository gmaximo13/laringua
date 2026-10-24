// Validate calendar dates without UTC conversion or timezone-dependent shifts.
export function toCalendarDate(date: Date): string {
  const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  assertCalendarDate(value);
  return value;
}

export function assertCalendarDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Data interna inválida.');
  }

  const [year, month, day] = value.split('-').map(Number);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
    throw new Error('Informe uma data existente.');
  }
}

export function parseDisplayDate(value: string): string {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    throw new Error('Informe a data no formato DD/MM/AAAA.');
  }
  const [day, month, year] = value.split('/');
  const date = `${year}-${month}-${day}`;
  assertCalendarDate(date);
  return date;
}

export function formatDisplayDate(value: string): string {
  assertCalendarDate(value);
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
