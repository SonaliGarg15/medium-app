const USER_TOKEN_KEY = "user_token";

export const getToken = () => {
  return window.localStorage.getItem(USER_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(USER_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(USER_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };