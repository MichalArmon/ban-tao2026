import dayjs from "dayjs";

const initialRoomAvailabilityValues = {
  checkIn: dayjs(), // ברירת מחדל: היום
  checkOut: dayjs().add(1, "day"), // ברירת מחדל: מחר
  guestsCount: 2,
  roomType: "All",
};
export default initialRoomAvailabilityValues;
