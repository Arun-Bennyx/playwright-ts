export function getCustomDateFormat(date: Date = new Date()): string {
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${day}-${month}`; // YYYY-DD-MM
}

export function addDays(days: number, baseDate: Date = new Date()): string {
  const result = new Date(baseDate);
  result.setDate(result.getDate() + days);
  return getCustomDateFormat(result);
}
