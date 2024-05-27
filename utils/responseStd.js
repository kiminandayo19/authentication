const invalidRequiredConstraint = (message) => {
  return {
    status: 400,
    message: `Invalid required constraint, ${message}`,
    data: [],
  };
};

module.exports = { invalidRequiredConstraint };
