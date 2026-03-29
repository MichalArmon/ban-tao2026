function normalizeLoginDetails(data) {
  const loginDetailsForServer = {
    email: data.email,
    password: data.email,
  };

  return loginDetailsForServer;
}

export default normalizeLoginDetails;
