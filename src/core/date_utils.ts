export function getWeekInFrench(date: Date): string[] {
  const frenchMonths = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const dayOfWeek = date.getDay(); // 0..6
  const daysToMonday = (dayOfWeek + 6) % 7;
  date.setDate(date.getDate() - daysToMonday);

  // Now `date` is set to the Monday of that week

  // Build our 7-day array (Monday -> Sunday)
  const result: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth(); // 0..11
    const monthName = frenchMonths[monthIndex];

    result.push(`${day}_${monthName}`);
  }

  return result;
}
