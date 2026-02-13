const normalizeRegisterDetails = (data) => {
  const userDetailsForServer = {
    name: {
      first: data.first,
      middle: data.middle,
      last: data.last,
    },
    phone: data.phone,
    email: data.email,
    password: data.password,
    image: {
      url: data.url,
      alt: data.alt,
    },
    address: {
      state: data.state,
      country: data.country,
      city: data.city,
      street: data.street,
      houseNumber: data.houseNumber,
      zip: data.zip,
    },
    isBusiness: true,
  };
  return userDetailsForServer;
};

export default normalizeRegisterDetails;
