export const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const normalizedHour = hour % 12 || 12;
    return `${normalizedHour}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const normalizeDate = (date: string | Date | undefined): string => {
    if (!date) {
        return "Invalid date";
    }

    const parsedDate = typeof date === "string" ? new Date(date) : date;
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const year = parsedDate.getFullYear().toString();

    return `${month}/${day}/${year}`;
};

export const normalizeTime = (date: string | Date | undefined): string => {
    if (!date) {
        return "Invalid time";
    }
    
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    let hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;
    
    return `${hours}:${minutes} ${amPm}`;
};

export const getWeekRange = (currentDate: Date) => {
    const firstDayOfWeek = new Date(currentDate);
  
    const dayOfWeek = firstDayOfWeek.getDay();
    const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    firstDayOfWeek.setDate(currentDate.getDate() + diffToMonday);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    const monday = firstDayOfWeek.toLocaleDateString("en-US", options);
    const sunday = lastDayOfWeek.toLocaleDateString("en-US", options);
  
    return `${monday} - ${sunday}`;
  };
  
  