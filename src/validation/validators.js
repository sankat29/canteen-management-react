export const validateUserName = (userName) => {
  return userName.includes(".com") && userName.includes("@");
};

export const validateUserPassword = (password) => {
  return password.length > 0 && password.length === 8;
};
