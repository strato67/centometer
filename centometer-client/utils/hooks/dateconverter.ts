type RelativeTimeFormatUnit =
  | "year"
  | "month"
  | "week"
  | "day"
  | "hour"
  | "minute"
  | "second";

export default function DateConverter() {
  const getRelativeTime = (timestamp: string) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((time.getTime() - now.getTime()) / 1000);

    const intervals: Record<RelativeTimeFormatUnit, number> = {
      year: 60 * 60 * 24 * 365,
      month: 60 * 60 * 24 * 30,
      week: 60 * 60 * 24 * 7,
      day: 60 * 60 * 24,
      hour: 60 * 60,
      minute: 60,
      second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      if (Math.abs(diffInSeconds) >= secondsInUnit || unit === "second") {
        const value = Math.round(diffInSeconds / secondsInUnit);
        return rtf.format(value, unit as RelativeTimeFormatUnit);
      }
    }

    return "";
  };

  return { getRelativeTime };
}
