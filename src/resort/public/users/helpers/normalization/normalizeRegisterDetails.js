const normalizeRegisterDetails = (data) => {
  const userDetailsForServer = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,

    country: data.country,
    city: data.city,

    role: "user",
  };

  return userDetailsForServer;
};

export default normalizeRegisterDetails;
