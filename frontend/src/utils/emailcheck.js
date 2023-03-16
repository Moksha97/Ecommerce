// check if email is valid
export const emailcheck = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
