export function formatDateTimeLocal(isoString: string) {
    const date = new Date(isoString);
  
    return date.toLocaleString("en-US", {
      month: "short",   // e.g., "May"
      day: "numeric",   // e.g., "5"
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
}