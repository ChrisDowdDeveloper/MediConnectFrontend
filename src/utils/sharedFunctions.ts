export const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const getWeekRange = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
  
    // Adjust to Monday
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    firstDayOfWeek.setDate(today.getDate() + diffToMonday);
  
    // Get Sunday
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  
    // Correct formatting options
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    const monday = firstDayOfWeek.toLocaleDateString("en-US", options);
    const sunday = lastDayOfWeek.toLocaleDateString("en-US", options);
  
    return `${monday} - ${sunday}`;
  }
  