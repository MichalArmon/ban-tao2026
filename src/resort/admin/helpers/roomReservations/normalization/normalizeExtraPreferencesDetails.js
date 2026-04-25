function normalizeExtraPreferences(values) {
  const extraPreferencesDetailsForServer = {
    mealPlan: values.mealPlan,
    rentScooter: values.rentScooter,
    shuttleFromFerry: values.shuttleFromFerry,

    specialRequests: values.specialRequests,
    status: values.status,
  };
  return extraPreferencesDetailsForServer;
}

export default normalizeExtraPreferences;
