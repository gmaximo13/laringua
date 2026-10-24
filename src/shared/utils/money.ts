export function assertCents(value: number, allowZero = false): void {
  if (!Number.isSafeInteger(value) || value < 0 || (!allowZero && value === 0)) {
    throw new Error('O valor deve ser um número inteiro de centavos válido.');
  }
}

// Accepts Brazilian input such as 1234,56 or 1.234,56 without float arithmetic.
export function parseBRLToCents(input: string): number {
  const value = input.trim();
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(value)) {
    throw new Error('Informe um valor válido, como 100,00.');
  }

  const [whole, fraction = ''] = value.replace(/\./g, '').split(',');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  assertCents(cents, true);
  return cents;
}

export function formatBRL(cents: number): string {
  assertCents(Math.abs(cents), true);
  const absolute = Math.abs(cents);
  const whole = Math.floor(absolute / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const fraction = (absolute % 100).toString().padStart(2, '0');
  return `${cents < 0 ? '-' : ''}R$ ${whole},${fraction}`;
}
