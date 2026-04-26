export default function initialEditExtraPreferencesValues(extraPreferences) {
  const initialEditExtraPreferencesValuesOBJ = {
    mealPlan: extraPreferences?.mealPlan || "",
    rentScooter: extraPreferences?.rentScooter || false,
    shuttleFromFerry: extraPreferences?.shuttleFromFerry || false,
    specialRequests: extraPreferences?.specialRequests || "",
    status: extraPreferences?.status,
  };

  return initialEditExtraPreferencesValuesOBJ;
}
