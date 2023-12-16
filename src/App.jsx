import "./App.scss";
import { Suspense } from "react";
import { AuthWrapper } from "src/auth/AuthWrapper";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IsMobileProvider } from "./providers/isMobileContext";
import CookiesPopUp from "./components/CookiesPopUp/CookiesPopUp";
import { useState, useEffect } from "react";
import { CartProvider } from "./providers/cartContext";


function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("acceptedCookies");

    if (!hasAcceptedCookies) {
      setShowPopUp(true);
    }
    return () => {};
  }, []);
  const handleAcceptCookies = () => {
    localStorage.setItem("acceptedCookies", "true");
    setShowPopUp(false);
  };

  const handleNotAcceptCookies = () => {
    setShowPopUp(false);
  };

  return (
    <div className="App">
      <Suspense fallback="loading">
        <BrowserRouter>
          <IsMobileProvider>
            {showPopUp && (
              <CookiesPopUp
                isCookiesPopUp={{ isCookiesPopUp: true }}
                handleNotAcceptCookies={handleNotAcceptCookies}
                handleAcceptCookies={handleAcceptCookies}
              />
            )}
          <CartProvider>
            <AuthWrapper />
          </CartProvider>
          </IsMobileProvider>
        </BrowserRouter>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
