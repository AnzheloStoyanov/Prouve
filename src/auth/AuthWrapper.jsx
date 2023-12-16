import { createContext, useContext, useEffect, useState } from "react";
import { Header, RenderRoutes, Footer, BackToTop } from "src/components";
import { AdminDrawer } from "src/components/AdminComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { nav } from "src/core/navigation";
import { localStorageService, authService } from '../services'
import { toast } from "react-toastify";
import { UserProfileProvider } from "../providers/profileContext";

export const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false, token: "" });
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);

  const location = useLocation();
  const isAdminRoute = nav.some(item => item.path === location.pathname && item.isAdminPanelOnly);
  const isNotFoundRoute = !nav.some(
    (item) => item.path === location.pathname
  );
  const navigate = useNavigate();

  useEffect(() => {

    const loggedUser = localStorageService.getUser();
    if (loggedUser && !user.isAuthenticated) {
      setUser(user);
    }

  }, [])

  // const login = async (email, password) => {

  //   const { token } = await authService.login(email, password)

  //   console.log('data', token)

  //   if (token) {
  //     const loggedUser = { name: email, isAuthenticated: true, token: token }
  //     localStorageService.login(loggedUser);
  //     setUser(loggedUser)
  //     navigate('/')

  //   } else {
  //     toast.error('Възникна проблем')
  //   }
  // };

  const login = (userName, password) => {
    return new Promise((resolve, reject) => {
      if (password === "password") {
        const loggedUser = {
          name: userName,
          isAuthenticated: true,
          isAdmin: true,
          token: 'token',
        };
        localStorageService.login(JSON.stringify(loggedUser));
        setUser(loggedUser);
        resolve("success");
        navigate("/store");
      } else {
        reject("Incorrect password");
      }
    });
  };

  const logout = () => {

    localStorageService.logout();
    setUser({ ...user, isAuthenticated: false, token: '' });
    navigate('/login')
  };

  const forgottenPassword = async () => {

    return await authService.forgottenPassword();
  };

  const setPasswordForgotten = (val) => {

    setIsPasswordForgotten(val);
  };

  const register = async (email, password) => {
    return await authService.register(email, password)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, forgottenPassword, setPasswordForgotten, isPasswordForgotten }}>
      <>
        <UserProfileProvider>
          {!isNotFoundRoute && <Header />}
          <RenderRoutes />
          <BackToTop />
          {!isNotFoundRoute && (isAdminRoute ? <AdminDrawer /> : <Footer />)}
        </UserProfileProvider>
      </>
    </AuthContext.Provider>
  );
};