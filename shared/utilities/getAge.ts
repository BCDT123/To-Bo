import toDate from "@/shared/utilities/toDate";
// Helper to calculate years, months, and weeks from a date to today
export default function getAgeFromDate(dateValue: any): {
  years: number;
  months: number;
  weeks: number;
  days: number;
} {
  const date = toDate(dateValue);
  const now = new Date();

  let years = now.getFullYear() - date.getFullYear();
  let months = now.getMonth() - date.getMonth();
  let days = now.getDate() - date.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (years < 1) {
    const totalMonths =
      (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth());
    const totalDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weeks = Math.floor(totalDays / 7);
    const daysLeft = totalDays % 7;
    return {
      years: 0,
      months: totalMonths >= 0 ? totalMonths : 0,
      weeks: weeks >= 0 ? weeks : 0,
      days: daysLeft >= 0 ? daysLeft : 0,
    };
  }

  return { years, months, weeks: 0, days };
}
