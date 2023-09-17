const ACCESS_TOKEN = 'access_token';

const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const setToken = (token: string) => {
  return localStorage.setItem(ACCESS_TOKEN, token);
};

const TokenServices = {
  clearToken,
  getToken,
  setToken,
};

export default TokenServices;
