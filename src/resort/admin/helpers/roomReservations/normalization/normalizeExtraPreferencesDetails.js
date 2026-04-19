function normalizeExtraPreferences(values) {
  const extraPreferencesDetailsForServer = {
    mealPlan: values.mealPlan,
    rentScooter: values.rentScooter,
    shuttleFromFerry: values.shuttleFromFerry,

    specialRequests: values.specialRequests,
  };
  return extraPreferencesDetailsForServer;
}

export default normalizeExtraPreferences;
