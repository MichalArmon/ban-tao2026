export default function initialEditSessionValues(session) {
  // פונקציית עזר קטנה לניקוי התאריך לפורמט YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const initialEditSessionValuesOBG = {
    workshopId: session.workshopId || "",

    // אם זה סשן בודד, יהיה לו startTime. אם זה "חוק", ייתכן שלא יהיה לו.
    startTime: session.startTime ? new Date(session.startTime) : null,

    // שדות הרקורסיה - אם הם לא קיימים ב-session (כי הוא בודד), נשים ערכי ברירת מחדל
    startDate: formatDate(session.startDate) || formatDate(session.startTime),
    endDate: formatDate(session.endDate) || "",
    daysOfWeek: session.daysOfWeek || [],

    // אם אין שדה hour מפורש, ננסה לחלץ אותו מה-startTime
    hour:
      session.hour ||
      (session.startTime
        ? new Date(session.startTime).toLocaleTimeString("he-IL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : ""),

    location: session.location || "",
    maxCapacity: session.maxCapacity || 0,

    // חשוב לוודא שזה בוליאני (true/false)
    isRecursive: !!session.isRecursive,
  };

  return initialEditSessionValuesOBG;
}
