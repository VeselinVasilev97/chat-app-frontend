export function formatDate(date: Date | string, locale: string = 'en-US'): string {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
    return parsedDate.toLocaleString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
  }
  