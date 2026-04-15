export default function recRuleEditInitialValues(recRule) {
  const initialEditRecRuleValuesOBG = {
    workshopId: recRule.workshopId,
    location: recRule.location,
    maxCapacity: recRule.maxCapacity,
    startDate: recRule.startDate,
    endDate: recRule.endDate,
    daysOfWeek: recRule.daysOfWeek,
    hour: recRule.hour,
  };
  return initialEditRecRuleValuesOBG;
}
