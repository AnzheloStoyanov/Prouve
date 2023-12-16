import React, { createContext, useState, useEffect } from 'react';

const isMobileContext = createContext(null);

const IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <isMobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </isMobileContext.Provider>
  );
};

export { IsMobileProvider, isMobileContext };