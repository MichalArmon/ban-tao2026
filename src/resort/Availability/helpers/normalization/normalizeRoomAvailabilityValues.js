function normalizeRoomAvailabilityDetails(data) {
  return {
    ...data,
    // אם התאריך הוא אובייקט Dayjs - נפרמט אותו. אם לא (נגיד שכבר עבר נרמול) - נשאיר אותו.
    checkIn: data.checkIn?.format
      ? data.checkIn.format("YYYY-MM-DD")
      : data.checkIn,
    checkOut: data.checkOut?.format
      ? data.checkOut.format("YYYY-MM-DD")
      : data.checkOut,
    guestsCount: Number(data.guestsCount), // מוודאים שזה מספר ולא סטרינג
    roomType: data.roomType === "All" ? "" : data.roomType, // דוגמה לניקוי נוסף
  };
}

export default normalizeRoomAvailabilityDetails;
