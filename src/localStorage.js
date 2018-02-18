export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token");
};

export const setTokenToLocalStorage = token => {
  localStorage.setItem("access_token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token");
};
