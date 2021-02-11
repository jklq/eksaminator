import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const getUser = () => {
  const { token } = cookie.parse(document.cookie);
  return jwt.decode(token);
};

export const saveToken = (token) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 9.8); // 9.8 days
  console.log(cookie.serialize('token', token));
  document.cookie = cookie.serialize('token', token, { expires: expiryDate });
};

export const isLoggedIn = () => {
  try {
    const user = getUser();
    return user.loggedIn;
  } catch {
    return false;
  }
};
