const getZodiacSign = (date) => {
  const dateOfBirth = new Date(date);
  const day = dateOfBirth.getDate();
  const month = dateOfBirth.getMonth();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries"; // טלה
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus"; // שור
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini"; // תאומים
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer"; // סרטן
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo"; // אריה
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo"; // בתולה
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra"; // מאזניים
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "scorpio"; // עקרב
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "sagittarius"; // קשת
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "capricorn"; // גדי
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "aquarius"; // דלי
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "pisces";
  return null;
};
export default getZodiacSign;
