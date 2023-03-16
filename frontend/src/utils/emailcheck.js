// check if email is valid
export const emailcheck = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// Path: frontend/src/utils/passwordcheck.js
export const passwordcheck = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};
