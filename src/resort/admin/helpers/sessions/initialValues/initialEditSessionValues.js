export default function initialEditRoomValues(session) {
  const initialEditSessionValuesOBG = {
    workshopId: session.workshopId,
    startDate: session.startDate,
    endDate: session.endDate,
    daysOfWeek: session.daysOfWeek,
    hour: session.hour,
    location: session.location,
    maxCapacity: session.maxCapacity,
  };
  return initialEditSessionValuesOBG;
}
