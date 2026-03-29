function normalizeLoginDetails(data) {
  const loginDetailsForServer = {
    email: data.email,
    password: data.password,
  };

  return loginDetailsForServer;
}

export default normalizeLoginDetails;
