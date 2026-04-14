function normalizeSessionDetails(data) {
  if (data.isRecursive) {
    // מסלול של חוקיות (Rule - סדרה מתמשכת)
    return {
      isRecursive: true,
      workshopId: data.workshopId,
      startDate: data.startDate,
      endDate: data.endDate,
      daysOfWeek: data.daysOfWeek,
      hour: data.hour,
      location: data.location,
      maxCapacity: data.maxCapacity,
    };
  } else {
    // מסלול של סשן בודד (Session)
    return {
      isRecursive: false,
      workshopId: data.workshopId,
      startTime: data.startDate, // משנות את השם מ-startDate ל-startTime עבור השרת!
      hour: data.hour,
      location: data.location,
      maxCapacity: data.maxCapacity,
    };
  }
}

export default normalizeSessionDetails;
