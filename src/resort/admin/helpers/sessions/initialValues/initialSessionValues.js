const initialSessionValues = {
  workshopId: "",
  location: "",
  maxCapacity: 10,
  isRecursive: false, // ברירת המחדל - אירוע בודד

  // שדות של סשן בודד
  startTime: null,

  // שדות של חוק (יוצגו רק אם isRecursive === true)
  startDate: null,
  endDate: null,
  daysOfWeek: [],
  hour: "10:00",
};

export default initialSessionValues;
