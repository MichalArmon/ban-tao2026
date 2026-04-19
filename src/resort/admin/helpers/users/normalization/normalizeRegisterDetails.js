const normalizeRegisterDetails = (data) => {
  const userDetailsForServer = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    birthDate: data.birthDate,
  };

  return userDetailsForServer;
};

export default normalizeRegisterDetails;
