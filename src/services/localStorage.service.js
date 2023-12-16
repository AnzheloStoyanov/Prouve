const USER_KEY = "user";
const CART = "cart";

const login = (user) => {

    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const logout = () => {
  localStorage.removeItem(USER_KEY);
};

const getUser = () => {

    return JSON.parse(localStorage.getItem(USER_KEY));
};

const saveCart = (cart) => {
  //todo should talk aboit that being in local storage or in db. if in local storage should be unique for the user key
  localStorage.setItem(CART, JSON.stringify(cart));
};

const getCart = () => {
  return JSON.parse(localStorage.getItem(CART));
}

const isAuthenticated = () => {
  const user = getUser();
  return user?.token;
};

export const localStorageService = {
  login,
  logout,
  getUser,
  isAuthenticated,
  saveCart,
  getCart,
};
