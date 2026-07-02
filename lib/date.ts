export function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

export function daysBetween(previousDateKey: string, nextDateKey: string): number {
  const previous = new Date(`${previousDateKey}T00:00:00.000Z`).getTime();
  const next = new Date(`${nextDateKey}T00:00:00.000Z`).getTime();

  return Math.round((next - previous) / 86_400_000);
}
