function normalizeRecRuleDetails(data) {
  const recRuleDetailsForServer = {
    isRecursive: true,
    workshopId: data.workshopId,
    startDate: data.startDate,
    endDate: data.endDate,
    daysOfWeek: data.daysOfWeek,
    hour: data.hour,
    location: data.location,
    maxCapacity: data.maxCapacity,
  };
  return recRuleDetailsForServer;
}

export default normalizeRecRuleDetails;
