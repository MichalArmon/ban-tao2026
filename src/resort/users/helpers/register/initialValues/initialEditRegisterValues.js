import dayjs from "dayjs";

export default function initialEditUserValues(user) {
  const initialEditUserValuesOBG = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    phone: user.phone,

    dietaryRestrictions: user.dietaryRestrictions,
    birthDate: dayjs(user.birthDate),
  };
  return initialEditUserValuesOBG;
}
