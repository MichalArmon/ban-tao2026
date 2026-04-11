function normalizeSessionDetails(data) {
  const SessionDetailsForServer = {
    workshopId: data.workshopId,
    startDate: data.startDate,
    endDate: data.endDate,
    daysOfWeek: data.daysOfWeek,
    hour: data.hour,
    location: data.location,
    maxCapacity: data.maxCapacity,
  };
  return SessionDetailsForServer;
}

export default normalizeSessionDetails;
