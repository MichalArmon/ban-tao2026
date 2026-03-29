function normalizeRegisterDetails(data) {
  const registerDetailsForServer = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.email,
    phone: data.phone,
    birthDate: data.birthDate,

    dietaryRestrictions: data.dietaryRestrictions,
  };

  return registerDetailsForServer;
}

export default normalizeRegisterDetails;
